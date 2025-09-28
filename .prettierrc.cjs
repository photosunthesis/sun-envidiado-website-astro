module.exports = {
  // Explicitly load the Astro plugin so Prettier can parse .astro files.
  // Prettier normally auto-loads plugins from node_modules, but having
  // this file makes the intent explicit and helps some editors/CI.
  plugins: ['prettier-plugin-astro'],
  // Keep default formatting rules; you can extend these as needed.
};
