module.exports = {
  parser: 'babel-eslint',
  plugins: ['react', 'babel'],
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
  },
  globals: {
    __DEV__: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
  rules: {
    'prefer-const': 2, // 2.1（对应JavaScript语言规范2.1，以下简写）
    'no-const-assign': 2, // 2.1
    'no-var': 2, // 2.2
    'object-shorthand': 1, // 3.2
    'quote-props': [2, 'as-needed'], // 3.5
    'no-prototype-builtins': 1, // 3.6
    'array-callback-return': 2, // 4.4
    'prefer-destructuring': 1, // 5.1
    quotes: [
      2,
      'single', // 6.1
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    'prefer-template': 1, // 6.3
    'wrap-iife': [1, 'any'], // 7.2
    'prefer-rest-params': 1, // 7.5
    'no-param-reassign': [2, { props: false }], // 7.10
    'prefer-spread': 1, // 7.12
    'prefer-arrow-callback': 2, // 8.1
    'arrow-spacing': 2, // 8.1
    'arrow-parens': [2, 'as-needed'], // 8.2
    'arrow-body-style': [2, 'as-needed'], // 8.2
    'no-useless-constructor': 1, // 9.3
    'no-multi-assign': 2, // 13.5
    'no-unused-vars': 1, // 13.8
    eqeqeq: [2, 'always', { null: 'ignore' }], // 15.1
    'no-case-declarations': 1, // 15.3
    'no-unneeded-ternary': 1, // 15.4
    'nonblock-statement-body-position': 1, // 16.1
    'brace-style': 1, // 16.2
    'no-else-return': 1, // 16.3
    indent: [1, 2, { SwitchCase: 1 }], // 17.1
    'space-before-blocks': [1], // 17.2
    'keyword-spacing': 1, // 17.3
    'space-infix-ops': 2, // 17.4
    'padded-blocks': [2, 'never'], // 17.5
    'space-in-parens': 1, // 17.6
    'array-bracket-spacing': 1, // 17.7
    'object-curly-spacing': [1, 'always'], // 17.8
    'block-spacing': [1, 'always'], // 17.9
    'func-call-spacing': 1, // 17.12
    'key-spacing': 1, // 17.13
    'no-trailing-spaces': 1, // 17.14
    'comma-dangle': [1, 'only-multiline'], // 18.2
    semi: [2, 'always'], // 19.1
    camelcase: 1, // 驼峰式命名
    curly: [2, 'all'], // 必须使用 if(){} 中的{}
    'no-multi-spaces': 1, // 禁止多余空格
    'no-console': 1, // 禁止console
    'no-debugger': 2, // 禁止使用debugger
    'react/prefer-es6-class': [1, 'always'], // 使用 class extends React.Component
    'react/jsx-pascal-case': 2, // 驼峰式命名
    'react/jsx-closing-bracket-location': 2, // JSX语法缩进/格式
    'react/jsx-curly-spacing': 2, // JSX {} 引用括号里两边加空格
    'jsx-quotes': [2, 'prefer-double'], // JSX属性值总是使用双引号(")
    'react/jsx-wrap-multilines': 2, // 多行的JSX标签使用()包裹
    'react/self-closing-comp': 2, // 没有子元素的标签使用自闭和标签
    'react/jsx-no-bind': [
      1,
      {
        ignoreRefs: true,
        allowArrowFunctions: true,
      },
    ],
    'react/prop-types': [1, { ignore: ['children', 'className', 'style'] }],
    'react/jsx-no-duplicate-props': 2,
    'react/no-did-mount-set-state': 2,
    'react/no-did-update-set-state': 2,
    'react/no-direct-mutation-state': 2,
    'react/no-unknown-property': 2,
    'react/display-name': 1,
  },
};
