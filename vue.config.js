module.exports = {
  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "./src/sw.js",
      swDest: "service-worker.js",
      globPatterns: [
        "dist/*.{js,png,html,css,gif,GIF,PNG,JPG,jpeg,woff,woff2,ttf,svg,eot}",
      ],
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
    },
    name: "Random Movies",
  },
  //publicPath : process.env.NODE_ENV === 'production'  ? '/movies/' : '/'
};
