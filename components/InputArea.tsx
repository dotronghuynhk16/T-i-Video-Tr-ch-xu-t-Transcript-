import React, { useState } from 'react';
import { Link, Loader2, Search } from 'lucide-react';

interface InputAreaProps {
  onSearch: (url: string) => void;
  isLoading: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ onSearch, isLoading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSearch(url.trim());
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto -mt-6 px-4 relative z-20">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative flex items-center bg-white p-2 rounded-2xl shadow-xl border border-gray-100">
          <div className="hidden sm:flex items-center justify-center w-12 h-12 text-blue-600">
            <Link size={24} />
          </div>
          <input
            type="text"
            className="flex-grow p-4 text-gray-700 outline-none text-base sm:text-lg placeholder:text-gray-400"
            placeholder="Dán liên kết video TikTok, Facebook, YouTube vào đây..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handlePaste}
              className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-500 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              Dán
            </button>
            <button
              type="submit"
              disabled={isLoading || !url}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Xử lý...</span>
                </>
              ) : (
                <>
                  <Search size={20} />
                  <span>Bắt đầu</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
      <div className="text-center mt-3 text-xs text-slate-400">
        Hỗ trợ: TikTok, Facebook Reels, YouTube Shorts, Instagram
      </div>
    </div>
  );
};

export default InputArea;