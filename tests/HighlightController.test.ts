import { describe, it, expect, beforeEach, vi } from 'vitest';
import { HighlightController } from '../src/controllers/HighlightController';

describe('HighlightController', () => {
  describe('detectLanguage', () => {
    it('should detect language from class name', () => {
      const mockHighlighter = {} as any;
      const mockLanguageLoader = {} as any;
      const controller = new HighlightController(
        mockHighlighter,
        mockLanguageLoader,
        'one-dark-pro',
        { lineNumbers: false, copyButton: false }
      );

      const codeElement = document.createElement('code');
      codeElement.className = 'language-go';

      const lang = controller.detectLanguage(codeElement);
      expect(lang).toBe('go');
    });

    it('should return text for unknown language', () => {
      const mockHighlighter = {} as any;
      const mockLanguageLoader = {} as any;
      const controller = new HighlightController(
        mockHighlighter,
        mockLanguageLoader,
        'one-dark-pro',
        { lineNumbers: false, copyButton: false }
      );

      const codeElement = document.createElement('code');

      const lang = controller.detectLanguage(codeElement);
      expect(lang).toBe('text');
    });

    it('should handle multiple classes', () => {
      const mockHighlighter = {} as any;
      const mockLanguageLoader = {} as any;
      const controller = new HighlightController(
        mockHighlighter,
        mockLanguageLoader,
        'one-dark-pro',
        { lineNumbers: false, copyButton: false }
      );

      const codeElement = document.createElement('code');
      codeElement.className = 'some-class language-typescript another-class';

      const lang = controller.detectLanguage(codeElement);
      expect(lang).toBe('typescript');
    });
  });

  describe('setTheme', () => {
    it('should update the current theme', () => {
      const mockHighlighter = {} as any;
      const mockLanguageLoader = {} as any;
      const controller = new HighlightController(
        mockHighlighter,
        mockLanguageLoader,
        'one-dark-pro',
        { lineNumbers: false, copyButton: false }
      );

      controller.setTheme('github-light');
      expect((controller as any).currentTheme).toBe('github-light');
    });
  });

  describe('setOptions', () => {
    it('should update options', () => {
      const mockHighlighter = {} as any;
      const mockLanguageLoader = {} as any;
      const controller = new HighlightController(
        mockHighlighter,
        mockLanguageLoader,
        'one-dark-pro',
        { lineNumbers: false, copyButton: false }
      );

      controller.setOptions({ lineNumbers: true });
      expect((controller as any).options.lineNumbers).toBe(true);
      expect((controller as any).options.copyButton).toBe(false);
    });
  });
});

