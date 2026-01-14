import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import FeedPage from './pages/FeedPage';
import Navbar from './components/Navbar';

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;

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
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/" 
          element={
            <ProtectedLayout>
              <FeedPage />
            </ProtectedLayout>
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;