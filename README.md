# Albion Online Item Price Tracker & Upgrade Calculator

Albion Online için gelişmiş item fiyat takipçisi ve upgrade hesaplayıcısı.

## 🚀 Özellikler

- **Item Fiyat Takibi**: Tüm Albion Online itemlarının fiyatlarını gerçek zamanlı takip edin
- **Upgrade Hesaplayıcısı**: Item upgrade maliyetlerini ve karlılığını hesaplayın
- **Çoklu Şehir Desteği**: Tüm Albion şehirlerindeki fiyatları karşılaştırın
- **Filtreleme**: Tier, enchantment, quality ve location bazında filtreleme
- **Responsive Tasarım**: Mobil ve desktop uyumlu modern arayüz

## 🛠️ Teknik Özellikler

### Performance Optimizasyonları

- **Lazy Loading**: Sayfa bileşenleri lazy loading ile yüklenir
- **Memoization**: useMemo ve useCallback ile gereksiz re-render'lar önlenir
- **Caching**: API yanıtları cache'lenir, gereksiz API çağrıları önlenir
- **Debouncing**: Arama işlemleri debounce edilir
- **Code Splitting**: Bundle boyutu optimize edilir

### Error Handling

- **Error Boundary**: React hataları yakalanır ve kullanıcı dostu mesajlar gösterilir
- **Graceful Degradation**: API hatalarında uygulama çalışmaya devam eder
- **Loading States**: Tüm async işlemler için loading durumları

### Code Quality

- **ESLint**: Gelişmiş linting kuralları
- **TypeScript Ready**: Gelecekte TypeScript'e geçiş için hazır yapı
- **Modular Architecture**: Yeniden kullanılabilir bileşenler ve servisler

## 📦 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build

# Linting
npm run lint
```

## 🏗️ Proje Yapısı

```
src/
├── components/          # React bileşenleri
├── data/              # Sabit veriler ve utilities
├── hooks/             # Custom React hooks
├── services/          # API servisleri ve cache
├── App.jsx           # Ana uygulama bileşeni
├── ItemSearchPage.jsx # Item arama sayfası
└── ItemUpgradeCalculator.jsx # Upgrade hesaplayıcısı
```

## 🔧 Kullanılan Teknolojiler

- **React 19**: Modern React hooks ve özellikleri
- **Vite**: Hızlı build tool
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Modern icon set
- **Axios**: HTTP client (gelecekte kullanım için hazır)

## 🚀 Deployment

```bash
# Production build
npm run build

# Preview
npm run preview
```

## 📈 Performance Metrikleri

- **Initial Load**: ~200KB (gzipped)
- **Lazy Loading**: Sayfa bileşenleri ayrı chunk'lar halinde yüklenir
- **Cache Hit Rate**: API yanıtları 5 dakika cache'lenir
- **Bundle Analysis**: Vite bundle analyzer ile optimize edilir

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

MIT License - detaylar için [LICENSE](LICENSE) dosyasına bakın.
