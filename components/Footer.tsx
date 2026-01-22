import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 mt-20">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        <div>
          <h3 className="text-white font-bold text-lg mb-4">SnapScribe</h3>
          <p>
            Công cụ tải video và trích xuất nội dung bằng AI hàng đầu. Hoàn toàn miễn phí, không cần đăng ký.
          </p>
        </div>
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Liên kết</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition">Điều khoản sử dụng</a></li>
            <li><a href="#" className="hover:text-white transition">Chính sách bảo mật</a></li>
            <li><a href="#" className="hover:text-white transition">Liên hệ</a></li>
          </ul>
        </div>
        <div>
            <h3 className="text-white font-bold text-lg mb-4">Tuyên bố miễn trừ</h3>
            <p>
                SnapScribe không được liên kết với TikTok, Facebook hay YouTube. Chúng tôi không lưu trữ bất kỳ video nào trên máy chủ của mình. Mọi quyền thuộc về chủ sở hữu nội dung.
            </p>
        </div>
      </div>
      <div className="text-center mt-12 pt-8 border-t border-slate-800">
        &copy; {new Date().getFullYear()} SnapScribe AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;