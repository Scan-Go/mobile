module.exports = (api) => {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      '@babel/plugin-proposal-export-namespace-from',
            [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: './lib/tamagui/config.ts',
          logTimings: true,
          disableExtraction: process.env.NODE_ENV === 'development',
        },
      ],

      'react-native-reanimated/plugin'
    ]
  };
};
