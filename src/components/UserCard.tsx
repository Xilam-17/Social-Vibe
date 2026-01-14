import React, { useState } from 'react';
import { UserPlus, UserCheck, User } from 'lucide-react';
import { toggleFollow } from '../api/userService';

interface UserCardProps {
    id: number;
    username: string;
    isFollowingInitial: boolean;
}

const UserCard = ({ id, username, isFollowingInitial }: UserCardProps) => {
    const [isFollowing, setIsFollowing] = useState(isFollowingInitial);
    const [loading, setLoading] = useState(false);

    const handleFollowClick = async () => {
        setLoading(true);
        try {
            await toggleFollow(id);
            setIsFollowing(!isFollowing);
        } catch (error) {
            console.error("Follow action failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <User size={20} />
                </div>
                <span className="font-bold text-sm text-gray-800">{username}</span>
            </div>
            
            <button
                onClick={handleFollowClick}
                disabled={loading}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isFollowing 
                    ? 'bg-gray-200 text-gray-700 hover:bg-red-100 hover:text-red-600' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
            >
                {isFollowing ? (
                    <><UserCheck size={14} /> Following</>
                ) : (
                    <><UserPlus size={14} /> Follow</>
                )}
            </button>
        </div>
    );
};

export default UserCard;