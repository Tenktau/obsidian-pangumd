# obsidian-pangu4md

一款用于 Markdown 文档，在中英文之间自动添加空格的轻量化 Obsidian 插件。

## 特性

- [x] 通过自定快捷键，快速批量地在中文与英文、中文与数字之间添加空格
- [x] 不破坏 Markdown 本身的列表语法
- [x] 不对代码块中的文本进行操作

## TODO

- [ ] 用户可自由在 `全自动触发` 或 `手动触发` 两种模式之间切换
- [ ] …

## 示例

😣操作前

```md
中文English
Hello世界
- [ ]测试Todo
`中文code`
```

😊操作后

```md
中文 English
Hello 世界
- [ ] 测试 Todo
`中文code`
```

## 使用方法

- 默认快捷键： `Ctrl/Cmd + Shift + S`
- 或使用命令面板搜索 `Pangu4MD`

## 安装

### 手动安装

1. 前往 Release 页面下载最新版本；
2. 解压到：`/.obsidian/plugins/obsidian-pangu4md`；
3. 在 Obsidian 第三方插件页面中启用插件。

## 技术栈

* TypeScript
* Obsidian Plugin API
* esbuild
* Regex-based Markdown-aware formatter

## 开发

1. ⭐️本仓库（提升项目热度，这很重要~）；
2. 克隆仓库；
3. `npm install` & `npm run dev`；
4. 其他不懂的就问 AI 吧，利用好生产力工具！

## 致敬

先前用的是 [Natumsol/obsidian-pangu](https://github.com/Natumsol/obsidian-pangu)、向前辈致敬，但该仓库已数年未更新，架构兼容性存在短板、且有一些格式问题，便自作主张借助 AI 工具进行了重写，希望能够帮到有需要的朋友！

**若有建议或想法欢迎提交 issue 或 PR！**