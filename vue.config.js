module.exports = {
   pwa: {
     workboxPluginMode: 'InjectManifest',
     workboxOptions: {
       swSrc: './src/sw.js',
       swDest: 'service-worker.js'
     },
     name: 'Random Movies'
   },
  //publicPath : process.env.NODE_ENV === 'production'  ? '/movies/' : '/'
}