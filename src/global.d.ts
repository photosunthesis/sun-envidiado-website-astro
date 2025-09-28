export {};

declare global {
  interface Window {
    __runSiteCommand?: (token: string, fromAction?: boolean) => void;
  }
}
