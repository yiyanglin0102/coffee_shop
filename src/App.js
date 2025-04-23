import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: 20 }}>
        <Home />
      </div>
    </div>
  );
}

export default App;
