import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [messages, setMessages] = useState<string[]>([]);

  const greetings = [
    'Hello from React! 👋',
    'React is alive inside Angular! ⚛',
    'Module Federation 2 works! 🚀',
    'Federated and isolated! 🔒',
    'Cross-framework MFE FTW! 🎉',
  ];

  const handleGreet = () => {
    const msg = greetings[Math.floor(Math.random() * greetings.length)];
    setMessages((prev) => [msg, ...prev].slice(0, 4));
  };

  return (
    <div className="ra-root">
      <div className="ra-header">
        <div className="ra-logo">⚛</div>
        <div>
          <h1 className="ra-title">React Micro-Frontend</h1>
          <p className="ra-subtitle">Loaded via <code>loadRemote('react_app/App')</code></p>
        </div>
      </div>

      <div className="ra-grid">
        {/* Counter card */}
        <div className="ra-card">
          <h2 className="ra-card__title">Isolated State</h2>
          <p className="ra-card__desc">React state is fully isolated in this MFE bundle</p>
          <div className="ra-counter">
            <button
              id="react-decrement"
              className="ra-btn ra-btn--ghost"
              onClick={() => setCount((c) => c - 1)}
            >
              −
            </button>
            <span className="ra-counter__value">{count}</span>
            <button
              id="react-increment"
              className="ra-btn ra-btn--ghost"
              onClick={() => setCount((c) => c + 1)}
            >
              +
            </button>
          </div>
          <button
            id="react-reset"
            className="ra-btn ra-btn--sm"
            onClick={() => setCount(0)}
          >
            Reset
          </button>
        </div>

        {/* Messenger card */}
        <div className="ra-card">
          <h2 className="ra-card__title">Greeting Generator</h2>
          <p className="ra-card__desc">Send a message from inside React</p>
          <button
            id="react-greet"
            className="ra-btn ra-btn--primary"
            onClick={handleGreet}
          >
            Say Hello ✨
          </button>
          <div className="ra-messages">
            {messages.map((m, i) => (
              <div key={i} className="ra-message" style={{ opacity: 1 - i * 0.2 }}>
                {m}
              </div>
            ))}
          </div>
        </div>

        {/* Info card */}
        <div className="ra-card ra-card--info">
          <h2 className="ra-card__title">Remote Info</h2>
          <dl className="ra-dl">
            <dt>Name</dt><dd>react_app</dd>
            <dt>Exposed</dt><dd>./App → mfe-entry.ts</dd>
            <dt>Manifest</dt><dd>http://localhost:3000/mf-manifest.json</dd>
            <dt>Shared</dt><dd>react, react-dom (singleton)</dd>
            <dt>Plugin</dt><dd>@module-federation/vite</dd>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default App;
