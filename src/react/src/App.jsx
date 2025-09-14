import React, { useState } from 'react';
import BasicExamples from './components/BasicExamples';
import AdvancedExamples from './components/AdvancedExamples';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('basic');

  return (
    <div className="app">
      <header className="app-header">
        <h1>React 学习示例</h1>
        <nav className="app-nav">
          <button 
            className={`nav-btn ${currentView === 'basic' ? 'active' : ''}`}
            onClick={() => setCurrentView('basic')}
          >
            基础示例
          </button>
          <button 
            className={`nav-btn ${currentView === 'advanced' ? 'active' : ''}`}
            onClick={() => setCurrentView('advanced')}
          >
            高级示例
          </button>
        </nav>
      </header>

      <main className="app-main">
        {currentView === 'basic' ? <BasicExamples /> : <AdvancedExamples />}
      </main>

      <footer className="app-footer">
        <p>React 学习项目 - 每天进步一点点</p>
      </footer>
    </div>
  );
}

export default App;
