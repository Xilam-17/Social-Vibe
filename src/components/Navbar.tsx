import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, Home, Bell, X } from 'lucide-react';
import api from '../api/axios';

const Navbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotif, setShowNotif] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const res = await api.get('/notifications/unread-count');
        setUnreadCount(res.data.data);
      } catch (e) { console.error("Badge fetch error:", e); }
    };

    fetchUnread();
    const interval = setInterval(fetchUnread, 30000); 
    return () => clearInterval(interval);
  }, []);

  const handleOpenNotif = async () => {
    const willShow = !showNotif;
    setShowNotif(willShow);

    if (willShow) {
      try {
        const res = await api.get('/notifications');
        setNotifications(res.data.data);
        
        if (unreadCount > 0) {
          await api.patch('/notifications/read-all');
          setUnreadCount(0); 
        }
      } catch (e) { console.error("Notification fetch error:", e); }
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 h-16 flex justify-between items-center">
        
        <Link to="/" className="text-2xl font-black text-blue-600 tracking-tighter hover:opacity-80 transition">
          SOCIALVIBE
        </Link>

        <div className="flex items-center gap-5">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors p-1">
            <Home size={24} />
          </Link>

          <div className="relative">
            <button 
              onClick={handleOpenNotif} 
              className={`p-1 transition-colors cursor-pointer rounded-full ${showNotif ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'}`}
            >
              <Bell size={24} />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center font-bold border-2 border-white">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {showNotif && (
              <>
                <div className="fixed inset-0 z-[-1]" onClick={() => setShowNotif(false)} />
                
                <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                  <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                    <span className="font-bold text-sm text-gray-800">Activity</span>
                    <button onClick={() => setShowNotif(false)} className="text-gray-400 hover:text-gray-600">
                      <X size={16} />
                    </button>
                  </div>
                  
                  <div className="max-h-[400px] overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((n: any) => (
                        <div key={n.id} className="p-4 hover:bg-blue-50/40 flex gap-3 items-start border-b border-gray-50 transition-colors">
                          <div className="w-9 h-9 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600 overflow-hidden border border-blue-200">
                            {n.actorAvatar ? (
                              <img src={`http://localhost:8080${n.actorAvatar}`} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <span className="font-bold text-xs">{n.actorUsername.charAt(0).toUpperCase()}</span>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <p className="text-xs text-gray-800 leading-tight">
                              <span className="font-bold mr-1">{n.actorUsername}</span>
                              {n.type === 'LIKE' && 'liked your post'}
                              {n.type === 'FOLLOW' && 'started following you'}
                              {n.type === 'COMMENT' && 'commented on your post'}
                              {n.type === 'POST' && 'shared a new update'}
                            </p>
                            <span className="text-[10px] text-gray-400 mt-1">Just now</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-10 text-center">
                        <Bell className="mx-auto text-gray-200 mb-2" size={32} />
                        <p className="text-xs text-gray-400">No activity yet</p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-3 border-l pl-5 ml-2 border-gray-200">
            <div className="flex flex-col items-end hidden sm:flex">
              <span className="text-xs font-bold text-gray-800 leading-none">{username}</span>
              <span className="text-[10px] text-green-500 font-medium">Online</span>
            </div>
            <button 
              onClick={handleLogout} 
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all cursor-pointer"
              title="Sign Out"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;