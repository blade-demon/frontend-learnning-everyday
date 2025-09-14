import React, { useState, useEffect } from "react";
import "./BasicExamples.css";

// 1. 基础函数组件
export function Greeting({ name, age }) {
  return (
    <div className="greeting">
      <h1>你好, {name}!</h1>
      <p>你今年 {age} 岁了</p>
    </div>
  );
}

// 2. 状态管理示例
export function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const increment = () => setCount(count + step);
  const decrement = () => setCount(count - step);
  const reset = () => setCount(0);

  return (
    <div className="counter">
      <h2>计数器示例</h2>
      <div className="counter-display">
        <span>当前值: {count}</span>
      </div>
      <div className="counter-controls">
        <button onClick={decrement}>-</button>
        <button onClick={increment}>+</button>
        <button onClick={reset}>重置</button>
      </div>
      <div className="step-control">
        <label>
          步长:
          <input type="number" value={step} onChange={(e) => setStep(Number(e.target.value))} min="1" max="10" />
        </label>
      </div>
    </div>
  );
}

// 3. 表单处理示例
export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("表单数据:", formData);
    setIsSubmitted(true);
    // 模拟提交后重置表单
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitted(false);
    }, 2000);
  };

  return (
    <div className="contact-form">
      <h2>联系表单</h2>
      {isSubmitted ? (
        <div className="success-message">
          <p>✅ 表单提交成功！</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">姓名:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="email">邮箱:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="message">留言:</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="4" required />
          </div>

          <button type="submit">提交</button>
        </form>
      )}
    </div>
  );
}

// 4. 列表渲染示例
export function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "学习React", completed: false },
    { id: 2, text: "写代码", completed: true },
    { id: 3, text: "阅读文档", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
      };
      setTodos([...todos, todo]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-list">
      <h2>待办事项</h2>

      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="添加新的待办事项..."
        />
        <button type="submit">添加</button>
      </form>

      <ul className="todo-items">
        {todos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.completed ? "completed" : ""}`}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
            <span>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>删除</button>
          </li>
        ))}
      </ul>

      <div className="todo-stats">
        <p>总计: {todos.length} 项</p>
        <p>已完成: {todos.filter((todo) => todo.completed).length} 项</p>
      </div>
    </div>
  );
}

// 5. 条件渲染示例
export function UserProfile({ user, isLoggedIn }) {
  if (!isLoggedIn) {
    return (
      <div className="user-profile">
        <h2>用户资料</h2>
        <p>请先登录查看您的资料</p>
        <button>登录</button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="user-profile">
        <h2>用户资料</h2>
        <p>加载中...</p>
      </div>
    );
  }

  return (
    <div className="user-profile">
      <h2>用户资料</h2>
      <div className="profile-info">
        <img src={user.avatar} alt="头像" className="avatar" />
        <div className="user-details">
          <h3>{user.name}</h3>
          <p>邮箱: {user.email}</p>
          <p>年龄: {user.age}</p>
          <p>城市: {user.city}</p>
        </div>
      </div>
      <div className="profile-actions">
        <button>编辑资料</button>
        <button>更改密码</button>
      </div>
    </div>
  );
}

// 6. useEffect示例
export function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 模拟API调用
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // 空依赖数组，只在组件挂载时执行

  if (loading) {
    return <div className="data-fetcher">加载中...</div>;
  }

  if (error) {
    return <div className="data-fetcher error">错误: {error}</div>;
  }

  return (
    <div className="data-fetcher">
      <h2>数据获取示例</h2>
      {data && (
        <div className="post">
          <h3>{data.title}</h3>
          <p>{data.body}</p>
        </div>
      )}
    </div>
  );
}

// 7. 主题切换示例
export function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={`theme-toggle ${theme}`}>
      <h2>主题切换</h2>
      <p>当前主题: {theme === "light" ? "浅色" : "深色"}</p>
      <button onClick={toggleTheme}>切换到{theme === "light" ? "深色" : "浅色"}主题</button>
      <div className="theme-demo">
        <p>这是一个主题演示区域</p>
        <button>示例按钮</button>
      </div>
    </div>
  );
}

// 主组件，展示所有示例
export default function BasicExamples() {
  const mockUser = {
    name: "张三",
    email: "zhangsan@example.com",
    age: 25,
    city: "北京",
    avatar: "https://via.placeholder.com/100",
  };

  return (
    <div className="basic-examples">
      <h1>React 基础示例</h1>

      <section>
        <Greeting name="React学习者" age={25} />
      </section>

      <section>
        <Counter />
      </section>

      <section>
        <ContactForm />
      </section>

      <section>
        <TodoList />
      </section>

      <section>
        <UserProfile user={mockUser} isLoggedIn={true} />
      </section>

      <section>
        <DataFetcher />
      </section>

      <section>
        <ThemeToggle />
      </section>
    </div>
  );
}
