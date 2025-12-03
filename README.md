# Shiki Syntax Highlighter for Obsidian

Enhanced syntax highlighting for Obsidian using Shiki and TextMate grammars, providing IDE-quality code rendering in your notes.

## Features

- **IDE-Quality Highlighting**: Uses the same TextMate grammars as VSCode for accurate, semantic syntax highlighting
- **100+ Languages**: Support for all languages bundled with Shiki, with automatic lazy loading
- **Popular Themes**: Choose from One Dark Pro, Dracula, Nord, GitHub Dark/Light, and more
- **Automatic Theme Sync**: Seamlessly switches between light and dark themes as you toggle Obsidian's theme
- **Copy Button**: Quick copy-to-clipboard functionality on hover
- **Line Numbers**: Optional line numbering for code blocks
- **Live Preview Support**: Works in both Reading mode and Live Preview mode
- **Lightweight**: Lazy loading keeps memory footprint minimal
- **Zero Configuration**: Works out of the box with sensible defaults

## Why Shiki?

Obsidian's default syntax highlighting uses CodeMirror 6 with Lezer parsers, which have limitations:

- Inaccurate tokenization (e.g., Go's `context.Context` renders as one token instead of `package.Type`)
- Limited semantic understanding compared to IDE-grade parsers
- Theme inconsistency for users coming from VSCode or other IDEs

Shiki solves these problems by using the exact same TextMate grammars as VSCode, providing:

- 95%+ visual accuracy match with VSCode
- Accurate semantic coloring for complex language constructs
- Consistent experience across your editor and notes

## Installation

### From Obsidian Community Plugins

1. Open Obsidian Settings
2. Go to Community Plugins and disable Safe Mode
3. Click Browse and search for "Shiki Syntax Highlighter"
4. Click Install, then Enable

### Manual Installation

1. Download the latest release from [GitHub Releases](https://github.com/yaklabco/obsidian-shiki-highlighter/releases)
2. Extract the files to your vault's plugins folder: `<vault>/.obsidian/plugins/shiki-highlighter/`
3. Reload Obsidian
4. Enable the plugin in Settings > Community Plugins

## Usage

Once installed, the plugin automatically highlights all code blocks in your notes. No additional configuration needed!

### Basic Example

```go
package main

import "context"

func process(ctx context.Context) error {
    // context.Context now renders with proper package/type distinction
    return nil
}
```

## Settings

Access plugin settings through Settings > Shiki Syntax Highlighter:

| Setting | Description | Default |
|---------|-------------|---------|
| Light mode theme | Theme for light mode | `github-light` |
| Dark mode theme | Theme for dark mode | `one-dark-pro` |
| Lazy load languages | Load grammars on-demand | `true` |
| Show line numbers | Display line numbers | `false` |
| Show copy button | Show copy button on hover | `true` |
| Enable in Live Preview | Apply highlighting in Live Preview | `true` |

### Available Themes

- One Dark Pro
- GitHub Dark
- GitHub Light
- Dracula
- Nord
- Monokai
- Min Light
- Min Dark

### Supported Languages

The plugin pre-loads these languages:

- Go
- TypeScript/JavaScript
- Python
- Rust
- Java
- YAML
- JSON
- Bash
- SQL

All other languages supported by Shiki (100+) are automatically loaded on demand.

## Performance

- **Startup**: Zero impact on Obsidian startup time
- **Highlighting**: < 200ms for 500-line code blocks
- **Memory**: Minimal footprint with lazy loading
- **Bundle Size**: < 500KB

## Compatibility

- **Obsidian Version**: 1.0.0 or later
- **Mobile**: Fully supported on iOS and Android
- **Themes**: Compatible with all Obsidian themes
- **Other Plugins**: No known conflicts

## Development

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and guidelines.

### Quick Start

```bash
git clone https://github.com/yaklabco/obsidian-shiki-highlighter.git
cd obsidian-shiki-highlighter
npm install
npm run dev
```

### Running Tests

```bash
npm test
```

## Troubleshooting

### Code blocks not highlighting

1. Check that the plugin is enabled in Settings > Community Plugins
2. Try toggling the plugin off and on
3. Verify your code fence uses triple backticks with a supported language

### Performance issues in Live Preview

1. Disable "Enable in Live Preview" in plugin settings
2. Highlighting will still work in Reading mode

### Theme not updating

1. Try toggling Obsidian's theme (light/dark) twice
2. Reload Obsidian
3. Check that your theme selection in settings is valid

## Roadmap

- [ ] Custom theme support
- [ ] Per-language theme overrides
- [ ] Inline code highlighting
- [ ] Export highlighted code as HTML
- [ ] Grammar customization UI

## Credits

- Built with [Shiki](https://shiki.matsu.io/) by Pine Wu and contributors
- Inspired by VSCode's syntax highlighting
- TextMate grammars from the open-source community

## License

MIT License - see [LICENSE](LICENSE) for details

## Support

- Report bugs: [GitHub Issues](https://github.com/yaklabco/obsidian-shiki-highlighter/issues)
- Feature requests: [GitHub Discussions](https://github.com/yaklabco/obsidian-shiki-highlighter/discussions)
- Documentation: [GitHub Wiki](https://github.com/yaklabco/obsidian-shiki-highlighter/wiki)

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history.

---

Made with care by [James Ainslie](https://github.com/yaklabco)

