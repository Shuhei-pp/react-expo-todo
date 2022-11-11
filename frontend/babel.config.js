module.exports = function(api) {
  api.cache(true);
  return { 
    plugins: [
      // react-native-dotenv
      [
        'module:react-native-dotenv',
        {
          envName: 'APP_ENV',
          moduleName: '@env',
          path: '.env',
          safe: true
        }
      ]
    ],
    presets: ['babel-preset-expo'],
  };
};
