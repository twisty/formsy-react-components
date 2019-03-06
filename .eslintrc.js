module.exports = {
  parser: "babel-eslint",
  extends: ["airbnb", "prettier", "prettier/react"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error", {
      singleQuote: true,
      trailingComma: 'all',
      bracketSpacing: false,
      jsxBracketSameLine: true,
      parser: 'flow'
    }],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "jsx-a11y/label-has-for": "off",
    'jsx-a11y/label-has-associated-control': ['error', {
      labelComponents: [],
      labelAttributes: [],
      controlComponents: [],
      assert: 'either',
      depth: 25
    }]
  }
};
