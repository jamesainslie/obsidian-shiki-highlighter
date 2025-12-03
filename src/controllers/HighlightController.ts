import type { Highlighter, BundledLanguage } from 'shiki';
import type { LanguageLoader } from './LanguageLoader';

export interface HighlightOptions {
  lineNumbers: boolean;
  copyButton: boolean;
}

/**
 * Handles code block detection and Shiki highlighting
 */
export class HighlightController {
  private highlighter: Highlighter;
  private languageLoader: LanguageLoader;
  private options: HighlightOptions;
  private currentTheme: string;

  constructor(
    highlighter: Highlighter,
    languageLoader: LanguageLoader,
    theme: string,
    options: HighlightOptions
  ) {
    this.highlighter = highlighter;
    this.languageLoader = languageLoader;
    this.currentTheme = theme;
    this.options = options;
  }

  /**
   * Update the current theme
   */
  setTheme(theme: string): void {
    this.currentTheme = theme;
  }

  /**
   * Update options
   */
  setOptions(options: Partial<HighlightOptions>): void {
    this.options = { ...this.options, ...options };
  }

  /**
   * Process code blocks in an element (for reading mode)
   */
  async processCodeBlocks(element: HTMLElement): Promise<void> {
    const codeBlocks = element.querySelectorAll('pre > code');

    for (let i = 0; i < codeBlocks.length; i++) {
      const codeBlock = codeBlocks[i] as HTMLElement;
      const pre = codeBlock.parentElement;

      if (!pre || pre.hasAttribute('data-shiki-highlighted')) {
        continue;
      }

      const lang = this.detectLanguage(codeBlock);
      const code = codeBlock.textContent || '';

      if (!code.trim()) {
        continue;
      }

      try {
        const highlighted = await this.highlight(code, lang);
        if (highlighted) {
          pre.innerHTML = highlighted;
          pre.setAttribute('data-shiki-highlighted', 'true');
          pre.setAttribute('data-language', lang);

          if (this.options.copyButton) {
            this.addCopyButton(pre, code);
          }
        }
      } catch (error) {
        console.warn(`Failed to highlight code block (${lang}):`, error);
      }
    }
  }

  /**
   * Detect language from code element class
   */
  detectLanguage(codeElement: HTMLElement): string {
    const classList = Array.from(codeElement.classList);
    
    for (const className of classList) {
      if (className.startsWith('language-')) {
        return className.replace('language-', '');
      }
    }

    return 'text';
  }

  /**
   * Highlight code with Shiki
   */
  async highlight(code: string, lang: string): Promise<string | null> {
    // Normalize language name
    const normalizedLang = this.normalizeLanguage(lang);

    // Try to load the language if lazy loading is enabled
    const loaded = await this.languageLoader.loadLanguage(normalizedLang);

    if (!loaded) {
      // Fallback to plain text
      return this.highlightPlainText(code);
    }

    try {
      const html = this.highlighter.codeToHtml(code, {
        lang: normalizedLang as BundledLanguage,
        theme: this.currentTheme,
        transformers: this.options.lineNumbers ? [
          {
            line(node, line) {
              node.properties['data-line'] = line;
            }
          }
        ] : undefined,
      });

      return html;
    } catch (error) {
      console.warn(`Highlighting failed for language '${normalizedLang}':`, error);
      return this.highlightPlainText(code);
    }
  }

  /**
   * Normalize language names to match Shiki's expected values
   */
  private normalizeLanguage(lang: string): string {
    const langMap: Record<string, string> = {
      'ts': 'typescript',
      'js': 'javascript',
      'py': 'python',
      'rb': 'ruby',
      'sh': 'bash',
      'yml': 'yaml',
      'golang': 'go',
      'md': 'markdown',
      'txt': 'text',
    };

    return langMap[lang.toLowerCase()] || lang.toLowerCase();
  }

  /**
   * Fallback to plain text highlighting
   */
  private highlightPlainText(code: string): string {
    const escaped = this.escapeHtml(code);
    return `<pre class="shiki" style="background-color: var(--code-background)"><code>${escaped}</code></pre>`;
  }

  /**
   * Escape HTML characters
   */
  private escapeHtml(text: string): string {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }

  /**
   * Add copy button to code block
   */
  private addCopyButton(pre: HTMLElement, code: string): void {
    // Remove existing copy button if present
    const existing = pre.querySelector('.shiki-copy-button');
    if (existing) {
      existing.remove();
    }

    const button = document.createElement('button');
    button.className = 'shiki-copy-button';
    button.textContent = 'Copy';
    button.setAttribute('aria-label', 'Copy code to clipboard');

    button.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();

      try {
        await navigator.clipboard.writeText(code);
        button.textContent = 'Copied!';
        button.classList.add('copied');

        setTimeout(() => {
          button.textContent = 'Copy';
          button.classList.remove('copied');
        }, 2000);
      } catch (error) {
        console.error('Failed to copy code:', error);
        button.textContent = 'Failed';
        setTimeout(() => {
          button.textContent = 'Copy';
        }, 2000);
      }
    });

    pre.style.position = 'relative';
    pre.appendChild(button);
  }
}

