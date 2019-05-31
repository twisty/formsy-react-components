module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "prettier/react",
    "prettier/@typescript-eslint"
  ],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error", {
      singleQuote: true,
      trailingComma: 'all',
      bracketSpacing: false,
      jsxBracketSameLine: true
    }],
    "react/jsx-filename-extension": [1, { extensions: [".jsx", ".tsx"] }],
    "jsx-a11y/label-has-for": "off",
    'jsx-a11y/label-has-associated-control': ['error', {
      labelComponents: [],
      labelAttributes: [],
      controlComponents: [],
      assert: 'either',
      depth: 25
    }]
  },
  parserOptions: {
    ecmaVersion:  2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version:  'detect'
    }
  }
};
