import type { Highlighter, BundledTheme } from 'shiki';
import type { App } from 'obsidian';

/**
 * Manages theme loading and light/dark mode synchronization
 */
export class ThemeController {
  private highlighter: Highlighter;
  private app: App;
  private lightTheme: string;
  private darkTheme: string;
  private onThemeChange?: () => void;

  constructor(
    highlighter: Highlighter,
    app: App,
    lightTheme: string,
    darkTheme: string
  ) {
    this.highlighter = highlighter;
    this.app = app;
    this.lightTheme = lightTheme;
    this.darkTheme = darkTheme;
  }

  /**
   * Initialize theme controller and set up listeners
   */
  initialize(onThemeChange?: () => void): void {
    this.onThemeChange = onThemeChange;
    
    // Listen for theme changes
    this.app.workspace.on('css-change', this.handleThemeChange.bind(this));
  }

  /**
   * Handle theme change events
   */
  private handleThemeChange(): void {
    if (this.onThemeChange) {
      this.onThemeChange();
    }
  }

  /**
   * Get the current theme based on Obsidian's light/dark mode
   */
  getCurrentTheme(): string {
    const isDark = document.body.classList.contains('theme-dark');
    return isDark ? this.darkTheme : this.lightTheme;
  }

  /**
   * Update theme settings
   */
  updateThemes(lightTheme: string, darkTheme: string): void {
    this.lightTheme = lightTheme;
    this.darkTheme = darkTheme;
  }

  /**
   * Check if we're in dark mode
   */
  isDarkMode(): boolean {
    return document.body.classList.contains('theme-dark');
  }

  /**
   * Load themes into highlighter
   */
  async loadThemes(themes: string[]): Promise<void> {
    for (const theme of themes) {
      try {
        await this.highlighter.loadTheme(theme as BundledTheme);
      } catch (error) {
        console.warn(`Failed to load theme '${theme}':`, error);
      }
    }
  }
}

