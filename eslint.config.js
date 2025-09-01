// 导入ESLint配置所需的依赖项
// ESLint官方JavaScript规则
import js from '@eslint/js'
// 各种环境的全局变量定义
import globals from 'globals'
// TypeScript ESLint配置
import tseslint from 'typescript-eslint'
// Vue.js语法检查和规则
import pluginVue from 'eslint-plugin-vue'
// ESLint配置定义函数
import { defineConfig } from 'eslint/config'
// 禁用与Prettier冲突的规则
import prettier from 'eslint-config-prettier'

// 使用defineConfig函数定义ESLint配置
export default defineConfig([
  // 添加忽略模式配置
  {
    ignores: [
      'node_modules/', // 忽略 node_modules 目录
      'dist/', // 忽略构建输出目录
      'coverage/', // 忽略测试覆盖率报告目录
      '*.min.js', // 忽略所有压缩后的 JS 文件
      '**/.*', // 忽略所有以点开头的文件/目录（如 .git）
      '**/*.d.ts', // 忽略 TypeScript 声明文件
      // 添加其他需要忽略的文件模式...
    ],
  },
  // 基础JavaScript配置
  {
    // 配置应用的文件类型
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    // 注册使用的插件
    plugins: { js },
    // 继承ESLint推荐的JavaScript规则
    extends: [js.configs.recommended],
    // 语言环境配置
    languageOptions: {
      // 定义全局变量（浏览器环境、ES2021特性、Node.js环境和process对象）
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        process: 'readonly',
      },
      // 解析器选项配置
      parserOptions: {
        ecmaVersion: 'latest', // 使用最新的ECMAScript标准
        sourceType: 'module', // 代码使用ES模块格式
        ecmaFeatures: {
          jsx: true, // 启用JSX语法支持
        },
      },
    },
    // 自定义规则配置
    rules: {
      'no-var': 'error', // 禁止使用var，强制使用let/const
      'no-multiple-empty-lines': ['warn', { max: 1 }], // 限制连续空行数量
      'no-unexpected-multiline': 'error', // 避免意外的多行表达式
      'no-useless-escape': 'off', // 关闭不必要的转义字符检查
      // 生产环境禁止console，开发环境允许
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      // 生产环境禁止debugger，开发环境允许
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    },
  },

  // 应用TypeScript推荐配置
  ...tseslint.configs.recommended,

  // 应用Vue.js基础规则配置
  ...pluginVue.configs['flat/essential'],

  // Vue文件特定配置
  {
    files: ['**/*.vue'], // 仅针对.vue文件
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser, // 使用TypeScript解析器处理Vue文件中的<script>部分
        extraFileExtensions: ['.vue'], // 添加.vue为额外文件扩展名
        ecmaFeatures: {
          jsx: true, // 启用JSX支持
        },
      },
    },
    // Vue特定规则配置
    rules: {
      'vue/multi-word-component-names': 'off', // 关闭组件名必须多字的限制
      'vue/no-mutating-props': 'off', // 关闭禁止修改props的限制
      'vue/attribute-hyphenation': 'off', // 关闭属性名必须短横线命名的限制
    },
  },

  // TypeScript文件特定规则配置
  {
    files: ['**/*.{ts,mts,cts}'], // 针对所有TypeScript文件
    rules: {
      '@typescript-eslint/no-unused-vars': 'error', // 检查未使用的变量
      '@typescript-eslint/prefer-ts-expect-error': 'error', // 推荐使用@ts-expect-error而非@ts-ignore
      '@typescript-eslint/no-explicit-any': 'off', // 允许使用any类型
      '@typescript-eslint/no-non-null-assertion': 'off', // 允许使用非空断言运算符(!)
      '@typescript-eslint/no-namespace': 'off', // 允许使用命名空间
      '@typescript-eslint/semi': 'off', // 关闭分号检查
    },
  },

  // Prettier配置（必须放在最后以覆盖其他格式规则）
  prettier,
])
