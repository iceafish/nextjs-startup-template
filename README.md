# Startup Template

一个现代化的全栈开发模板，基于 Next.js 和 Vite.js，提供统一的组件库和开发体验。

## 🚀 特性

- **现代化技术栈**: 基于 Next.js 和 Vite.js 构建
- **Monorepo 架构**: 使用 Yarn Workspaces 管理多包项目
- **统一组件库**: 基于 Material-UI 的跨框架组件系统
- **TypeScript**: 全面的类型安全支持
- **工程化工具链**: ESLint、Prettier、Husky 预配置
- **现代化构建**: 使用 tsup 进行快速构建

## 📦 项目结构

```
├── packages/
│   ├── core/                 # 核心组件库和工具
│   ├── nextjs-template/      # Next.js 应用模板
│   └── vite-template/        # Vite.js 模板
├── src/                      # 主应用源码
├── .husky/                   # Git hooks
├── .prettierrc               # Prettier 配置
└── eslint.config.mjs         # ESLint 配置
```

## 🛠️ 快速开始

### 安装依赖

```bash
yarn install
```

### 开发模式

```bash
# 启动 Next.js 开发服务器
yarn dev

# 启动 Turbo 模式（更快的开发体验）
yarn dev:turbo
```

### 构建项目

```bash
# 构建所有包
yarn build

# 构建特定包
yarn build:core
yarn build:nextjs
```

## 📚 包说明

### @relia-fe/core

核心组件库，包含：
- 通用 React 组件
- 主题系统
- 工具函数
- Provider 组件

### @relia-fe/nextjs-template

Next.js 应用模板，包含：
- App Router 配置
- 页面组件
- 布局组件
- 样式配置

### @startup/vite-template

Vite.js 应用模板，包含：
- React + Vite.js 应用
- Composables
- 类型定义

## 🔧 开发工具

### 代码质量

```bash
# 运行 ESLint 检查
yarn lint

# 自动修复 ESLint 问题
yarn lint:fix

# 格式化代码
yarn format

# 检查代码格式
yarn format:check

# 类型检查
yarn type-check
```

### Git Hooks

项目配置了以下 Git hooks：

- **pre-commit**: 运行 lint、格式化检查和类型检查
- **commit-msg**: 验证提交信息格式

## 🎨 使用示例

### 在 Next.js 中使用

```tsx
import { Button, ThemeProvider } from '@relia-fe/core';

export default function App() {
  return (
    <ThemeProvider>
      <Button variant="contained">Hello World</Button>
    </ThemeProvider>
  );
}
```

### 在 Vite.js 中使用

```tsx
import { Button, ThemeProvider } from '@relia-fe/core';

function App() {
  return (
    <ThemeProvider>
      <Button variant="contained">Hello World</Button>
    </ThemeProvider>
  );
}
```

## 📋 可用脚本

| 命令 | 描述 |
|------|------|
| `yarn dev` | 启动开发服务器 |
| `yarn build` | 构建所有包 |
| `yarn lint` | 运行 ESLint |
| `yarn format` | 格式化代码 |
| `yarn type-check` | 类型检查 |
| `yarn clean` | 清理构建文件 |

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开 Pull Request

## 📄 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🔗 相关链接

- [Next.js 文档](https://nextjs.org/docs)
- [Vite.js 文档](https://vitejs.dev/)
- [Material-UI 文档](https://mui.com/)
- [TypeScript 文档](https://www.typescriptlang.org/)
