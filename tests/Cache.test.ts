import { describe, it, expect } from 'vitest';
import { Cache } from '../src/utils/cache';

describe('Cache', () => {
  it('should store and retrieve values', () => {
    const cache = new Cache<string>();
    cache.set('key1', 'value1');
    
    expect(cache.get('key1')).toBe('value1');
  });

  it('should return undefined for missing keys', () => {
    const cache = new Cache<string>();
    
    expect(cache.get('missing')).toBeUndefined();
  });

  it('should check if key exists', () => {
    const cache = new Cache<string>();
    cache.set('key1', 'value1');
    
    expect(cache.has('key1')).toBe(true);
    expect(cache.has('missing')).toBe(false);
  });

  it('should clear all entries', () => {
    const cache = new Cache<string>();
    cache.set('key1', 'value1');
    cache.set('key2', 'value2');
    
    cache.clear();
    
    expect(cache.has('key1')).toBe(false);
    expect(cache.has('key2')).toBe(false);
    expect(cache.size()).toBe(0);
  });

  it('should return all keys', () => {
    const cache = new Cache<string>();
    cache.set('key1', 'value1');
    cache.set('key2', 'value2');
    
    const keys = cache.keys();
    
    expect(keys).toContain('key1');
    expect(keys).toContain('key2');
    expect(keys).toHaveLength(2);
  });

  it('should return size', () => {
    const cache = new Cache<string>();
    
    expect(cache.size()).toBe(0);
    
    cache.set('key1', 'value1');
    expect(cache.size()).toBe(1);
    
    cache.set('key2', 'value2');
    expect(cache.size()).toBe(2);
  });
});

