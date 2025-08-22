const withPWA = require("next-pwa")({
    dest: "public", // محل خروجی service worker
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development", // فقط توی production فعال باشه
  });
  
  module.exports = withPWA({
    reactStrictMode: true,
  });
  