# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bibliophage is a Chrome extension that allows users to add all open tabs in the current window to Chrome's Reading List with a single click. The extension uses Chrome's `readingList` API to manage entries.

## Architecture

The extension follows a simple service worker architecture:

- **Background Service Worker** (`src/background.ts`): Handles the extension's main functionality
  - Listens for toolbar icon clicks via `chrome.action.onClicked`
  - Queries all tabs in the current window using `chrome.tabs.query`
  - Adds each tab to the reading list using `chrome.readingList.addEntry`

- **Custom Type Definitions** (`types/chrome.readingList.d.ts`): Provides TypeScript definitions for Chrome's Reading List API, including interfaces for `Entry`, `EntryToAddOrUpdate`, and `QueryOptions`

- **Manifest V3** (`manifest.json`): Defines extension permissions (`tabs`, `readingList`) and service worker configuration

## Development Commands

```bash
# Build the extension (compiles TypeScript to JavaScript)
pnpm run build

# Install dependencies
pnpm install
```

## Build Output

- TypeScript files in `src/` are compiled to `dist/`
- The service worker entry point is `dist/background.js`

## Key APIs Used

- `chrome.tabs.query()`: Get all tabs in current window
- `chrome.readingList.addEntry()`: Add entries to Chrome's reading list
- `chrome.action.onClicked`: Handle extension icon clicks

## Testing

Load the extension in Chrome by:
1. Running `pnpm run build`
2. Going to `chrome://extensions/`
3. Loading the project directory as an unpacked extension
4. Clicking the extension icon to add all current tabs to reading list