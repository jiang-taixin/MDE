import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  showEnvDetail(env)
  return {
    plugins: [
      vue(),
      vueJsx(),
      Components({
        dirs: ['src/components'],
        extensions: ['vue'],
        deep: true,
      }),
      AutoImport({
        resolvers: [AntDesignVueResolver()],
        imports: ['vue', 'vue-router', 'pinia'],
        dirs: [
          'src/hooks',
          'src/http',
          'src/router',
          'src/schemas',
          'src/services',
          'src/stores',
          'src/utils',
          'src/components',
          'src/constants',
        ],
        dts: true,
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@assets': resolve(__dirname, 'src', 'assets'),
      },
    },
    define: {
      'process.env': env,
    },
    build: {
      target: ['es2015'],
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].[hash].js`,
          chunkFileNames: `assets/[name].[hash].js`,
          assetFileNames: `assets/[name].[hash].[ext]`,
        },
        plugins: [],
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler', // or 'modern'
        },
      },
    },

    server: {
      port: 8088,
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''), // 路径重写
        },
      },
    },
  }
})

function showEnvDetail(env: { [key: string]: string }): void {
  console.log(
    '\x1B[32m =========================== Environment Message =========================== \x1B[0m ',
  )
  for (const key in env) {
    console.log(`\x1B[32m ${key}: \x1B[0m `, `\x1B[36m${env[key]}\x1B[0m`)
  }
  console.log(
    '\x1B[32m =========================================================================== \x1B[0m ',
  )
}
