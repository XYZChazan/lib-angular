import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-docs",
  ],
  framework: {
    name: "@storybook/angular",
    options: {}
  },
  staticDirs: [
    {
      from: '../src/lib/assets',
      to: '/assets',
    },
  ],

  webpackFinal: async (config) => {
    // regra para scss globais (ex.: src/styles.scss)
    config.module?.rules?.unshift({
      test: /(?<!\.component)\.scss$/,
      sideEffects: true,
      use: [
        require.resolve('style-loader'),
        {
          loader: require.resolve('css-loader'),
          options: { importLoaders: 2, sourceMap: true },
        },
        {
          loader: require.resolve('resolve-url-loader'),
          options: { sourceMap: true },
        },
        {
          loader: require.resolve('sass-loader'),
          options: { sourceMap: true }, // resolve-url-loader precisa de sourceMap true
        },
      ],
    });

    return config;
  },
};

export default config;
