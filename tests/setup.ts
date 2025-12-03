/**
 * Vitest setup file
 */

// Mock Obsidian API
global.window = global.window || {};

// Mock basic DOM APIs that might be missing in jsdom
if (typeof navigator === 'undefined') {
  (global as any).navigator = {
    clipboard: {
      writeText: async (text: string) => {
        return Promise.resolve();
      },
    },
  };
}

// Mock Obsidian classes
export class MockApp {
  workspace = {
    on: () => {},
    trigger: () => {},
  };
}

export class MockPlugin {
  app = new MockApp();
  loadData = async () => ({});
  saveData = async () => {};
}

