# React 使用方法指南

## 🎯 React简介

React是由Facebook开发的一个用于构建用户界面的JavaScript库。主要特点：

- **组件化开发**：将UI拆分为独立的、可复用的组件
- **虚拟DOM**：提高渲染性能
- **单向数据流**：数据从父组件流向子组件
- **JSX语法**：在JavaScript中编写HTML

## 🚀 快速开始

### 1. 创建项目
```bash
# 使用Vite (推荐)
npm create vite@latest my-app -- --template react

# 使用Create React App
npx create-react-app my-app
```

### 2. 安装依赖
```bash
cd my-app
npm install
```

### 3. 启动开发服务器
```bash
npm run dev
```

## 🧩 核心概念

### JSX语法
```jsx
// 基础JSX
const element = <h1>Hello, React!</h1>;

// 使用表达式
const name = 'React';
const element = <h1>Hello, {name}!</h1>;

// 使用属性
const element = <img src={user.avatarUrl} alt="头像" />;
```

### 组件
```jsx
// 函数组件 (推荐)
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// 类组件
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

## 📊 状态管理

### useState Hook
```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### useReducer Hook
```jsx
import { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>
        Increment
      </button>
      <button onClick={() => dispatch({ type: 'decrement' })}>
        Decrement
      </button>
    </div>
  );
}
```

## 🎣 Hooks使用

### useEffect Hook
```jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]); // 依赖数组

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

### useContext Hook
```jsx
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <button 
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      style={{ 
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff'
      }}
    >
      Toggle Theme
    </button>
  );
}
```

## 🎯 事件处理

```jsx
function EventHandling() {
  const handleClick = (event) => {
    console.log('Button clicked!', event);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted!');
  };

  const handleChange = (event) => {
    console.log('Input changed:', event.target.value);
  };

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          onChange={handleChange}
          placeholder="Type something..."
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
```

## 🔀 条件渲染

```jsx
function ConditionalRendering({ isLoggedIn, user }) {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back, {user.name}!</h1>
      ) : (
        <h1>Please log in</h1>
      )}
      
      {isLoggedIn && <p>You are logged in!</p>}
      {!isLoggedIn && <p>Please log in to continue</p>}
    </div>
  );
}
```

## 📝 列表渲染

```jsx
function ListRendering() {
  const items = ['Apple', 'Banana', 'Orange'];
  const users = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 35 }
  ];

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.age} years old
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## 📋 表单处理

```jsx
import { useState } from 'react';

function ControlledForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
      </div>
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

## 🎨 样式处理

### 内联样式
```jsx
function InlineStyles() {
  const styles = {
    container: {
      padding: '20px',
      backgroundColor: '#f0f0f0',
      borderRadius: '8px'
    },
    title: {
      color: '#333',
      fontSize: '24px',
      fontWeight: 'bold'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Styled Component</h1>
    </div>
  );
}
```

### CSS类
```jsx
import './styles.css';

function CSSClasses() {
  return (
    <div className="container">
      <h1 className="title">Styled with CSS</h1>
      <button className="btn btn-primary">Primary Button</button>
      <button className="btn btn-secondary">Secondary Button</button>
    </div>
  );
}
```

## ⚡ 性能优化

### React.memo
```jsx
import React from 'react';

const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  console.log('ExpensiveComponent rendered');
  
  return (
    <div>
      <h3>Expensive Component</h3>
      <p>Data items: {data.length}</p>
      <button onClick={onUpdate}>Update Data</button>
    </div>
  );
});
```

### useMemo
```jsx
import { useMemo } from 'react';

function ExpensiveCalculation({ data }) {
  const expensiveValue = useMemo(() => {
    return data
      .filter(item => item.active)
      .map(item => item.value * 2)
      .reduce((sum, value) => sum + value, 0);
  }, [data]);

  return (
    <div>
      <h3>Result: {expensiveValue}</h3>
    </div>
  );
}
```

## 🛡️ 错误处理

### 错误边界
```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong!</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

## 💡 最佳实践

1. **组件命名**：使用PascalCase命名组件
2. **Props验证**：使用PropTypes或TypeScript进行类型检查
3. **状态管理**：合理使用useState和useReducer
4. **性能优化**：使用React.memo、useMemo、useCallback
5. **错误边界**：使用Error Boundary处理组件错误
6. **代码分割**：使用React.lazy进行代码分割

## 🔧 常用工具和库

- **状态管理**：Redux, Zustand, Recoil
- **路由**：React Router
- **UI组件库**：Ant Design, Material-UI, Chakra UI
- **表单处理**：Formik, React Hook Form
- **数据获取**：React Query, SWR
- **测试**：Jest, React Testing Library

## 📚 学习资源

- [React官方文档](https://react.dev/)
- [React Hooks文档](https://react.dev/reference/react)
- [React教程](https://react.dev/learn)

---

**记住：学习React最好的方式就是动手实践！** 🚀
