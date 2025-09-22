# Core 组件集成指南

本指南详细说明如何在 Next.js 项目中正确引用和使用 `@relia-fe/core` 层组件。

## 📋 概述

`@relia-fe/core` 是一个共享的核心组件库，提供了以下功能：

- **Providers**: 应用级别的上下文提供者
- **Hooks**: 可复用的 React Hooks
- **Components**: 基础 UI 组件
- **Utils**: 工具函数
- **Theme**: 主题系统

## 🚀 集成方式

### 方式一：Monorepo 内部引用（推荐）

在当前 monorepo 结构中，core 组件通过 workspace 自动链接：

```json
// package.json
{
  "dependencies": {
    "@relia-fe/core": "workspace:*"
  }
}
```

### 方式二：发布到私有 npm 仓库

```bash
# 1. 构建 core 包
yarn workspace @relia-fe/core build

# 2. 发布到私有 npm 仓库
cd packages/core
npm publish --registry=https://your-private-registry.com

# 3. 在目标项目中安装
yarn add @relia-fe/core --registry=https://your-private-registry.com
```

### 方式三：本地依赖链接

```bash
# 1. 在 core 包目录下创建全局链接
cd packages/core
yarn link

# 2. 在目标项目中链接
cd /path/to/your-project
yarn link @relia-fe/core
```

## 📦 核心组件使用

### 1. Providers 配置

在应用根组件中配置必要的 Providers：

```typescript
// src/app/layout.tsx 或 src/pages/_app.tsx
import { QueryProvider, NotificationProvider, ThemeProvider } from '@relia-fe/core';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <QueryProvider>
            <NotificationProvider>
              {children}
            </NotificationProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 2. Hooks 使用

```typescript
// src/components/ExampleComponent.tsx
import { useDialog } from '@relia-fe/core';
import { Button } from '@mui/material';

export const ExampleComponent = () => {
  const { openDialog, closeDialog } = useDialog();

  const handleOpenDialog = () => {
    openDialog({
      title: '确认操作',
      content: '您确定要执行此操作吗？',
      onConfirm: () => {
        console.log('用户确认');
        closeDialog();
      },
      onCancel: () => {
        console.log('用户取消');
        closeDialog();
      }
    });
  };

  return (
    <Button onClick={handleOpenDialog}>
      打开对话框
    </Button>
  );
};
```

### 3. 分模块导入

利用 core 包的导出结构，可以按需导入：

```typescript
// 导入所有 providers
import {
  QueryProvider,
  NotificationProvider,
  ThemeProvider,
} from "@relia-fe/core/providers";

// 导入所有 hooks
import { useDialog } from "@relia-fe/core/hooks";

// 导入工具函数
import { formatDate, debounce } from "@relia-fe/core/utils";

// 导入主题相关
import { createCustomTheme, ThemeTokens } from "@relia-fe/core/theme";
```

## 🔧 TypeScript 配置

### 1. 路径映射配置

在 `tsconfig.json` 中添加路径映射：

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@relia-fe/core": ["./packages/core/src"],
      "@relia-fe/core/*": ["./packages/core/src/*"]
    }
  }
}
```

### 2. 类型声明

如果使用外部安装的 core 包，确保类型定义正确：

```typescript
// src/types/core.d.ts
declare module "@relia-fe/core" {
  export * from "@relia-fe/core/dist/index";
}

// 或者更具体的类型声明
declare module "@relia-fe/core/providers" {
  export interface QueryProviderProps {
    children: React.ReactNode;
  }

  export const QueryProvider: React.FC<QueryProviderProps>;
  export const NotificationProvider: React.FC<{ children: React.ReactNode }>;
  export const ThemeProvider: React.FC<{ children: React.ReactNode }>;
}
```

## 🎯 实际使用示例

### 完整的应用配置示例

```typescript
// src/app/layout.tsx
import { Inter } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  QueryProvider,
  NotificationProvider,
  ThemeProvider as CoreThemeProvider
} from '@relia-fe/core';
import { theme } from '@/common/theme';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <CoreThemeProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <QueryProvider>
                <NotificationProvider>
                  {children}
                </NotificationProvider>
              </QueryProvider>
            </ThemeProvider>
          </CoreThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
```

### 业务组件使用示例

```typescript
// src/components/UserManagement.tsx
import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography
} from '@mui/material';
import { useDialog } from '@relia-fe/core/hooks';
import { formatDate } from '@relia-fe/core/utils';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface UserManagementProps {
  users: User[];
  onDeleteUser: (userId: string) => void;
}

export const UserManagement: React.FC<UserManagementProps> = ({
  users,
  onDeleteUser
}) => {
  const { openDialog } = useDialog();

  const handleDeleteUser = (user: User) => {
    openDialog({
      title: '删除用户',
      content: `确定要删除用户 "${user.name}" 吗？此操作不可撤销。`,
      confirmText: '删除',
      cancelText: '取消',
      onConfirm: () => {
        onDeleteUser(user.id);
      }
    });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        用户管理
      </Typography>

      {users.map((user) => (
        <Card key={user.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{user.name}</Typography>
            <Typography color="text.secondary">{user.email}</Typography>
            <Typography variant="body2">
              创建时间: {formatDate(user.createdAt)}
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDeleteUser(user)}
              >
                删除用户
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};
```

### 自定义 Hook 示例

```typescript
// src/hooks/useUserApi.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@relia-fe/core/hooks";

interface User {
  id: string;
  name: string;
  email: string;
}

export const useUserApi = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  // 获取用户列表
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async (): Promise<User[]> => {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      return response.json();
    },
  });

  // 删除用户
  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      showNotification("用户删除成功", "success");
    },
    onError: (error) => {
      showNotification(`删除失败: ${error.message}`, "error");
    },
  });

  return {
    users: users || [],
    isLoading,
    error,
    deleteUser: deleteUserMutation.mutate,
    isDeleting: deleteUserMutation.isPending,
  };
};
```

## 🔄 版本兼容性

### 确保版本兼容

```json
// package.json
{
  "dependencies": {
    "@relia-fe/core": "^0.1.0",
    "@mui/material": "^7.3.1",
    "@tanstack/react-query": "^5.85.6",
    "react": "19.1.0"
  },
  "peerDependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1"
  }
}
```

### 版本检查脚本

```typescript
// scripts/check-versions.ts
import { readFileSync } from "fs";
import { join } from "path";

const checkVersionCompatibility = () => {
  const rootPackage = JSON.parse(
    readFileSync(join(process.cwd(), "package.json"), "utf-8")
  );

  const corePackage = JSON.parse(
    readFileSync(join(process.cwd(), "packages/core/package.json"), "utf-8")
  );

  const requiredDeps = ["@mui/material", "@tanstack/react-query", "react"];

  requiredDeps.forEach((dep) => {
    const rootVersion = rootPackage.dependencies[dep];
    const coreVersion = corePackage.peerDependencies[dep];

    if (rootVersion && coreVersion && rootVersion !== coreVersion) {
      console.warn(
        `Version mismatch for ${dep}: root(${rootVersion}) vs core(${coreVersion})`
      );
    }
  });
};

checkVersionCompatibility();
```

## 🛠️ 开发工具配置

### ESLint 规则

```javascript
// eslint.config.mjs
export default [
  {
    rules: {
      // 确保正确导入 core 组件
      "import/no-unresolved": [
        "error",
        {
          ignore: ["^@relia-fe/core"],
        },
      ],

      // 禁止直接导入内部模块
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@relia-fe/core/src/*"],
              message: "Please import from @relia-fe/core or its submodules",
            },
          ],
        },
      ],
    },
  },
];
```

### VS Code 配置

```json
// .vscode/settings.json
{
  "typescript.preferences.includePackageJsonAutoImports": "on",
  "typescript.suggest.autoImports": true,
  "typescript.suggest.paths": true,
  "typescript.workspaceSymbols.scope": "allOpenProjects"
}
```

## 🔍 故障排除

### 常见问题及解决方案

1. **模块解析错误**

   ```bash
   # 清理并重新安装依赖
   yarn clean
   rm -rf node_modules yarn.lock
   yarn install
   ```

2. **类型定义找不到**

   ```bash
   # 重新构建 core 包
   yarn workspace @relia-fe/core build

   # 检查类型导出
   yarn workspace @relia-fe/core type-check
   ```

3. **版本冲突**

   ```bash
   # 检查依赖树
   yarn why @mui/material

   # 解决版本冲突
   yarn dedupe
   ```

4. **热重载问题**
   ```typescript
   // next.config.ts
   const nextConfig = {
     transpilePackages: ["@relia-fe/core"],
     experimental: {
       optimizePackageImports: ["@relia-fe/core"],
     },
   };
   ```

### 调试导入
console.log("Core exports:", Object.keys(require("@relia-fe/core")));

# 检查 Provider 状态
import { useContext } from "react";
import { DialogContext } from "@relia-fe/core";

const DebugComponent = () => {
  const dialogContext = useContext(DialogContext);
  console.log("Dialog context:", dialogContext);
  return null;
};
```

## 📚 最佳实践

### 1. 导入规范

```typescript
// ✅ 推荐：使用具体的子模块导入
import { useDialog } from "@relia-fe/core/hooks";
import { QueryProvider } from "@relia-fe/core/providers";

// ❌ 避免：导入整个包
import * as Core from "@relia-fe/core";

// ❌ 避免：导入内部路径
import { useDialog } from "@relia-fe/core/src/hooks/useDialog";
```

### 2. 类型安全

```typescript
// ✅ 使用 core 提供的类型
import type { DialogContextProps } from "@relia-fe/core/hooks";

// ✅ 扩展 core 类型
interface CustomDialogProps extends DialogContextProps {
  customField: string;
}
```

### 3. 性能优化

```typescript
// ✅ 使用 React.lazy 延迟加载
const HeavyComponent = React.lazy(() =>
  import("@relia-fe/core/components").then((module) => ({
    default: module.HeavyComponent,
  }))
);

// ✅ 使用 useMemo 缓存复杂计算
const memoizedValue = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);
```

## 🚀 升级指南

当 core 包版本更新时：

```bash
# 1. 更新 core 包
yarn workspace @relia-fe/core build

# 2. 检查破坏性变更
git diff packages/core/CHANGELOG.md

# 3. 更新项目代码
# 根据 CHANGELOG 调整代码

# 4. 运行测试
yarn test

# 5. 更新文档
# 更新相关文档和示例
```

---

通过遵循本指南，您可以在 Next.js 项目中高效、安全地使用 `@relia-fe/core` 组件库。如有问题，请参考项目文档或提交 Issue。