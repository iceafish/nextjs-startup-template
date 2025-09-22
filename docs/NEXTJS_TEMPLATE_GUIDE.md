# Next.js 前端工程模板使用指南

本指南将帮助您基于当前仓库的 Next.js 模板创建新的前端工程项目。

## 📋 前置要求

- Node.js >= 18.0.0
- Yarn >= 4.0.0
- Git

## 🚀 创建新的 Next.js 项目

### 方法一：基于完整模板创建（推荐）

如果您需要包含 core 层和完整工程化配置的项目：

```bash
# 1. 克隆模板仓库
git clone <your-template-repo-url> my-new-project
cd my-new-project

# 2. 重新初始化 Git 仓库
rm -rf .git
git init
git add .
git commit -m "Initial commit from template"

# 3. 安装依赖
yarn install

# 4. 启动开发服务器
yarn dev
```

### 方法二：仅提取 Next.js 模板

如果您只需要 Next.js 部分，不需要 monorepo 结构：

```bash
# 1. 创建新项目目录
mkdir my-nextjs-project
cd my-nextjs-project

# 2. 初始化项目
git init
yarn init -y

# 3. 从模板复制 Next.js 相关文件
# 复制以下文件和目录到新项目：
# - packages/nextjs-template/src/
# - packages/nextjs-template/public/
# - packages/nextjs-template/package.json
# - packages/nextjs-template/next.config.ts
# - packages/nextjs-template/tsconfig.json
# - packages/nextjs-template/eslint.config.mjs

# 4. 调整 package.json
# 移除 workspace 相关配置
# 更新项目名称和版本

# 5. 安装依赖
yarn install

# 6. 启动开发服务器
yarn dev
```

## 📁 项目结构说明

### 完整模板结构

```
my-new-project/
├── packages/
│   ├── core/                    # 核心组件库
│   ├── nextjs-template/         # Next.js 应用模板
│   └── vite-template/           # Vite.js 模板目录
├── docs/                       # 项目文档
├── .husky/                     # Git hooks
├── eslint.config.mjs           # ESLint 配置
├── .prettierrc                 # Prettier 配置
└── package.json                # 根 package.json
```

### 独立 Next.js 项目结构

```
my-nextjs-project/
├── src/
│   ├── app/                    # Next.js App Router
│   ├── components/             # React 组件
│   ├── common/                 # 通用工具和配置
│   └── ...
├── public/                     # 静态资源
├── next.config.ts              # Next.js 配置
├── tsconfig.json               # TypeScript 配置
└── package.json                # 项目配置
```

## 🔧 配置调整

### 1. 更新项目信息

编辑 `package.json`：

```json
{
  "name": "your-project-name",
  "version": "1.0.0",
  "description": "Your project description",
  "author": "Your Name",
  "license": "MIT"
}
```

### 2. 配置环境变量

创建 `.env.local` 文件：

```env
# 应用配置
NEXT_PUBLIC_APP_NAME=Your App Name
NEXT_PUBLIC_APP_VERSION=1.0.0

# API 配置
NEXT_PUBLIC_API_BASE_URL=https://api.yourapp.com

# 其他配置
NEXT_PUBLIC_ENVIRONMENT=development
```

### 3. 自定义主题

编辑 `src/common/theme.ts`：

```typescript
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#your-primary-color",
    },
    secondary: {
      main: "#your-secondary-color",
    },
  },
  // 其他主题配置
});
```

## 📦 依赖管理

### 核心依赖

模板包含以下核心依赖：

- **Next.js 15.4.6**: React 框架
- **React 19.1.0**: UI 库
- **MUI 7.3.1**: Material-UI 组件库
- **TypeScript 5.x**: 类型安全
- **Emotion**: CSS-in-JS 解决方案

### 添加新依赖

```bash
# 添加生产依赖
yarn add package-name

# 添加开发依赖
yarn add -D package-name

# 添加 peer 依赖
yarn add --peer package-name
```

## 🛠️ 开发工作流

### 常用命令

```bash
# 开发服务器
yarn dev                    # 启动开发服务器
yarn dev:turbo             # 使用 Turbopack 启动（更快）

# 构建和部署
yarn build                 # 构建生产版本
yarn start                 # 启动生产服务器

# 代码质量
yarn lint                  # 代码检查
yarn lint:fix              # 自动修复代码问题
yarn type-check            # 类型检查
yarn format                # 代码格式化

# 清理
yarn clean                 # 清理构建文件
```

### Git 工作流

项目配置了 Git hooks，会在提交时自动：

1. 运行代码检查（ESLint）
2. 执行代码格式化（Prettier）
3. 进行类型检查（TypeScript）
4. 验证提交信息格式

## 🎨 自定义组件

### 创建新组件

```typescript
// src/components/MyComponent/index.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

interface MyComponentProps {
  title: string;
  children?: React.ReactNode;
}

export const MyComponent: React.FC<MyComponentProps> = ({
  title,
  children
}) => {
  return (
    <Box>
      <Typography variant="h4">{title}</Typography>
      {children}
    </Box>
  );
};

export default MyComponent;
```

### 使用模板组件

```typescript
// 使用模板提供的组件
import { Startup } from '@/components/Startup';
import { PrimaryButton } from '@/components/PrimaryButton';

export default function HomePage() {
  return (
    <div>
      <Startup />
      <PrimaryButton onClick={() => console.log('Clicked!')}>
        Click Me
      </PrimaryButton>
    </div>
  );
}
```

## 🔗 集成 Core 组件

如果您的项目需要使用 `@relia-fe/core` 组件：

### 1. 本地开发模式

在 monorepo 中，core 组件通过 workspace 自动链接：

```typescript
// 直接导入使用
import { useNotification, ThemeProvider } from "@relia-fe/core";
```

### 2. 独立项目模式

如果是独立项目，需要：

```bash
# 安装 core 包（如果已发布到 npm）
yarn add @relia-fe/core

# 或者使用本地链接
yarn link /path/to/core/package
```

## 📱 响应式设计

模板支持响应式设计，使用 MUI 的断点系统：

```typescript
import { useTheme, useMediaQuery } from '@mui/material';

export const ResponsiveComponent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{
      padding: isMobile ? 2 : 4,
      fontSize: isMobile ? '14px' : '16px'
    }}>
      {/* 响应式内容 */}
    </Box>
  );
};
```

## 🚀 部署指南

### Vercel 部署（推荐）

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel

# 生产部署
vercel --prod
```

### 其他平台

参考 `docs/DEPLOYMENT.md` 获取详细的部署指南。

## 🔍 故障排除

### 常见问题

1. **依赖安装失败**

   ```bash
   # 清理缓存重新安装
   yarn cache clean
   rm -rf node_modules yarn.lock
   yarn install
   ```

2. **类型错误**

   ```bash
   # 重新生成类型定义
   yarn type-check
   ```

3. **构建失败**
   ```bash
   # 清理构建缓存
   yarn clean
   yarn build
   ```

## 📚 相关文档

- [Next.js 官方文档](https://nextjs.org/docs)
- [MUI 组件库文档](https://mui.com/)
- [项目架构文档](./ARCHITECTURE.md)
- [API 参考文档](./API.md)
- [部署指南](./DEPLOYMENT.md)

## 🤝 贡献指南

参考 [CONTRIBUTING.md](../CONTRIBUTING.md) 了解如何为项目贡献代码。

---

如有问题，请查看项目文档或提交 Issue。