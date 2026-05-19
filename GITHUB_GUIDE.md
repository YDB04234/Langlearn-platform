# GitHub 推送指南

## 方法一：手动创建仓库并推送（推荐）

### 步骤 1: 在 GitHub 上创建仓库
1. 访问 https://github.com/new
2. Repository name 输入: `langlearn-platform`
3. 选择 Public（公开仓库）
4. 不要勾选 "Initialize this repository with a README"
5. 点击 "Create repository"

### 步骤 2: 添加远程仓库并推送
在终端执行以下命令（请使用你自己的GitHub用户名）:

```bash
git remote add origin https://github.com/YDB04234/langlearn-platform.git
git branch -M main
git push -u origin main
```

### 步骤 3: 刷新 GitHub 页面
刷新你的 GitHub 仓库页面，就能看到代码了！

---

## 方法二：使用 GitHub CLI（如果有安装）

如果你已经安装了 GitHub CLI，可以执行：

```bash
gh repo create langlearn-platform --public --push
```

---

## 验证推送成功

推送成功后，你可以在浏览器中访问:
https://github.com/YDB04234/langlearn-platform

应该能看到所有的源代码文件。
