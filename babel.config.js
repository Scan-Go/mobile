module.exports = (api) => {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
            [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: './lib/tamagui/config.ts',
          logTimings: true,
          disableExtraction: process.env.NODE_ENV === 'development',
          experimentalFlattenThemesOnNative: true
        },
      ],
      '@babel/plugin-proposal-export-namespace-from',
      'react-native-reanimated/plugin'
    ]
  };
};
