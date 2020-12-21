import path from 'path';
import { defineConfig } from 'umi';

export default defineConfig({
  // targets: {
  //   // chrome:56,
  //   firefox: 51,
  //   // opera:43,
  // },
  // ssr: {}, // 服务端渲染
  exportStatic: {}, //每个路由都会有一个对应 html
  dynamicImport: {
    loading: '@/components/LoadingCp',
  },
  // dva: {
  //   immer: true,
  // },
  devtool: 'source-map',
  antd: {},
  title: '大屏系统',
  // exportStatic: {},
  base: '/',
  publicPath: '/',
  outputPath: 'dist',
  esbuild: {},
  routes: [
    {
      exact: false,
      path: '/',
      //component: '@/layouts/index',
      routes: [
        {
          path: '/',
          component: '../pages/home',
        },
        {
          path: '/editor',
          component: '../pages/editor',
        },
        {
          path: '/ide',
          component: '../pages/ide',
        },
        {
          path: '/help',
          component: '../pages/help',
        },
        {
          path: '/login',
          component: '../pages/login',
        },
        {
          path: '/mobileTip',
          component: '../pages/mobileTip',
        },
        {
          path: '/preview',
          component: '../pages/editor/preview',
        },
      ],
    },
  ],
  theme: {
    'primary-color': '#2F54EB',
    // "btn-primary-bg": "#2F54EB"
  },
  extraBabelPlugins: [['import', { libraryName: 'zarm', style: true }]],
  // sass: {},
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
    utils: path.resolve(__dirname, 'src/utils/'),
    assets: path.resolve(__dirname, 'src/assets/'),
  },
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:3000/',
      changeOrigin: true,
      //'pathRewrite': { '^/api' : '' },
    },
    '/uploadFile': {
      target: 'http://127.0.0.1:3000/',
      changeOrigin: true,
    },
  },
});
