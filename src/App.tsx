import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; // 1. Add this import
import FeedPage from './pages/FeedPage';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />; // Added 'replace' for cleaner history

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen">{children}</main>
    </>
  );
};

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> 

        <Route 
          path="/" 
          element={
            <ProtectedLayout>
              <FeedPage />
            </ProtectedLayout>
          } 
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;