import React, { useState } from 'react';
import api from '../api/axios';
import { Camera, MapPin, Send } from 'lucide-react';

const CreatePost = ({ onPostCreated }: { onPostCreated: () => void }) => {
    const [caption, setCaption] = useState('');
    const [location, setLocation] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select an image");

    const formData = new FormData();
    formData.append('file', file);
    
    const postData = { caption, location };
    
    formData.append('postRequest', new Blob([JSON.stringify(postData)], {
        type: 'application/json'
    }));

    try {
       await api.post('/posts', formData); 
    setCaption('');
    setLocation('');
    setFile(null);
    setPreview(null);
    onPostCreated();
    } catch (error) {
        console.error(error);
        alert("Upload failed. Check console.");
    }
};
    return (
        <div className="bg-white p-4 rounded-xl shadow-md mb-8 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea 
                    placeholder="What's on your mind?" 
                    className="w-full p-3 bg-gray-50 rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-blue-400"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                />
                
                {preview && <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />}

                <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                        <label className="cursor-pointer text-gray-600 hover:text-blue-600 flex items-center gap-1">
                            <Camera size={20} />
                            <span className="text-sm">Photo</span>
                            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                        </label>
                        <div className="flex items-center gap-1 text-gray-600">
                            <MapPin size={20} />
                            <input 
                                type="text" 
                                placeholder="Location" 
                                className="text-sm focus:outline-none"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                    </div>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-700 transition">
                        <Send size={18} /> Post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;