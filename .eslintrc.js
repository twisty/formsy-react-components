module.exports = {
  parser: "babel-eslint",
  extends: ["airbnb", "prettier", "prettier/react"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error", "fb"],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "jsx-a11y/label-has-for": [
      2,
      {
        required: {
          some: ["nesting", "id"]
        },
        allowChildren: false
      }
    ]
  }
};
