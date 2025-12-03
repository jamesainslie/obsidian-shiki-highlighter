# Obsidian Community Plugin Submission Guide

This document outlines the steps to submit the Shiki Syntax Highlighter plugin to the Obsidian Community Plugins repository.

## Pre-Submission Checklist

Before submitting, ensure all requirements are met:

### Code Requirements

- [x] Plugin builds successfully without errors
- [x] TypeScript compilation passes
- [x] All tests pass
- [x] No critical linter errors
- [x] Bundle size is under 600KB (target: < 500KB)

### Documentation Requirements

- [x] README.md with clear description and usage instructions
- [x] LICENSE file (MIT)
- [x] CHANGELOG.md following Keep a Changelog format
- [x] manifest.json with all required fields
- [x] versions.json mapping plugin versions to Obsidian versions

### Repository Requirements

- [x] Clean git history
- [x] Descriptive commit messages
- [x] GitHub repository is public
- [x] Repository has a clear description
- [x] Issue templates configured
- [x] GitHub Actions for CI/CD

## Submission Process

### Step 1: Prepare the Release

1. **Test thoroughly**
   ```bash
   npm test
   npm run build
   ```

2. **Verify manifest.json**
   ```json
   {
     "id": "shiki-highlighter",
     "name": "Shiki Syntax Highlighter",
     "version": "0.1.0",
     "minAppVersion": "1.0.0",
     "description": "Enhanced syntax highlighting using Shiki and TextMate grammars for IDE-quality code rendering",
     "author": "James Ainslie",
     "authorUrl": "https://github.com/yaklabco",
     "isDesktopOnly": false
   }
   ```

3. **Update versions.json**
   ```json
   {
     "0.1.0": "1.0.0"
   }
   ```

### Step 2: Create GitHub Release

1. **Tag the release**
   ```bash
   git tag -a v0.1.0 -m "Release v0.1.0: Initial release"
   git push origin v0.1.0
   ```

2. **GitHub Actions will automatically**:
   - Build the plugin
   - Run tests
   - Create a release
   - Attach `main.js`, `manifest.json`, and `styles/styles.css`

3. **Manually create release notes** (if Actions doesn't):
   - Go to GitHub Releases
   - Create new release from tag v0.1.0
   - Copy content from CHANGELOG.md
   - Attach files: `main.js`, `manifest.json`, `styles/styles.css`

### Step 3: Submit to Community Plugins

1. **Fork the obsidian-releases repository**
   ```bash
   git clone https://github.com/obsidianmd/obsidian-releases.git
   cd obsidian-releases
   ```

2. **Create a new branch**
   ```bash
   git checkout -b add-shiki-highlighter
   ```

3. **Add your plugin to community-plugins.json**
   
   Add this entry to the JSON array:
   ```json
   {
     "id": "shiki-highlighter",
     "name": "Shiki Syntax Highlighter",
     "author": "James Ainslie",
     "description": "Enhanced syntax highlighting using Shiki and TextMate grammars for IDE-quality code rendering",
     "repo": "yaklabco/obsidian-shiki-highlighter"
   }
   ```

4. **Commit and push**
   ```bash
   git add community-plugins.json
   git commit -m "Add Shiki Syntax Highlighter plugin"
   git push origin add-shiki-highlighter
   ```

5. **Create Pull Request**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Title: "Add Shiki Syntax Highlighter plugin"
   - Description: Brief overview of what the plugin does
   - Submit the PR

### Step 4: Respond to Review

The Obsidian team will review your submission. They may:

- Request changes to code or documentation
- Ask for clarifications
- Test the plugin themselves

**Be prepared to**:
- Respond within a few days
- Make requested changes promptly
- Provide additional information if needed

## Post-Submission

After approval:

1. **Monitor issues**: Users may report bugs or request features
2. **Regular updates**: Keep the plugin maintained
3. **Version releases**: Follow the same release process for updates

## Common Rejection Reasons

Avoid these common issues:

- Missing required files (manifest.json, main.js)
- Bundle size too large (> 2MB)
- Security concerns (eval, arbitrary code execution)
- Poor documentation
- Broken functionality
- Copyright/license issues

## Resources

- [Obsidian Plugin Guidelines](https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines)
- [Submit Your Plugin](https://docs.obsidian.md/Plugins/Releasing/Submit+your+plugin)
- [Plugin Review Process](https://docs.obsidian.md/Plugins/Releasing/Plugin+review+process)
- [obsidian-releases Repository](https://github.com/obsidianmd/obsidian-releases)

## Timeline

Expected timeline after submission:

- Initial review: 1-3 weeks
- Feedback/changes: 1-2 weeks
- Final approval: 1-3 days
- Total: ~1 month from submission to approval

## Contact

If you have questions during the submission process:

- GitHub Issues: For technical problems with the plugin
- Obsidian Discord: #plugin-dev channel for general questions
- obsidian-releases PR: For submission-specific questions

