module.exports = function (api) {
  api.cache(false);

  return {
    presets: [
        ["@babel/preset-env"]
    ],
    plugins: [
        ["@babel/plugin-proposal-class-properties", { loose: false }],
        ["@babel/plugin-proposal-optional-chaining", { loose: false }],
    ]
  }
};