// vite.config.js
import { defineConfig } from "file:///E:/Projects/Order-Management/node_modules/vite/dist/node/index.js";
import react from "file:///E:/Projects/Order-Management/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { VitePWA } from "file:///E:/Projects/Order-Management/node_modules/vite-plugin-pwa/dist/index.mjs";
import mkcert from "file:///E:/Projects/Order-Management/node_modules/vite-plugin-mkcert/dist/mkcert.mjs";
import htmlPurge from "file:///E:/Projects/Order-Management/node_modules/vite-plugin-purgecss/dist/index.mjs";
var vite_config_default = defineConfig({
  test: {
    coverage: {
      all: true,
      include: ["src/**/*.js"],
      reportsDirectory: "./coverage",
      exclude: ["src/**/*.test.jsx", "src/**/*.test.js", "src/**/*.e2e.jsx", "src/**/*.e2e.js"]
    },
    testTimeout: 15e3,
    hookTimeout: 15e3
  },
  server: {
    host: true,
    https: false
  },
  plugins: [
    htmlPurge({
      content: ["./src/index.html", "./src/**/*.jsx"],
      css: ["./src/style.css", "./src/**/*.css"],
      variables: true,
      safelist: ["html", "body"]
    }),
    react(),
    mkcert(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      devOptions: {
        enabled: true
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"]
      },
      includeAssets: ["template.jpg", "favicon.ico"],
      manifest: {
        name: "Order Management",
        short_name: "Order Management",
        description: "Order Management and analytics",
        theme_color: "#212529",
        icons: [
          {
            src: "icon_192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "icon_512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "icon_512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      }
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxQcm9qZWN0c1xcXFxPcmRlci1NYW5hZ2VtZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxQcm9qZWN0c1xcXFxPcmRlci1NYW5hZ2VtZW50XFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9Qcm9qZWN0cy9PcmRlci1NYW5hZ2VtZW50L3ZpdGUuY29uZmlnLmpzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlc3RcIiAvPlxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXHJcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnXHJcbmltcG9ydCBta2NlcnQgZnJvbSAndml0ZS1wbHVnaW4tbWtjZXJ0J1xyXG5pbXBvcnQgaHRtbFB1cmdlIGZyb20gJ3ZpdGUtcGx1Z2luLXB1cmdlY3NzJ1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICB0ZXN0OiAge1xyXG4gICAgY292ZXJhZ2U6IHtcclxuICAgICAgYWxsOiB0cnVlLFxyXG4gICAgICBpbmNsdWRlOiBbJ3NyYy8qKi8qLmpzJ10sXHJcbiAgICAgIHJlcG9ydHNEaXJlY3Rvcnk6ICcuL2NvdmVyYWdlJyxcclxuICAgICAgZXhjbHVkZTogWydzcmMvKiovKi50ZXN0LmpzeCcsICdzcmMvKiovKi50ZXN0LmpzJywgJ3NyYy8qKi8qLmUyZS5qc3gnLCAnc3JjLyoqLyouZTJlLmpzJ10sXHJcblxyXG4gICAgfSxcclxuICAgIHRlc3RUaW1lb3V0OiAxNV8wMDAsXHJcbiAgICBob29rVGltZW91dDogMTVfMDAwLFxyXG4gIH0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICBob3N0OiB0cnVlLFxyXG4gICAgaHR0cHM6IGZhbHNlXHJcbiAgfSxcclxuICBwbHVnaW5zOiBbXHJcbiAgICBodG1sUHVyZ2UoeyBcclxuICAgICAgY29udGVudDogWycuL3NyYy9pbmRleC5odG1sJywgJy4vc3JjLyoqLyouanN4J10sXHJcbiAgICAgIGNzczogWycuL3NyYy9zdHlsZS5jc3MnLCAnLi9zcmMvKiovKi5jc3MnXSxcclxuICAgICAgdmFyaWFibGVzOiB0cnVlLFxyXG4gICAgICBzYWZlbGlzdDogWydodG1sJywgJ2JvZHknXVxyXG4gICAgfSksXHJcbiAgICByZWFjdCgpLFxyXG4gICAgbWtjZXJ0KCksXHJcbiAgICBWaXRlUFdBKHsgXHJcbiAgICAgIHJlZ2lzdGVyVHlwZTogJ2F1dG9VcGRhdGUnLFxyXG4gICAgICBpbmplY3RSZWdpc3RlcjogJ2F1dG8nLFxyXG4gICAgICBkZXZPcHRpb25zOiB7XHJcbiAgICAgICAgZW5hYmxlZDogdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgICB3b3JrYm94OiB7XHJcbiAgICAgICAgZ2xvYlBhdHRlcm5zOiBbJyoqLyoue2pzLGNzcyxodG1sLGljbyxwbmcsc3ZnfSddXHJcbiAgICAgIH0sXHJcbiAgICAgIGluY2x1ZGVBc3NldHM6IFsndGVtcGxhdGUuanBnJywnZmF2aWNvbi5pY28nXSxcclxuICAgICAgbWFuaWZlc3Q6IHtcclxuICAgICAgICBuYW1lOiAnT3JkZXIgTWFuYWdlbWVudCcsXHJcbiAgICAgICAgc2hvcnRfbmFtZTonT3JkZXIgTWFuYWdlbWVudCcsXHJcbiAgICAgICAgZGVzY3JpcHRpb246ICdPcmRlciBNYW5hZ2VtZW50IGFuZCBhbmFseXRpY3MnLFxyXG4gICAgICAgIHRoZW1lX2NvbG9yOiAnIzIxMjUyOScsXHJcbiAgICAgICAgaWNvbnM6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiAnaWNvbl8xOTJ4MTkyLnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnMTkyeDE5MicsXHJcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICdpY29uXzUxMng1MTIucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICc1MTJ4NTEyJyxcclxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZydcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogJ2ljb25fNTEyeDUxMi5wbmcnLFxyXG4gICAgICAgICAgICBzaXplczogJzUxMng1MTInLFxyXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcclxuICAgICAgICAgICAgcHVycG9zZTogJ2FueSBtYXNrYWJsZSdcclxuICAgICAgICAgIH1cclxuICAgICAgICBdLFxyXG4gICAgICB9XHJcbiAgICAgfSksXHJcbiAgXSxcclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQWU7QUFDeEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sZUFBZTtBQUd0QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFPO0FBQUEsSUFDTCxVQUFVO0FBQUEsTUFDUixLQUFLO0FBQUEsTUFDTCxTQUFTLENBQUMsYUFBYTtBQUFBLE1BQ3ZCLGtCQUFrQjtBQUFBLE1BQ2xCLFNBQVMsQ0FBQyxxQkFBcUIsb0JBQW9CLG9CQUFvQixpQkFBaUI7QUFBQSxJQUUxRjtBQUFBLElBQ0EsYUFBYTtBQUFBLElBQ2IsYUFBYTtBQUFBLEVBQ2Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxFQUNUO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxVQUFVO0FBQUEsTUFDUixTQUFTLENBQUMsb0JBQW9CLGdCQUFnQjtBQUFBLE1BQzlDLEtBQUssQ0FBQyxtQkFBbUIsZ0JBQWdCO0FBQUEsTUFDekMsV0FBVztBQUFBLE1BQ1gsVUFBVSxDQUFDLFFBQVEsTUFBTTtBQUFBLElBQzNCLENBQUM7QUFBQSxJQUNELE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxJQUNQLFFBQVE7QUFBQSxNQUNOLGNBQWM7QUFBQSxNQUNkLGdCQUFnQjtBQUFBLE1BQ2hCLFlBQVk7QUFBQSxRQUNWLFNBQVM7QUFBQSxNQUNYO0FBQUEsTUFDQSxTQUFTO0FBQUEsUUFDUCxjQUFjLENBQUMsZ0NBQWdDO0FBQUEsTUFDakQ7QUFBQSxNQUNBLGVBQWUsQ0FBQyxnQkFBZSxhQUFhO0FBQUEsTUFDNUMsVUFBVTtBQUFBLFFBQ1IsTUFBTTtBQUFBLFFBQ04sWUFBVztBQUFBLFFBQ1gsYUFBYTtBQUFBLFFBQ2IsYUFBYTtBQUFBLFFBQ2IsT0FBTztBQUFBLFVBQ0w7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDWDtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRCxDQUFDO0FBQUEsRUFDSjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
