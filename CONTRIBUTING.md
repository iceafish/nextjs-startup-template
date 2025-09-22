# 贡献指南

感谢您对 Startup Template 项目的关注！我们欢迎任何形式的贡献。

## 🚀 开始贡献

### 环境要求

- Node.js >= 18
- Yarn >= 1.22
- Git

### 设置开发环境

1. Fork 项目到您的 GitHub 账户
2. 克隆您的 fork 到本地：
   ```bash
   git clone https://github.com/YOUR_USERNAME/nextjs-startup-template.git
   cd nextjs-startup-template
   ```

3. 安装依赖：
   ```bash
   yarn install
   ```

4. 启动开发服务器：
   ```bash
   yarn dev
   ```

## 📝 开发流程

### 1. 创建分支

为您的功能或修复创建一个新分支：

```bash
git checkout -b feature/your-feature-name
# 或
git checkout -b fix/your-bug-fix
```

### 2. 开发规范

#### 代码风格

- 使用 TypeScript 编写代码
- 遵循项目的 ESLint 和 Prettier 配置
- 确保代码通过所有检查：
  ```bash
  yarn lint
  yarn type-check
  yarn format:check
  ```

#### 提交规范

使用语义化的提交信息：

```
type(scope): description

[optional body]

[optional footer]
```

类型包括：
- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

示例：
```
feat(core): add new Button component
fix(vite-template): resolve theme provider issue
docs: update installation guide
```

### 3. 测试

确保您的更改不会破坏现有功能：

```bash
# 运行所有检查
yarn lint
yarn type-check
yarn build

# 测试开发服务器
yarn dev
```

### 4. 提交和推送

```bash
git add .
git commit -m "feat(core): add new feature"
git push origin feature/your-feature-name
```

### 5. 创建 Pull Request

1. 在 GitHub 上创建 Pull Request
2. 填写 PR 模板中的信息
3. 等待代码审查

## 🏗️ 项目架构

### Monorepo 结构

```
packages/
├── core/                 # 核心组件库
│   ├── src/
│   │   ├── components/   # React 组件
│   │   ├── theme/        # 主题系统
│   │   └── utils/        # 工具函数
│   └── package.json
├── nextjs-template/      # Next.js 模板
│   ├── src/
│   │   ├── app/          # App Router
│   │   └── components/   # 页面组件
│   └── package.json
└── vite-template/        # Vite.js 模板
    ├── src/
    │   ├── components/   # React 组件
    │   └── hooks/        # React Hooks
    └── package.json
```

### 添加新组件

#### 在 core 包中添加 React 组件

1. 在 `packages/core/src/components/` 创建组件文件
2. 导出组件到 `packages/core/src/index.ts`
3. 添加类型定义

#### 在 vite-template 中添加组件

1. 在 `packages/vite-template/src/components/` 创建组件
2. 实现 React 组件
3. 添加类型定义
4. 编写测试用例
5. 更新文档

## 🐛 报告问题

### Bug 报告

使用 GitHub Issues 报告 bug，请包含：

- 问题描述
- 重现步骤
- 期望行为
- 实际行为
- 环境信息（Node.js 版本、操作系统等）
- 相关代码片段或截图

### 功能请求

提交功能请求时，请说明：

- 功能描述
- 使用场景
- 预期的 API 设计
- 是否愿意实现该功能

## 📋 代码审查

### 审查标准

- 代码质量和可读性
- 是否遵循项目规范
- 测试覆盖率
- 文档完整性
- 性能影响

### 审查流程

1. 自动化检查（CI/CD）
2. 代码审查
3. 测试验证
4. 合并到主分支

## 🎯 贡献类型

### 代码贡献

- 新功能开发
- Bug 修复
- 性能优化
- 代码重构

### 文档贡献

- API 文档
- 使用指南
- 示例代码
- 翻译

### 其他贡献

- 问题报告
- 功能建议
- 社区支持

## 📞 联系我们

如果您有任何问题或建议，请通过以下方式联系我们：

- GitHub Issues
- GitHub Discussions
- Email: [your-email@example.com]

感谢您的贡献！🎉