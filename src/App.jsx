import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import EmbedCreator from './pages/EmbedCreator.jsx';
import Servers from './pages/Servers.jsx';
import AuthCallback from './pages/AuthCallback.jsx';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/embed-creator" element={<EmbedCreator />} />
          <Route path="/servers" element={<Servers />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
