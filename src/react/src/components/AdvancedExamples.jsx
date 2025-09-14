import React, { useState, useEffect, useCallback, useMemo, useRef, createContext, useContext } from 'react';
import './AdvancedExamples.css';

// 1. Context API 示例
const ThemeContext = createContext();
const UserContext = createContext();

// 2. 自定义Hook示例
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// 3. 性能优化示例 - React.memo
const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  console.log('ExpensiveComponent rendered');
  
  const processedData = useMemo(() => {
    // 模拟昂贵的计算
    return data.map(item => ({
      ...item,
      processed: item.value * 2
    }));
  }, [data]);

  return (
    <div className="expensive-component">
      <h3>昂贵计算组件</h3>
      <p>数据项数量: {processedData.length}</p>
      <button onClick={onUpdate}>更新数据</button>
      <ul>
        {processedData.slice(0, 5).map(item => (
          <li key={item.id}>
            {item.name}: {item.processed}
          </li>
        ))}
      </ul>
    </div>
  );
});

// 4. 错误边界示例
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>出错了！</h2>
          <p>组件遇到了问题，请刷新页面重试。</p>
          <button onClick={() => this.setState({ hasError: false })}>
            重试
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// 5. 有问题的组件（用于测试错误边界）
function BuggyComponent() {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error('这是一个测试错误！');
  }

  return (
    <div className="buggy-component">
      <h3>有问题的组件</h3>
      <button onClick={() => setShouldError(true)}>
        触发错误
      </button>
    </div>
  );
}

// 6. 高级表单处理示例
function AdvancedForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    interests: [],
    newsletter: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = '用户名是必填项';
    } else if (formData.username.length < 3) {
      newErrors.username = '用户名至少需要3个字符';
    }

    if (!formData.email) {
      newErrors.email = '邮箱是必填项';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }

    if (!formData.password) {
      newErrors.password = '密码是必填项';
    } else if (formData.password.length < 6) {
      newErrors.password = '密码至少需要6个字符';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '密码不匹配';
    }

    if (!formData.age) {
      newErrors.age = '年龄是必填项';
    } else if (formData.age < 18 || formData.age > 100) {
      newErrors.age = '年龄必须在18-100之间';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleInterestChange = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // 模拟API调用
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('表单提交成功:', formData);
      alert('表单提交成功！');
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: '',
        interests: [],
        newsletter: false
      });
    } catch (error) {
      console.error('提交失败:', error);
      alert('提交失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="advanced-form">
      <h2>高级表单示例</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">用户名 *</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? 'error' : ''}
          />
          {errors.username && <span className="error-message">{errors.username}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">邮箱 *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">密码 *</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">确认密码 *</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? 'error' : ''}
          />
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="age">年龄 *</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="18"
            max="100"
            className={errors.age ? 'error' : ''}
          />
          {errors.age && <span className="error-message">{errors.age}</span>}
        </div>

        <div className="form-group">
          <label>兴趣爱好</label>
          <div className="checkbox-group">
            {['编程', '阅读', '运动', '音乐', '旅行'].map(interest => (
              <label key={interest} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.interests.includes(interest)}
                  onChange={() => handleInterestChange(interest)}
                />
                {interest}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
            />
            订阅新闻通讯
          </label>
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '提交中...' : '提交'}
        </button>
      </form>
    </div>
  );
}

// 7. 虚拟滚动示例
function VirtualList() {
  const [items] = useState(() => 
    Array.from({ length: 10000 }, (_, i) => ({
      id: i,
      name: `项目 ${i}`,
      description: `这是第 ${i} 个项目的描述`
    }))
  );
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 20 });
  const containerRef = useRef(null);

  const itemHeight = 60;
  const containerHeight = 400;
  const visibleCount = Math.ceil(containerHeight / itemHeight);

  const handleScroll = useCallback((e) => {
    const scrollTop = e.target.scrollTop;
    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.min(start + visibleCount + 5, items.length);
    setVisibleRange({ start, end });
  }, [itemHeight, visibleCount, items.length]);

  const visibleItems = items.slice(visibleRange.start, visibleRange.end);
  const totalHeight = items.length * itemHeight;
  const offsetY = visibleRange.start * itemHeight;

  return (
    <div className="virtual-list">
      <h2>虚拟滚动示例 (10,000 个项目)</h2>
      <div 
        ref={containerRef}
        className="virtual-list-container"
        onScroll={handleScroll}
      >
        <div style={{ height: totalHeight, position: 'relative' }}>
          <div style={{ transform: `translateY(${offsetY}px)` }}>
            {visibleItems.map(item => (
              <div key={item.id} className="virtual-list-item">
                <h4>{item.name}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p>显示项目 {visibleRange.start + 1} - {visibleRange.end} / {items.length}</p>
    </div>
  );
}

// 8. 拖拽示例
function DragAndDrop() {
  const [items, setItems] = useState([
    { id: 1, text: '项目 1', category: 'todo' },
    { id: 2, text: '项目 2', category: 'todo' },
    { id: 3, text: '项目 3', category: 'inProgress' },
    { id: 4, text: '项目 4', category: 'done' },
  ]);
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, category) => {
    e.preventDefault();
    if (draggedItem && draggedItem.category !== category) {
      setItems(items.map(item =>
        item.id === draggedItem.id
          ? { ...item, category }
          : item
      ));
    }
    setDraggedItem(null);
  };

  const categories = {
    todo: { title: '待办', color: '#ff6b6b' },
    inProgress: { title: '进行中', color: '#4ecdc4' },
    done: { title: '已完成', color: '#45b7d1' }
  };

  return (
    <div className="drag-and-drop">
      <h2>拖拽示例</h2>
      <div className="drag-containers">
        {Object.entries(categories).map(([category, info]) => (
          <div
            key={category}
            className="drag-container"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, category)}
          >
            <h3 style={{ color: info.color }}>{info.title}</h3>
            {items
              .filter(item => item.category === category)
              .map(item => (
                <div
                  key={item.id}
                  className="drag-item"
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                >
                  {item.text}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// 9. 动画示例
function AnimationExample() {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="animation-example">
      <h2>动画示例</h2>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? '隐藏' : '显示'} 动画元素
      </button>
      
      <div className={`animated-element ${isVisible ? 'visible' : ''}`}>
        <h3>动画元素</h3>
        <p>计数器: {count}</p>
      </div>

      <div className="pulse-element">
        <p>脉冲动画</p>
      </div>

      <div className="bounce-element">
        <p>弹跳动画</p>
      </div>
    </div>
  );
}

// 10. 主题提供者
function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`theme-provider ${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

// 11. 主题切换按钮
function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button className="theme-toggle-btn" onClick={toggleTheme}>
      切换到{theme === 'light' ? '深色' : '浅色'}主题
    </button>
  );
}

// 主组件
export default function AdvancedExamples() {
  const [data, setData] = useState([
    { id: 1, name: '项目A', value: 10 },
    { id: 2, name: '项目B', value: 20 },
    { id: 3, name: '项目C', value: 30 },
  ]);

  const updateData = useCallback(() => {
    setData(prev => prev.map(item => ({
      ...item,
      value: item.value + Math.floor(Math.random() * 10)
    })));
  }, []);

  return (
    <ThemeProvider>
      <div className="advanced-examples">
        <h1>React 高级示例</h1>
        
        <ThemeToggle />
        
        <section>
          <h2>性能优化示例</h2>
          <ExpensiveComponent data={data} onUpdate={updateData} />
        </section>

        <section>
          <h2>错误边界示例</h2>
          <ErrorBoundary>
            <BuggyComponent />
          </ErrorBoundary>
        </section>

        <section>
          <AdvancedForm />
        </section>

        <section>
          <VirtualList />
        </section>

        <section>
          <DragAndDrop />
        </section>

        <section>
          <AnimationExample />
        </section>
      </div>
    </ThemeProvider>
  );
}
