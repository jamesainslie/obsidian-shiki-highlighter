import type { Highlighter, BundledLanguage } from 'shiki';
import { Cache } from '../utils/cache';

/**
 * Manages lazy loading of language grammars
 */
export class LanguageLoader {
  private loadedLanguages: Cache<boolean>;
  private highlighter: Highlighter;
  private lazyLoad: boolean;

  constructor(highlighter: Highlighter, lazyLoad: boolean = true) {
    this.highlighter = highlighter;
    this.lazyLoad = lazyLoad;
    this.loadedLanguages = new Cache<boolean>();
  }

  /**
   * Load a language grammar if not already loaded
   */
  async loadLanguage(lang: string): Promise<boolean> {
    if (this.loadedLanguages.has(lang)) {
      return true;
    }

    try {
      // Check if language is already loaded in highlighter
      const loadedLangs = this.highlighter.getLoadedLanguages();
      if (loadedLangs.includes(lang as BundledLanguage)) {
        this.loadedLanguages.set(lang, true);
        return true;
      }

      // Load the language
      await this.highlighter.loadLanguage(lang as BundledLanguage);
      this.loadedLanguages.set(lang, true);
      return true;
    } catch (error) {
      console.warn(`Failed to load language '${lang}':`, error);
      return false;
    }
  }

  /**
   * Check if a language is loaded
   */
  isLanguageLoaded(lang: string): boolean {
    return this.loadedLanguages.has(lang);
  }

  /**
   * Get list of loaded languages
   */
  getLoadedLanguages(): string[] {
    return this.loadedLanguages.keys();
  }

  /**
   * Clear the cache
   */
  clear(): void {
    this.loadedLanguages.clear();
  }

  /**
   * Set lazy load mode
   */
  setLazyLoad(value: boolean): void {
    this.lazyLoad = value;
  }
}

