import { defineConfig , loadEnv } from 'vite';
import { resolve } from 'pathe';
import vue from '@vitejs/plugin-vue';
import WindiCSS from 'vite-plugin-windicss';
import VueI18n from '@intlify/vite-plugin-vue-i18n';
import Components from 'unplugin-vue-components/vite'
import PurgeIcons from 'vite-plugin-purge-icons';
import ViteFonts from 'vite-plugin-fonts';
import svgLoader from 'vite-svg-loader';
const fonts = ['Alfa+Slab+One','Asap+Condensed','Abel','Alice','Alegreya','Amethysta','Archivo+Black','Barlow','Barlow+Condensed','Bungee+Inline','Expletus+Sans','Lora','Montserrat','Nunito+Sans','Oi','Open+Sans','PT+Sans','Roboto','Roboto+Condensed','Quattrocento','Raleway','Tenor+Sans','Ultra','Yatra+One']
//import Unocss from 'unocss/vite'
//import presetUno from '@unocss/preset-uno'
// export default defineConfig({
import { shortcuts } from './src/styles/unocss'

export default ({ mode }) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};
    return defineConfig({
  server: {
    port: 3000,
    watch: {
      ignored: ["**/server/**","**/.whoobe/**","**/pages/**"],
    },
    cors: true,
  },
  resolve: {
    alias: {
      '/@': resolve(__dirname, './src'),
    },
  },
  plugins: [
    // Unocss({ 
    //   shortcuts : shortcuts,
    //   // shortcuts: {
    //   //   'sidebarLeft' : 'top-0 left-0 max-h-max h-screen w-10 flex flex-col justify-around items-center z-10',
    //   //   'bars' : 'fixed bg-bluegray-900 text-gray-300'
    //   // },
    //   presets: [
    //     presetUno(),
    //   ], 
    // }),
    vue(),
    // https://github.com/jpkleemans/vite-svg-loader
    svgLoader(),
    // https://github.com/antfu/vite-plugin-components
    Components({
      extensions: ['vue'],
      dts: 'src/components.d.ts',
    }),
    // https://github.com/stafyniaksacha/vite-plugin-fonts#readme
    ViteFonts({
      google: {
        families: fonts
      },
    }),

    // https://github.com/antfu/vite-plugin-windicss
    WindiCSS({
      safelist: 'prose prose-sm m-auto text-left',
    }),

    // https://github.com/antfu/purge-icons/tree/main/packages/vite-plugin-purge-icons
    PurgeIcons({
      /* PurgeIcons Options */
    }),

    // https://github.com/intlify/vite-plugin-vue-i18n
    VueI18n({
      include: [resolve(__dirname, './locales/**')],
    }),
    
  ],

  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
    ],
    exclude: [
      'vue-demi',
    ],
  },
});
}
