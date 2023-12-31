module.exports = {
  extends: ["next/core-web-vitals", "prettier", "plugin:jsx-a11y/recommended"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
  },
  plugins: ["jsx-a11y"],
};
