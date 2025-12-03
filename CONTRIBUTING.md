# Contributing to Shiki Syntax Highlighter

Thank you for your interest in contributing to the Shiki Syntax Highlighter plugin for Obsidian!

## Development Setup

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Obsidian installed for testing

### Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yaklabco/obsidian-shiki-highlighter.git
cd obsidian-shiki-highlighter
```

2. Install dependencies:
```bash
npm install
```

3. Build the plugin:
```bash
npm run build
```

4. For development with hot reload:
```bash
npm run dev
```

### Testing in Obsidian

1. Create a test vault or use an existing one
2. Create a symlink from your vault's plugin folder to the development folder:
```bash
ln -s /path/to/obsidian-shiki-highlighter /path/to/vault/.obsidian/plugins/shiki-highlighter
```
3. Reload Obsidian
4. Enable the plugin in Settings > Community plugins

### Running Tests

```bash
npm test
```

For test coverage:
```bash
npm run test:coverage
```

## Code Structure

- `src/main.ts` - Plugin entry point
- `src/controllers/` - Core logic controllers
  - `HighlightController.ts` - Handles code block highlighting
  - `ThemeController.ts` - Manages themes and light/dark mode
  - `LanguageLoader.ts` - Lazy loads language grammars
- `src/settings/` - Settings interface and tab
- `src/editor/` - CodeMirror 6 extensions
- `src/utils/` - Utility functions
- `tests/` - Unit and integration tests

## Development Guidelines

### Code Style

- Follow the existing code style
- Use TypeScript strict mode
- Add JSDoc comments for public APIs
- Run the linter before committing: `npx eslint src --ext .ts`

### Commits

- Use clear, descriptive commit messages
- Follow conventional commit format when possible
- Keep commits focused and atomic

### Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Update documentation if needed
7. Submit a pull request

### Pull Request Guidelines

- Provide a clear description of the changes
- Reference any related issues
- Include screenshots for UI changes
- Ensure CI checks pass

## Adding New Features

### Adding New Themes

1. Add the theme name to `AVAILABLE_THEMES` in `src/settings/types.ts`
2. Update the settings UI if needed
3. Test the theme in both light and dark modes

### Adding New Languages

Languages are loaded from Shiki's bundled grammars. To add support:

1. Add the language to the default languages list in `src/settings/types.ts`
2. Test the language highlighting
3. Document any special considerations

## Reporting Bugs

Please use the GitHub issue tracker and follow the bug report template.

## Feature Requests

Feature requests are welcome! Please use the GitHub issue tracker and follow the feature request template.

## Questions

If you have questions about the codebase or development process, feel free to open a discussion on GitHub.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

