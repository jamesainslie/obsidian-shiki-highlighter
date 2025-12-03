/**
 * Plugin settings interface
 */
export interface ShikiSettings {
  theme: {
    light: string;
    dark: string;
  };
  languages: string[];
  lazyLoad: boolean;
  lineNumbers: boolean;
  copyButton: boolean;
  enableInLivePreview: boolean;
}

/**
 * Default settings
 */
export const DEFAULT_SETTINGS: ShikiSettings = {
  theme: {
    light: 'github-light',
    dark: 'one-dark-pro',
  },
  languages: ['go', 'typescript', 'python', 'rust', 'yaml', 'json', 'bash', 'javascript', 'java', 'sql'],
  lazyLoad: true,
  lineNumbers: false,
  copyButton: true,
  enableInLivePreview: true,
};

/**
 * Available themes
 */
export const AVAILABLE_THEMES = [
  'one-dark-pro',
  'github-dark',
  'github-light',
  'dracula',
  'nord',
  'monokai',
  'min-light',
  'min-dark',
] as const;

export type ThemeName = typeof AVAILABLE_THEMES[number];

