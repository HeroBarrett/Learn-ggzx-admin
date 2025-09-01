// Stylelint 配置文件
// 官方文档参考：https://stylelint.bootcss.com/

module.exports = {
  // 继承的配置集合
  extends: [
    'stylelint-config-standard', // 使用标准的 Stylelint 规则配置
    'stylelint-config-html/vue', // 针对 Vue 文件中 template 样式的格式化配置
    'stylelint-config-standard-scss', // 针对 SCSS 的标准规则配置
    'stylelint-config-recommended-vue/scss', // 针对 Vue 文件中 SCSS 样式的推荐配置
    'stylelint-config-recess-order', // CSS 属性书写顺序规则配置（按特定顺序排列属性）
    'stylelint-config-prettier', // 确保与 Prettier 格式化工具兼容的配置
  ],
  
  // 针对特定文件类型的覆盖配置
  overrides: [
    {
      // 处理 SCSS、CSS、Vue 和 HTML 文件
      files: ['**/*.(scss|css|vue|html)'],
      // 使用 PostCSS SCSS 解析器处理这些文件
      customSyntax: 'postcss-scss',
    },
    {
      // 处理 HTML 和 Vue 文件
      files: ['**/*.(html|vue)'],
      // 使用 PostCSS HTML 解析器处理这些文件中的样式
      customSyntax: 'postcss-html',
    },
  ],
  
  // 需要忽略检查的文件类型
  ignoreFiles: [
    '**/*.js',    // 忽略所有 JavaScript 文件
    '**/*.jsx',   // 忽略所有 JSX 文件
    '**/*.tsx',   // 忽略所有 TypeScript JSX 文件
    '**/*.ts',    // 忽略所有 TypeScript 文件
    '**/*.json',  // 忽略所有 JSON 文件
    '**/*.md',    // 忽略所有 Markdown 文件
    '**/*.yaml',  // 忽略所有 YAML 文件
  ],
  
  /**
   * 自定义规则配置
   * null  => 关闭该规则
   * always => 必须遵守该规则
   */
  rules: {
    'value-keyword-case': null, // 关闭值关键字大小写检查（允许在 CSS 中使用 v-bind）
    'no-descending-specificity': null, // 关闭选择器优先级降序检查
    'function-url-quotes': 'always', // URL 函数必须使用引号包裹
    'no-empty-source': null, // 允许空样式源文件
    'selector-class-pattern': null, // 关闭选择器类名格式强制要求
    'property-no-unknown': null, // 关闭未知属性检查（允许使用未知属性）
    'block-opening-brace-space-before': 'always', // 块开大括号前必须有一个空格
    'value-no-vendor-prefix': null, // 允许使用带浏览器前缀的属性值
    'property-no-vendor-prefix': null, // 允许使用带浏览器前缀的属性
    'selector-pseudo-class-no-unknown': [
      // 禁止未知的伪类选择器
      true,
      {
        // 但忽略以下伪类（常用于 Vue 深度选择器）
        ignorePseudoClasses: ['global', 'v-deep', 'deep'],
      },
    ],
  },
}