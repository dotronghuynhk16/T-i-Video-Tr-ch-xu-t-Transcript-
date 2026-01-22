import React from 'react';
import { Download, FileText, Menu } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Download size={20} />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              SnapScribe
            </span>
          </div>
          
          <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-700">
            <a href="#" className="hover:text-blue-600 transition-colors">Trang chủ</a>
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors">Hướng dẫn</a>
            <a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-3">
             <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-slate-200 transition">
                <FileText size={16} />
                <span>Transcript API</span>
             </button>
             <button className="p-2 md:hidden text-gray-600">
                <Menu size={24} />
             </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;