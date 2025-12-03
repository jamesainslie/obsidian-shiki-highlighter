import { App, PluginSettingTab, Setting } from 'obsidian';
import type ShikiHighlighterPlugin from '../main';
import { AVAILABLE_THEMES } from './types';

export class ShikiSettingsTab extends PluginSettingTab {
  plugin: ShikiHighlighterPlugin;

  constructor(app: App, plugin: ShikiHighlighterPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    // Header
    containerEl.createEl('h2', { text: 'Shiki Syntax Highlighter Settings' });

    // Light theme setting
    new Setting(containerEl)
      .setName('Light mode theme')
      .setDesc('Theme to use when Obsidian is in light mode')
      .addDropdown((dropdown) =>
        dropdown
          .addOptions(
            Object.fromEntries(AVAILABLE_THEMES.map((theme) => [theme, theme]))
          )
          .setValue(this.plugin.settings.theme.light)
          .onChange(async (value) => {
            this.plugin.settings.theme.light = value;
            await this.plugin.saveSettings();
            await this.plugin.reloadHighlighter();
          })
      );

    // Dark theme setting
    new Setting(containerEl)
      .setName('Dark mode theme')
      .setDesc('Theme to use when Obsidian is in dark mode')
      .addDropdown((dropdown) =>
        dropdown
          .addOptions(
            Object.fromEntries(AVAILABLE_THEMES.map((theme) => [theme, theme]))
          )
          .setValue(this.plugin.settings.theme.dark)
          .onChange(async (value) => {
            this.plugin.settings.theme.dark = value;
            await this.plugin.saveSettings();
            await this.plugin.reloadHighlighter();
          })
      );

    // Lazy load setting
    new Setting(containerEl)
      .setName('Lazy load languages')
      .setDesc('Load language grammars on-demand to reduce memory usage')
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.lazyLoad)
          .onChange(async (value) => {
            this.plugin.settings.lazyLoad = value;
            await this.plugin.saveSettings();
          })
      );

    // Line numbers setting
    new Setting(containerEl)
      .setName('Show line numbers')
      .setDesc('Display line numbers in code blocks')
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.lineNumbers)
          .onChange(async (value) => {
            this.plugin.settings.lineNumbers = value;
            await this.plugin.saveSettings();
            await this.plugin.reloadHighlighter();
          })
      );

    // Copy button setting
    new Setting(containerEl)
      .setName('Show copy button')
      .setDesc('Show a copy button when hovering over code blocks')
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.copyButton)
          .onChange(async (value) => {
            this.plugin.settings.copyButton = value;
            await this.plugin.saveSettings();
          })
      );

    // Live preview setting
    new Setting(containerEl)
      .setName('Enable in Live Preview')
      .setDesc('Apply Shiki highlighting in Live Preview mode (may impact performance)')
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.enableInLivePreview)
          .onChange(async (value) => {
            this.plugin.settings.enableInLivePreview = value;
            await this.plugin.saveSettings();
            await this.plugin.reloadHighlighter();
          })
      );

    // Pre-loaded languages info
    containerEl.createEl('h3', { text: 'Pre-loaded Languages' });
    containerEl.createEl('p', {
      text: `The following languages are pre-loaded: ${this.plugin.settings.languages.join(', ')}`,
      cls: 'setting-item-description',
    });
    containerEl.createEl('p', {
      text: 'Other languages will be loaded automatically when needed (if lazy loading is enabled).',
      cls: 'setting-item-description',
    });
  }
}

