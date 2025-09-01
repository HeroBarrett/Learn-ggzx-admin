// CommitLint 配置文件，用于规范 Git 提交信息的格式
module.exports = {
  // 继承基础的提交信息规范配置
  extends: ['@commitlint/config-conventional'],

  // 自定义校验规则
  rules: {
    // 定义允许的提交类型（type）
    'type-enum': [
      2, // 2 表示错误级别，不符合规则将阻止提交
      'always', // 必须始终符合规则
      [
        'feat', //新特性、新功能
        'fix', //修改bug
        'docs', //文档修改
        'style', //代码格式修改, 注意不是 css 修改
        'refactor', //代码重构
        'perf', //优化相关，比如提升性能、体验
        'test', //测试用例修改
        'chore', //其他修改, 比如改变构建流程、或者增加依赖库、工具等
        'revert', //回滚到上一个版本
        'build', //编译相关的修改，例如发布版本、对项目构建或者依赖的改动
      ],
    ],

    // 关闭提交类型的大小写检查
    'type-case': [0],

    // 允许提交类型为空
    'type-empty': [0],

    // 允许作用域（scope）为空
    'scope-empty': [0],

    // 关闭作用域的大小写检查
    'scope-case': [0],

    // 关闭提交主题（subject）以特定符号结尾的检查
    'subject-full-stop': [0, 'never'],

    // 关闭提交主题的大小写检查
    'subject-case': [0, 'never'],

    // 关闭提交信息标题的最大长度限制（默认是72个字符）
    'header-max-length': [0, 'always', 72],
    // 明确允许主题为空（越过主题为英文）
    'subject-empty': [0],
  },
}
