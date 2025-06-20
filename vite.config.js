import { webcrypto } from 'crypto'

if (!globalThis.crypto) {
  globalThis.crypto = webcrypto
}

import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
})
