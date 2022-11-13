module.exports = function(api) {
  api.cache(true);
  return { 
    plugins: [
      // react-native-dotenv
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env'
        }
      ]
    ],
    presets: ['babel-preset-expo'],
  };
};
