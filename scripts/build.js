const tasks = require('./tasks');

tasks.replaceWebpack();
console.log('[Copy assets]');
console.log('-'.repeat(80));
tasks.copyAssets('build');

console.log('[Copy content_scripts]')
console.log('-'.repeat(80));
tasks.copyScripts('build')

console.log('[Webpack Build]');
console.log('-'.repeat(80));
exec('webpack --config webpack/prod.config.js --progress --profile --colors');
