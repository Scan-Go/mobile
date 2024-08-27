// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
let config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true
});

const { transformer, resolver } = config;

config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer')
};
config.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
  sourceExts: [...resolver.sourceExts, 'svg']
};

// 2. Enable Tamagui
const { withTamagui } = require('@tamagui/metro-plugin');
config.resolver.sourceExts.push('mjs');
module.exports = withTamagui(config, {
  components: ['tamagui'],
  config: './lib/tamagui/config.ts',
  outputCSS: './tamagui-web.css'
});
