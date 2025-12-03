import { Plugin, MarkdownPostProcessorContext } from 'obsidian';
import { createHighlighter, type Highlighter } from 'shiki';
import { ShikiSettingsTab } from './settings/SettingsTab';
import { DEFAULT_SETTINGS, type ShikiSettings, AVAILABLE_THEMES } from './settings/types';
import { HighlightController } from './controllers/HighlightController';
import { ThemeController } from './controllers/ThemeController';
import { LanguageLoader } from './controllers/LanguageLoader';
import { createShikiExtension } from './editor/ShikiExtension';

export default class ShikiHighlighterPlugin extends Plugin {
  settings: ShikiSettings = DEFAULT_SETTINGS;
  private highlighter: Highlighter | null = null;
  private highlightController: HighlightController | null = null;
  private themeController: ThemeController | null = null;
  private languageLoader: LanguageLoader | null = null;
  private editorExtension: any = null;

  async onload() {
    console.log('Loading Shiki Highlighter plugin');

    // Load settings
    await this.loadSettings();

    // Initialize Shiki
    await this.initializeShiki();

    // Add settings tab
    this.addSettingTab(new ShikiSettingsTab(this.app, this));

    // Register markdown post processor for reading mode
    this.registerMarkdownPostProcessor(this.processCodeBlock.bind(this));

    // Register editor extension for live preview (if enabled)
    if (this.settings.enableInLivePreview && this.highlighter && this.languageLoader) {
      const theme = this.themeController?.getCurrentTheme() || this.settings.theme.dark;
      this.editorExtension = createShikiExtension(
        this.highlighter,
        this.languageLoader,
        theme
      );
      this.registerEditorExtension(this.editorExtension);
    }

    console.log('Shiki Highlighter plugin loaded');
  }

  onunload() {
    console.log('Unloading Shiki Highlighter plugin');
  }

  /**
   * Initialize Shiki highlighter with themes and languages
   */
  private async initializeShiki(): Promise<void> {
    try {
      // Create highlighter with bundled themes and languages
      this.highlighter = await createHighlighter({
        themes: AVAILABLE_THEMES as any,
        langs: this.settings.languages as any,
      });

      // Initialize controllers
      this.languageLoader = new LanguageLoader(this.highlighter, this.settings.lazyLoad);
      
      this.themeController = new ThemeController(
        this.highlighter,
        this.app,
        this.settings.theme.light,
        this.settings.theme.dark
      );

      this.themeController.initialize(this.handleThemeChange.bind(this));

      const currentTheme = this.themeController.getCurrentTheme();
      
      this.highlightController = new HighlightController(
        this.highlighter,
        this.languageLoader,
        currentTheme,
        {
          lineNumbers: this.settings.lineNumbers,
          copyButton: this.settings.copyButton,
        }
      );

      console.log('Shiki highlighter initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Shiki highlighter:', error);
    }
  }

  /**
   * Process code blocks in reading mode
   */
  private async processCodeBlock(
    el: HTMLElement,
    ctx: MarkdownPostProcessorContext
  ): Promise<void> {
    if (!this.highlightController) {
      return;
    }

    try {
      await this.highlightController.processCodeBlocks(el);
    } catch (error) {
      console.error('Failed to process code blocks:', error);
    }
  }

  /**
   * Handle theme changes
   */
  private handleThemeChange(): void {
    if (!this.themeController || !this.highlightController) {
      return;
    }

    const newTheme = this.themeController.getCurrentTheme();
    this.highlightController.setTheme(newTheme);

    // Re-process visible code blocks
    this.reprocessVisibleCodeBlocks();
  }

  /**
   * Re-process all visible code blocks
   */
  private reprocessVisibleCodeBlocks(): void {
    // Remove data-shiki-highlighted attribute from all code blocks to force re-render
    const codeBlocks = document.querySelectorAll('pre[data-shiki-highlighted]');
    codeBlocks.forEach((block) => {
      block.removeAttribute('data-shiki-highlighted');
    });

    // Trigger re-render by dispatching a workspace event
    this.app.workspace.trigger('layout-change');
  }

  /**
   * Reload highlighter (called when settings change)
   */
  async reloadHighlighter(): Promise<void> {
    console.log('Reloading Shiki highlighter');

    // Update theme controller
    if (this.themeController) {
      this.themeController.updateThemes(
        this.settings.theme.light,
        this.settings.theme.dark
      );
    }

    // Update highlight controller options
    if (this.highlightController) {
      const currentTheme = this.themeController?.getCurrentTheme() || this.settings.theme.dark;
      this.highlightController.setTheme(currentTheme);
      this.highlightController.setOptions({
        lineNumbers: this.settings.lineNumbers,
        copyButton: this.settings.copyButton,
      });
    }

    // Update language loader
    if (this.languageLoader) {
      this.languageLoader.setLazyLoad(this.settings.lazyLoad);
    }

    // Re-process all visible code blocks
    this.reprocessVisibleCodeBlocks();
  }

  /**
   * Load plugin settings
   */
  async loadSettings(): Promise<void> {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  /**
   * Save plugin settings
   */
  async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
  }
}

