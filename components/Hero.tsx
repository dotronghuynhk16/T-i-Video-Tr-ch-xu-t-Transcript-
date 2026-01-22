import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white pt-12 pb-8 text-center px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
          Tải Video & <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Trích xuất Transcript AI
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
          Công cụ miễn phí tốt nhất để tải video TikTok, Facebook không logo và lấy nội dung kịch bản (transcript) chỉ với 1 cú click. Không cần cài đặt phần mềm.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold text-slate-500 mt-4">
          <span className="flex items-center gap-1">✓ Không dính Logo</span>
          <span className="flex items-center gap-1">✓ Chất lượng 4K/HD</span>
          <span className="flex items-center gap-1">✓ AI Transcript</span>
          <span className="flex items-center gap-1">✓ Miễn phí 100%</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;