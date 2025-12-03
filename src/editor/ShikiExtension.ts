import { EditorView, ViewPlugin, ViewUpdate, Decoration, DecorationSet } from '@codemirror/view';
import { syntaxTree } from '@codemirror/language';
import { Range } from '@codemirror/state';
import type { Highlighter } from 'shiki';
import type { LanguageLoader } from '../controllers/LanguageLoader';

/**
 * CodeMirror 6 extension for Live Preview mode
 */
export class ShikiEditorPlugin {
  decorations: DecorationSet = Decoration.none;
  private highlighter: Highlighter;
  private languageLoader: LanguageLoader;
  private currentTheme: string;
  private updateTimeout: number | null = null;
  private readonly debounceMs = 150;

  constructor(
    view: EditorView,
    highlighter: Highlighter,
    languageLoader: LanguageLoader,
    theme: string
  ) {
    this.highlighter = highlighter;
    this.languageLoader = languageLoader;
    this.currentTheme = theme;
    this.decorations = this.buildDecorations(view);
  }

  update(update: ViewUpdate): void {
    // Clear existing timeout
    if (this.updateTimeout !== null) {
      window.clearTimeout(this.updateTimeout);
    }

    // Debounce updates to avoid lag during typing
    if (update.docChanged || update.viewportChanged) {
      this.updateTimeout = window.setTimeout(() => {
        this.decorations = this.buildDecorations(update.view);
        this.updateTimeout = null;
      }, this.debounceMs);
    }
  }

  destroy(): void {
    if (this.updateTimeout !== null) {
      window.clearTimeout(this.updateTimeout);
    }
  }

  private buildDecorations(view: EditorView): DecorationSet {
    const decorations: Range<Decoration>[] = [];

    // Iterate through syntax tree to find code blocks
    for (const { from, to } of view.visibleRanges) {
      syntaxTree(view.state).iterate({
        from,
        to,
        enter: (node: any) => {
          // Look for fenced code blocks
          if (node.name === 'FencedCode') {
            // We don't actually replace in Live Preview for now
            // as it interferes with editing. This is a placeholder
            // for potential future enhancement
            
            // const code = doc.sliceString(node.from, node.to);
            // const lines = code.split('\n');
            // const firstLine = lines[0] || '';
            // const langMatch = firstLine.match(/^```(\w+)/);
            // const codeContent = lines.slice(1, -1).join('\n');
          }
        },
      });
    }

    return Decoration.set(decorations);
  }

  setTheme(theme: string): void {
    this.currentTheme = theme;
  }
}

/**
 * Create the CodeMirror 6 ViewPlugin
 */
export function createShikiExtension(
  highlighter: Highlighter,
  languageLoader: LanguageLoader,
  theme: string
) {
  return ViewPlugin.fromClass(
    class {
      plugin: ShikiEditorPlugin;

      constructor(view: EditorView) {
        this.plugin = new ShikiEditorPlugin(view, highlighter, languageLoader, theme);
      }

      update(update: ViewUpdate) {
        this.plugin.update(update);
      }

      destroy() {
        this.plugin.destroy();
      }
    },
    {
      decorations: (v) => v.plugin.decorations,
    }
  );
}

