# Obsidian Shiki Highlighter - Makefile

.PHONY: help install build dev test lint clean manual-install

# Default target
help:
	@echo "Obsidian Shiki Highlighter - Available targets:"
	@echo ""
	@echo "  make install          - Install dependencies"
	@echo "  make build           - Build production bundle"
	@echo "  make dev             - Start development server (watch mode)"
	@echo "  make test            - Run tests"
	@echo "  make test-watch      - Run tests in watch mode"
	@echo "  make test-coverage   - Run tests with coverage report"
	@echo "  make lint            - Run ESLint"
	@echo "  make clean           - Remove build artifacts and node_modules"
	@echo "  make manual-install  - Build and install to Obsidian vault"
	@echo ""

# Install dependencies
install:
	npm install

# Build production bundle
build:
	npm run build

# Start development server
dev:
	npm run dev

# Run tests
test:
	npm run test:run

# Run tests in watch mode
test-watch:
	npm test

# Run tests with coverage
test-coverage:
	npm run test:coverage

# Run linter
lint:
	npm run lint

# Clean build artifacts
clean:
	rm -f main.js main.js.map
	rm -rf node_modules
	rm -f package-lock.json

# Build and install to Obsidian vault
manual-install: build
	@echo "Installing plugin to ~/Development/scratch/.obsidian/plugins/shiki-highlighter/"
	@mkdir -p ~/Development/scratch/.obsidian/plugins/shiki-highlighter
	@cp main.js ~/Development/scratch/.obsidian/plugins/shiki-highlighter/
	@cp manifest.json ~/Development/scratch/.obsidian/plugins/shiki-highlighter/
	@mkdir -p ~/Development/scratch/.obsidian/plugins/shiki-highlighter/styles
	@cp styles/styles.css ~/Development/scratch/.obsidian/plugins/shiki-highlighter/styles/
	@echo "✓ Plugin installed successfully!"
	@echo "✓ Please reload Obsidian to see the changes"

