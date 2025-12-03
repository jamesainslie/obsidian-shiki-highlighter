import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LanguageLoader } from '../src/controllers/LanguageLoader';

describe('LanguageLoader', () => {
  describe('loadLanguage', () => {
    it('should return true for already loaded languages', async () => {
      const mockHighlighter = {
        getLoadedLanguages: () => ['go', 'typescript'],
        loadLanguage: vi.fn(),
      } as any;

      const loader = new LanguageLoader(mockHighlighter, true);
      const result = await loader.loadLanguage('go');

      expect(result).toBe(true);
      expect(mockHighlighter.loadLanguage).not.toHaveBeenCalled();
    });

    it('should load new languages', async () => {
      const mockHighlighter = {
        getLoadedLanguages: () => ['go'],
        loadLanguage: vi.fn().mockResolvedValue(undefined),
      } as any;

      const loader = new LanguageLoader(mockHighlighter, true);
      const result = await loader.loadLanguage('python');

      expect(result).toBe(true);
      expect(mockHighlighter.loadLanguage).toHaveBeenCalledWith('python');
    });

    it('should handle load failures gracefully', async () => {
      const mockHighlighter = {
        getLoadedLanguages: () => [],
        loadLanguage: vi.fn().mockRejectedValue(new Error('Load failed')),
      } as any;

      const loader = new LanguageLoader(mockHighlighter, true);
      const result = await loader.loadLanguage('unknown');

      expect(result).toBe(false);
    });

    it('should cache loaded languages', async () => {
      const mockHighlighter = {
        getLoadedLanguages: () => ['go'],
        loadLanguage: vi.fn().mockResolvedValue(undefined),
      } as any;

      const loader = new LanguageLoader(mockHighlighter, true);
      
      await loader.loadLanguage('python');
      await loader.loadLanguage('python');

      expect(mockHighlighter.loadLanguage).toHaveBeenCalledTimes(1);
    });
  });

  describe('isLanguageLoaded', () => {
    it('should return true for loaded languages', async () => {
      const mockHighlighter = {
        getLoadedLanguages: () => ['go'],
        loadLanguage: vi.fn().mockResolvedValue(undefined),
      } as any;

      const loader = new LanguageLoader(mockHighlighter, true);
      await loader.loadLanguage('python');

      expect(loader.isLanguageLoaded('python')).toBe(true);
      expect(loader.isLanguageLoaded('rust')).toBe(false);
    });
  });

  describe('getLoadedLanguages', () => {
    it('should return list of loaded languages', async () => {
      const mockHighlighter = {
        getLoadedLanguages: () => ['go'],
        loadLanguage: vi.fn().mockResolvedValue(undefined),
      } as any;

      const loader = new LanguageLoader(mockHighlighter, true);
      await loader.loadLanguage('python');
      await loader.loadLanguage('rust');

      const loaded = loader.getLoadedLanguages();
      expect(loaded).toContain('python');
      expect(loaded).toContain('rust');
    });
  });

  describe('clear', () => {
    it('should clear the cache', async () => {
      const mockHighlighter = {
        getLoadedLanguages: () => ['go'],
        loadLanguage: vi.fn().mockResolvedValue(undefined),
      } as any;

      const loader = new LanguageLoader(mockHighlighter, true);
      await loader.loadLanguage('python');

      loader.clear();

      expect(loader.getLoadedLanguages()).toHaveLength(0);
    });
  });
});

