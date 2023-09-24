import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
// import { VitePWA } from "vite-plugin-pwa";
import vue from "@vitejs/plugin-vue";
// import viteCompression from "vite-plugin-compression";

export default ({ mode }) =>
    defineConfig({
      plugins: [
        vue(),
        // VitePWA({
        //   registerType: "autoUpdate",
        //   workbox: {
        //     skipWaiting: true,
        //     clientsClaim: true,
        //     runtimeCaching: [
        //       {
        //         urlPattern: /(.*?)\.(js|css|woff2|woff|ttf)/, // js / css 静态资源缓存
        //         handler: "CacheFirst",
        //         options: {
        //           cacheName: "js-css-cache",
        //         },
        //       },
        //       {
        //         urlPattern: /(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/, // 图片缓存
        //         handler: "CacheFirst",
        //         options: {
        //           cacheName: "image-cache",
        //         },
        //       },
        //     ],
        //   },
        //   manifest: {
        //     name: loadEnv(mode, process.cwd()).VITE_SITE_NAME,
        //     short_name: loadEnv(mode, process.cwd()).VITE_SITE_NAME,
        //     description: loadEnv(mode, process.cwd()).VITE_SITE_DES,
        //     display: "standalone",
        //     start_url: "/",
        //     theme_color: "#424242",
        //     background_color: "#424242",
        //     icons: [
        //       {
        //         src: "/images/icon/512.png",
        //         sizes: "512x512",
        //         type: "image/png",
        //       },
        //     ],
        //   },
        // }),
        // viteCompression(),
      ],
      server: {
        // host:'localhost',
        port: 3005,
      },
      resolve: {
        alias: [
          {
            find: "@",
            replacement: resolve(__dirname, "src"),
          },
        ],
      },
      css: {
        preprocessorOptions: {
          scss: {
            charset: false,
            additionalData: `@import "./src/style/global.scss";`,
          },
        },
      },
      build: {
        minify: "terser",
        terserOptions: {
          compress: {
            pure_funcs: ["console.log"],
          },
        },
      },
    });
