# Weather TPHCM - Progressive Web App

🌤️ **Ứng dụng thời tiết chuyên nghiệp cho Thành phố Hồ Chí Minh**

Progressive Web App với giao diện đẹp, tính năng đầy đủ và trải nghiệm mobile-first.

## ✨ Tính năng chính

### 🌍 **Thời tiết real-time**
- Dữ liệu thời tiết hiện tại cho TPHCM
- Cập nhật tự động mỗi 30 phút
- Hiển thị nhiệt độ, độ ẩm, tốc độ gió, tầm nhìn
- Cảm giác nhiệt độ thực tế

### 📊 **Biểu đồ chi tiết**
- Biểu đồ nhiệt độ 24h với Chart.js
- Đường độ ẩm và lượng mưa
- Tooltips thông tin chi tiết
- Animation mượt mà

### 🎨 **Dynamic Background**
- Background thay đổi theo thời tiết:
  - ☀️ **Nắng**: Gradient xanh-vàng với hiệu ứng glow
  - 🌧️ **Mưa**: Gradient xám với animation giọt mưa
  - ☁️ **Nhiều mây**: Gradient xanh-tím nhạt
  - 🌙 **Đêm**: Gradient đen với animation sao

### 📱 **Mobile-first PWA**
- Responsive hoàn hảo trên mọi thiết bị
- Có thể cài đặt như native app
- Offline support với Service Worker
- Pull-to-refresh với haptic feedback

### 📅 **Date Navigation**
- Chọn ngày để xem dự báo
- 5 ngày trước + hôm nay + 2 ngày tới
- UI button thân thiện

## 🛠️ Công nghệ sử dụng

- **HTML5** - Semantic markup
- **CSS3** - Advanced animations & responsive design
- **JavaScript ES6+** - Modern JS features
- **Chart.js** - Interactive charts from CDN
- **Bootstrap 5** - Responsive framework
- **OpenWeatherMap API** - Real weather data
- **Service Worker** - PWA functionality
- **Local Storage** - Data caching

## 🚀 Cài đặt và sử dụng

### 1. **Clone repository**
```bash
git clone https://github.com/Taddy-Lab2Lives/Weather.git
cd Weather
```

### 2. **Lấy API key (Miễn phí)**
1. Đăng ký tại [OpenWeatherMap](https://openweathermap.org/api)
2. Lấy free API key
3. Thay thế `YOUR_API_KEY_HERE` trong file `index.html`

### 3. **Chạy ứng dụng**
```bash
# Với Live Server (VS Code)
# Hoặc mở index.html trong browser
```

### 4. **Deploy (Optional)**
```bash
# GitHub Pages
git add .
git commit -m "Deploy weather app"
git push origin main

# Hoặc deploy lên Netlify, Vercel
```

## 📱 Tính năng PWA

### **Cài đặt như Native App**
- Chrome/Edge: "Add to Home Screen"
- iOS Safari: "Add to Home Screen"
- Icon và splash screen tự động

### **Offline Support**
- Cache static resources
- Fallback data khi mất mạng
- Background sync (nếu supported)

### **Performance**
- Lazy loading
- Image optimization
- Smooth 60fps animations
- Optimized for 3G networks

## 🎯 Sử dụng

1. **Mở app** trên mobile hoặc desktop
2. **Xem thời tiết** hiện tại TPHCM
3. **Chọn ngày** để xem forecast khác
4. **Pull-to-refresh** để cập nhật
5. **Add to home screen** cho trải nghiệm native

## 🌟 Tính năng nâng cao

### **Animations**
- Smooth background transitions
- Rain/snow particle effects
- Twinkling stars cho ban đêm
- Chart loading animations

### **UX Details**
- Loading spinners
- Error handling graceful
- Haptic feedback (vibration)
- Touch-friendly interface

### **Data Management**
- Smart caching strategy
- API rate limit handling
- Fallback to sample data
- Auto-refresh mechanism

## 🔧 Customization

### **Thay đổi thành phố**
```javascript
// Trong index.html, dòng 320-321
const CITY_LAT = 10.8231;  // Latitude TPHCM
const CITY_LON = 106.6297; // Longitude TPHCM
```

### **Tuỳ chỉnh colors**
```css
/* Trong CSS :root */
:root {
    --primary-color: #1e40af;
    --text-light: #ffffff;
    /* ... */
}
```

### **Sample Data**
App có sẵn sample data để test mà không cần API key.

## 📊 Browser Support

| Browser | Support |
|---------|---------|
| Chrome 80+ | ✅ Full |
| Firefox 75+ | ✅ Full |
| Safari 13+ | ✅ Full |
| Edge 80+ | ✅ Full |
| Mobile browsers | ✅ Optimized |

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push và tạo Pull Request

## 🐛 Issues

Report bugs tại [GitHub Issues](https://github.com/Taddy-Lab2Lives/Weather/issues)

## 📄 License

MIT License - sử dụng tự do cho personal và commercial projects.

## 🏆 Credits

- **Weather Data**: OpenWeatherMap API
- **Charts**: Chart.js
- **Icons**: Bootstrap Icons
- **Framework**: Bootstrap 5
- **PWA**: Service Worker API

---

## 📱 Demo

**Live Demo**: [weather-tphcm.netlify.app](https://weather-tphcm.netlify.app) (sẽ update sau khi deploy)

**Screenshots**:
- 📱 Mobile: Responsive design
- 🌧️ Rain Mode: Dynamic background
- 📊 Charts: Interactive weather data
- 🌙 Night Mode: Star animations

---

**Phát triển bởi**: Weather TPHCM Team  
**Version**: 1.0.0  
**Last Update**: 2024

🌤️ **Enjoy your weather experience!**