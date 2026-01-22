import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InputArea from './components/InputArea';
import ResultSection from './components/ResultSection';
import Footer from './components/Footer';
import { VideoMetadata } from './types';
import { fetchVideoData } from './services/mockVideoService';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoData, setVideoData] = useState<VideoMetadata | null>(null);
  const [currentUrl, setCurrentUrl] = useState('');

  const handleSearch = async (url: string) => {
    setLoading(true);
    setError(null);
    setVideoData(null);
    setCurrentUrl(url);

    try {
      const data = await fetchVideoData(url);
      setVideoData(data);
    } catch (err) {
      setError("Không thể tìm thấy video. Vui lòng kiểm tra lại liên kết hoặc thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Hero />
        <InputArea onSearch={handleSearch} isLoading={loading} />
        
        {error && (
          <div className="max-w-2xl mx-auto mt-8 px-4">
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center justify-center">
              {error}
            </div>
          </div>
        )}

        {videoData && (
            <ResultSection metadata={videoData} url={currentUrl} />
        )}

        {/* Feature Grid (Only show when no result) */}
        {!videoData && !loading && (
          <div className="max-w-6xl mx-auto px-4 mt-20 mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-800 mb-12">Tại sao chọn SnapScribe?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon="⚡"
                title="Tốc độ cực nhanh"
                desc="Hệ thống máy chủ tối ưu giúp xử lý video và transcript chỉ trong vài giây."
              />
              <FeatureCard 
                icon="🚫"
                title="Không Watermark"
                desc="Video tải về sạch hoàn toàn, không dính ID hay Logo của nền tảng gốc."
              />
              <FeatureCard 
                icon="🤖"
                title="Sức mạnh AI"
                desc="Sử dụng Gemini AI để trích xuất, tóm tắt và viết lại kịch bản video tự động."
              />
            </div>
            
            <div className="mt-20 border-t border-slate-200 pt-10">
                <h3 className="text-xl font-bold text-slate-800 mb-6" id="how-it-works">Cách sử dụng</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Step number="1" title="Sao chép Link" desc="Nhấn chia sẻ video TikTok/Facebook và chọn 'Sao chép liên kết'." />
                    <Step number="2" title="Dán vào App" desc="Dán liên kết vào ô tìm kiếm phía trên." />
                    <Step number="3" title="Chọn hành động" desc="Chọn 'Tải Video' hoặc 'Trích xuất Transcript'." />
                    <Step number="4" title="Hoàn tất" desc="Lưu video 4K hoặc sao chép nội dung văn bản." />
                </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

const FeatureCard: React.FC<{icon: string, title: string, desc: string}> = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{desc}</p>
  </div>
);

const Step: React.FC<{number: string, title: string, desc: string}> = ({ number, title, desc }) => (
    <div className="relative pl-4">
        <div className="text-5xl font-black text-slate-100 absolute -top-4 left-0 -z-10">{number}</div>
        <h4 className="font-bold text-slate-800 text-lg mb-1">{title}</h4>
        <p className="text-sm text-slate-500">{desc}</p>
    </div>
);

export default App;