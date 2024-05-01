// import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineConfig(({ command, mode }) => {
     const env = loadEnv(mode, process.cwd(), 'ENV')

     return {
          server: {
               port: 3001,
          },
          define: {
               __APP_ENV__: JSON.stringify(env.APP_ENV),
          },
          plugins: [react()],
          envPrefix: "FE_"
     }
})