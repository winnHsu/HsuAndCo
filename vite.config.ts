import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load env vars with no prefix filtering
  const env = loadEnv(mode, process.cwd(), '')

  return {
    // REQUIRED for GitHub Pages project site
    // Must match repo name exactly
    base: '/HsuAndCo/',

    plugins: [react()],

    server: {
      port: 3000,
      host: '0.0.0.0',
    },

    // Use import.meta.env, not process.env
    define: {
      __GEMINI_API_KEY__: JSON.stringify(env.GEMINI_API_KEY),
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  }
})
