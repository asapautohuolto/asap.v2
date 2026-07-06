/// <reference types="vite/client" />

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';

interface ImportMeta {
	glob: (pattern: string, options?: any) => Record<string, any>;
	globEager?: (pattern: string) => Record<string, any>;
}
