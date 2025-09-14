# React 快速开始指南

## 🚀 快速开始

### 1. 安装依赖

```bash
cd src/react
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

### 3. 打开浏览器

访问 `http://localhost:5173` 查看示例

## 📚 学习路径

### 第一阶段：基础概念

1. **JSX 语法** - 在 JavaScript 中编写 HTML
2. **组件** - 函数组件和类组件
3. **Props** - 组件间数据传递
4. **State** - 组件内部状态管理

### 第二阶段：Hooks

1. **useState** - 状态管理
2. **useEffect** - 副作用处理
3. **useContext** - 上下文共享
4. **useCallback/useMemo** - 性能优化

### 第三阶段：高级特性

1. **错误边界** - 错误处理
2. **性能优化** - React.memo, useMemo
3. **自定义 Hooks** - 逻辑复用
4. **Context API** - 全局状态管理

## 🎯 示例说明

### 基础示例

- **问候组件** - 基础函数组件
- **计数器** - useState Hook 使用
- **联系表单** - 表单处理和状态管理
- **待办事项** - 列表渲染和 CRUD 操作
- **用户资料** - 条件渲染
- **数据获取** - useEffect Hook
- **主题切换** - 状态管理和样式切换

### 高级示例

- **性能优化** - React.memo 和 useMemo
- **错误边界** - 错误处理和恢复
- **高级表单** - 表单验证和错误处理
- **虚拟滚动** - 大数据量渲染优化
- **拖拽功能** - HTML5 拖拽 API
- **动画效果** - CSS 动画和过渡

## 💡 最佳实践

### 1. 组件设计

```jsx
// ✅ 好的做法
function UserCard({ user, onEdit }) {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button onClick={() => onEdit(user.id)}>编辑</button>
    </div>
  );
}

// ❌ 避免的做法
function UserCard(props) {
  return (
    <div>
      <h3>{props.user.name}</h3>
      <p>{props.user.email}</p>
      <button onClick={props.onEdit}>编辑</button>
    </div>
  );
}
```

### 2. 状态管理

```jsx
// ✅ 好的做法
const [formData, setFormData] = useState({
  name: "",
  email: "",
  message: "",
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

// ❌ 避免的做法
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [message, setMessage] = useState("");
```

### 3. 性能优化

```jsx
// ✅ 使用useCallback避免不必要的重渲染
const handleClick = useCallback(() => {
  console.log("Button clicked");
}, []);

// ✅ 使用useMemo缓存计算结果
const expensiveValue = useMemo(() => {
  return data.filter((item) => item.active).map((item) => item.value * 2);
}, [data]);
```

### 4. 错误处理

```jsx
// ✅ 使用错误边界
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>出错了！</h1>;
    }
    return this.props.children;
  }
}
```

## 🔧 常用工具

### 开发工具

- **React Developer Tools** - 浏览器扩展
- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化
- **TypeScript** - 类型检查

### 状态管理

- **Redux** - 大型应用状态管理
- **Zustand** - 轻量级状态管理
- **Recoil** - Facebook 官方状态管理

### UI 组件库

- **Ant Design** - 企业级 UI 组件
- **Material-UI** - Google Material Design
- **Chakra UI** - 现代化组件库

### 路由

- **React Router** - 官方推荐路由库

### 数据获取

- **React Query** - 服务端状态管理
- **SWR** - Vercel 数据获取库

## 📖 学习资源

### 官方文档

- [React 官方文档](https://react.dev/)
- [React Hooks 文档](https://react.dev/reference/react)

### 推荐书籍

- 《React 学习手册》
- 《深入 React 技术栈》
- 《React 设计模式》

### 在线课程

- React 官方教程
- 慕课网 React 课程
- 极客时间 React 专栏

## 🎉 下一步

1. **实践项目** - 构建一个完整的应用
2. **学习生态** - 了解 React 生态系统
3. **性能优化** - 深入学习性能优化技巧
4. **测试** - 学习 React 测试方法
5. **部署** - 学习如何部署 React 应用

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个学习项目！

---

**记住：学习 React 最好的方式就是动手实践！** 🚀
