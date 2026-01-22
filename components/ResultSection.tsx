import React, { useState, useEffect } from 'react';
import { VideoMetadata, TranscriptData, AppMode } from '../types';
import { Download, FileText, Check, Copy, Wand2, RefreshCw } from 'lucide-react';
import { processTranscriptWithAI, generateSimulatedTranscript } from '../services/geminiService';
import { fetchTranscript } from '../services/mockVideoService';

interface ResultSectionProps {
  metadata: VideoMetadata;
  url: string;
}

const ResultSection: React.FC<ResultSectionProps> = ({ metadata, url }) => {
  const [activeMode, setActiveMode] = useState<AppMode>(AppMode.DOWNLOAD);
  const [transcript, setTranscript] = useState<TranscriptData | null>(null);
  const [loadingTranscript, setLoadingTranscript] = useState(false);
  const [aiProcessing, setAiProcessing] = useState(false);
  
  // AI Feature States
  const [displayedText, setDisplayedText] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  // Initialize transcript when switching to transcript mode
  useEffect(() => {
    if (activeMode === AppMode.TRANSCRIPT && !transcript && !loadingTranscript) {
        handleLoadTranscript();
    }
  }, [activeMode]);

  const handleLoadTranscript = async () => {
    setLoadingTranscript(true);
    try {
        const data = await fetchTranscript(url, metadata.title);
        setTranscript(data);
        setDisplayedText(data.text);
    } catch (e) {
        console.error(e);
    } finally {
        setLoadingTranscript(false);
    }
  };

  const handleAiAction = async (action: 'summarize' | 'rewrite' | 'translate_vi') => {
    if (!transcript) return;
    setAiProcessing(true);
    const newText = await processTranscriptWithAI(transcript.text, action);
    setDisplayedText(newText);
    setAiProcessing(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(displayedText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 px-4 pb-20">
      
      {/* Platform & Title */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6">
            
            {/* Thumbnail */}
            <div className="w-full md:w-1/3 shrink-0">
                <div className="aspect-[9/16] md:aspect-video rounded-2xl overflow-hidden bg-slate-200 shadow-inner relative group">
                    <img 
                        src={metadata.thumbnail} 
                        alt={metadata.title} 
                        className="w-full h-full object-cover transition transform group-hover:scale-105"
                    />
                    <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                        {metadata.duration}
                    </div>
                </div>
            </div>

            {/* Content Info */}
            <div className="flex-grow">
                <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                        ${metadata.platform === 'TikTok' ? 'bg-black text-white' : 
                          metadata.platform === 'Facebook' ? 'bg-blue-600 text-white' : 
                          'bg-red-600 text-white'}`}>
                        {metadata.platform}
                    </span>
                    <span className="text-slate-500 text-sm">by {metadata.author}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 line-clamp-2">
                    {metadata.title}
                </h2>

                {/* Tabs */}
                <div className="flex bg-slate-100 p-1 rounded-xl w-full md:w-fit mb-6">
                    <button
                        onClick={() => setActiveMode(AppMode.DOWNLOAD)}
                        className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2
                        ${activeMode === AppMode.DOWNLOAD ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <Download size={18} />
                        Tải Video
                    </button>
                    <button
                        onClick={() => setActiveMode(AppMode.TRANSCRIPT)}
                        className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2
                        ${activeMode === AppMode.TRANSCRIPT ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <FileText size={18} />
                        Transcript & AI
                    </button>
                </div>

                {/* --- DOWNLOAD MODE --- */}
                {activeMode === AppMode.DOWNLOAD && (
                    <div className="space-y-3 animate-fade-in">
                        <div className="text-sm font-medium text-slate-500 mb-2">Chọn định dạng tải xuống:</div>
                        {metadata.downloadLinks?.map((link, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition group">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-slate-700 group-hover:text-blue-700">{link.quality}</span>
                                    <span className="text-xs text-slate-400">{link.type.toUpperCase()} • {link.size}</span>
                                </div>
                                <a 
                                    href={link.url} 
                                    download 
                                    className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center gap-2 shadow-md shadow-blue-500/20"
                                >
                                    <Download size={16} />
                                    Tải Ngay
                                </a>
                            </div>
                        ))}
                    </div>
                )}

                {/* --- TRANSCRIPT MODE --- */}
                {activeMode === AppMode.TRANSCRIPT && (
                    <div className="animate-fade-in">
                         {loadingTranscript ? (
                             <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                                 <RefreshCw className="animate-spin mb-3" size={32} />
                                 <p>Đang trích xuất nội dung từ âm thanh...</p>
                                 <p className="text-xs mt-2 text-slate-300 max-w-xs text-center">Chúng tôi đang xử lý âm thanh video để tạo văn bản cho bạn.</p>
                             </div>
                         ) : (
                             <div className="flex flex-col h-full">
                                {/* AI Toolbar */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <button 
                                        onClick={() => handleAiAction('summarize')}
                                        disabled={aiProcessing}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 text-xs font-semibold rounded-lg hover:bg-purple-100 transition border border-purple-200"
                                    >
                                        <Wand2 size={14} /> Tóm tắt
                                    </button>
                                    <button 
                                        onClick={() => handleAiAction('rewrite')}
                                        disabled={aiProcessing}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-lg hover:bg-emerald-100 transition border border-emerald-200"
                                    >
                                        <Wand2 size={14} /> Viết lại (Blog)
                                    </button>
                                    <button 
                                        onClick={() => handleAiAction('translate_vi')}
                                        disabled={aiProcessing}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-700 text-xs font-semibold rounded-lg hover:bg-orange-100 transition border border-orange-200"
                                    >
                                        <Wand2 size={14} /> Dịch tiếng Việt
                                    </button>
                                </div>

                                {/* Text Area */}
                                <div className="relative">
                                    <div className={`w-full h-64 p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 text-sm leading-relaxed overflow-y-auto custom-scrollbar ${aiProcessing ? 'opacity-50' : ''}`}>
                                        {displayedText}
                                    </div>
                                    
                                    {aiProcessing && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[1px] rounded-xl">
                                            <div className="bg-white p-3 rounded-full shadow-lg border border-slate-100">
                                                <RefreshCw className="animate-spin text-purple-600" size={24} />
                                            </div>
                                        </div>
                                    )}

                                    <button 
                                        onClick={copyToClipboard}
                                        className="absolute top-3 right-3 p-2 bg-white rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-blue-600 transition"
                                        title="Copy text"
                                    >
                                        {isCopied ? <Check size={16} className="text-green-500"/> : <Copy size={16} />}
                                    </button>
                                </div>
                                <div className="mt-2 text-xs text-slate-400 text-center">
                                    *Transcript generated by AI. May contain inaccuracies.
                                </div>
                             </div>
                         )}
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ResultSection;