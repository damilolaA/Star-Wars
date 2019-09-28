import React from 'react';
import './App.css';
import Home from './components/Home';
import Toast from './components/Toast';
import ToastProvider from './providers/toast.provider';

function App() {
  return (
    <div className="App">
      <ToastProvider>
        <Home />
        <Toast />
      </ToastProvider>
    </div>
  );
}

export default App;
