import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { VitePWA } from 'vite-plugin-pwa'

// const manifestForPlugIn = {
//   registerType:'prompt',
//   includeAssests:['favicon.ico', "apple-touch-icon.png", "maskable_icon.png"],
//   manifest:{
//     name:"Karagada",
//     short_name:"Kargada",
//     description:"A Freight Management System",
//     icons:[{
//       src: '/kargada-logo-192.png',
//       sizes:'192x192',
//       type:'image/png',
      
//     },
//     {
//       src:'/kargada-logo-256.png',
//       sizes:'256x256',
//       type:'image/png',
      
//     },
//     {
//       src: '/kargada-logo-384.png',
//       sizes:'384x384',
//       type:'image/png',
   
//     },
//     {
//       src: '/kargada-logo-512.png',
//       sizes:'512x512',
//       type:'image/png',
   
//     },
//     {
//       src: '/maskable_icon.png',
//       sizes:'196x196',
//       type:'image/png',
//       purpose:'any maskable',
//     }
    
//   ],
//   theme_color:'#1976d2',
//   background_color:'#1976d2',
//   display:"standalone",
//   scope:'/',
//   start_url:"/",
//   orientation:'any'
//   }
// }
// , VitePWA(manifestForPlugIn)
// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()]
})
