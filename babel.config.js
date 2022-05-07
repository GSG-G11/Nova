// Jest supports TypeScript, via Babel so we need to configure it.
module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
};
