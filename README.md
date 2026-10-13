https://github.com/user-attachments/assets/649a8567-339a-439a-abc0-3db7fac9e82d

# ToS Risk Analyzer

ToS Risk Analyzer, açık olan web sayfasındaki kullanım koşulları ve gizlilik
bildirimleri gibi metinleri inceleyip olası riskli maddeleri anlaşılır Türkçe
açıklamalarla gösteren bir Chrome uzantısıdır. Analiz, kullanıcı tarafından
başlatılır ve Google Gemini API kullanır.

> **Önemli:** Bu uzantı hukuki tavsiye vermez. Analiz sonuçları otomatik ve
> bilgilendirme amaçlıdır; bir sözleşmeyi kabul etme veya reddetme kararının
> yerini tutmaz.

## Özellikler

- Etkin sekmedeki sayfa metnini kullanıcı isteğiyle analiz eder.
- Tespit edilen riskli maddeleri kaynak alıntıları ve sade Türkçe açıklamalarla
  listeler.
- Genel risk skorunu 0–100 arasında gösterir; maddeleri Düşük, Orta, Yüksek veya
  Kritik olarak sınıflandırır.
- Sonucu güvenilir biçimde oluşturamadığında kesin bir değerlendirme sunmak
  yerine belirsizlik bildirir.
- Gizli sayfa öğelerinde bilinen prompt injection kalıplarını arar. Böyle bir
  kalıp bulunursa sayfa metnini Gemini API'ye göndermeden analizi durdurur.
- API anahtarını tarayıcı depolamasına yazmaz; yalnızca uzantı penceresi açıkken
  bellekte tutar.
- Geliştirme modunda yerel, önceden hazırlanmış örneklerle demosu çalıştırılabilir.

## Çalışma akışı

1. Uzantının açılır penceresinde Gemini API anahtarı girilir.
2. **Sayfayı Analiz Et** düğmesine basıldığında uzantı etkin sekmeden görünür
   sayfa metnini alır. Betikler, stiller, gezinme alanları, alt/üst bilgiler,
   düğmeler ve gizli öğeler analiz metnine dahil edilmez.
3. Gizli öğelerde bilinen talimat yönlendirme kalıpları aranır. Tespit yapılırsa
   sayfa metni dış servise gönderilmeden belirsizlik sonucu gösterilir.
4. Kontrolü geçen metin, en fazla 30.000 karakter olacak şekilde Gemini API'ye
   iletilir. Modelden yapılandırılmış JSON biçiminde risk skoru ve riskli
   maddeler istenir.
5. Yanıt şema doğrulamasından geçirilir. Belirsizlik bildirilmediyse, alıntıların
   kaynak sayfa metninde bulunup bulunmadığı ayrıca kontrol edilir.

## Gereksinimler

- Node.js ve npm
- Google Chrome veya Chromium tabanlı bir tarayıcı
- Analiz çalıştırmak için bir Google Gemini API anahtarı

## Geliştirme kurulumu

Bağımlılıkları yükleyin:

```bash
npm install
```

Yerel geliştirme sunucusunu başlatın:

```bash
npm run dev
```

Bu komut uzantı arayüzünü tarayıcıda geliştirmek için Vite sunucusunu çalıştırır.
Uzantının Chrome API'leriyle birlikte denenmesi için üretim çıktısını oluşturup
Chrome'a yükleyin.

## Chrome'a yükleme

1. Proje kökünde aşağıdaki komutu çalıştırarak üretim dosyalarını derleyin:

   ```bash
   npm run build
   ```

2. Chrome'da `chrome://extensions` sayfasını açın.
3. **Geliştirici modu** seçeneğini etkinleştirin.
4. **Paketlenmemiş öğe yükle** seçeneğini kullanarak projenin `dist` klasörünü
   seçin.
5. Analiz etmek istediğiniz bir web sayfasını açın, uzantı simgesinden ToS Risk
   Analyzer'ı başlatın ve Gemini API anahtarınızı girin.

Bir uzantı güncellemesinden sonra `npm run build` komutunu yeniden çalıştırıp
`chrome://extensions` sayfasındaki uzantıyı yenileyin. Tarayıcının güvenlik
nedeniyle kısıtladığı sayfalar (örneğin bazı dahili Chrome sayfaları) analiz
edilemeyebilir.

## API anahtarı ve veri kullanımı

- API anahtarı uzantı arayüzünde girilir ve uygulama belleğinde tutulur; uzantı
  penceresi kapatıldığında kaybolur.
- Anahtar, analiz isteği yapılırken Google Gemini API isteğinde kullanılır.
- Sayfa metni, **Sayfayı Analiz Et** düğmesine basılmadan gönderilmez. Düğmeye
  basıldığında metin, analiz amacıyla Google Gemini API'ye iletilir.
- Analiz edilecek sayfalarda kişisel, gizli veya hassas bilgiler bulunabilir.
  İçeriği üçüncü taraf bir hizmete göndermeden önce sayfayı ve ilgili hizmetin
  veri koşullarını değerlendirin.
- Bu proje anahtarı uygulama içinde saklamaz; ancak yerel geliştirme
  ortamınızın, tarayıcınızın veya Google hizmetinin kendi kayıt/işleme
  davranışları bu uygulamanın kapsamı dışındadır.

## Güvenlik yaklaşımı ve sınırlamalar

Gizli öğe kontrolü; `display: none`, `visibility: hidden`, `opacity: 0`,
`aria-hidden`, `hidden` ve gizli input gibi durumları dikkate alır. Kontrol,
bilinen bazı Türkçe ve İngilizce talimat yönlendirme ifadeleriyle eşleşen gizli
metinleri arar.

Bu kontrol sezgiseldir; tüm saldırıları veya gizli talimatları yakalayacağı
garanti edilmez. Ayrıca sayfa metnini temizlemek, alıntıları doğrulamak ve
model yanıtını şemaya göre denetlemek analiz hatası riskini azaltmaya yardımcı
olsa da model değerlendirmesinin doğru veya eksiksiz olduğunu garanti etmez.
Sonuçları önemli kararlar için tek kaynak olarak kullanmayın.

## Komutlar

| Komut | Açıklama |
| --- | --- |
| `npm run dev` | Vite geliştirme sunucusunu başlatır. |
| `npm run dev:demo` | Demo için `127.0.0.1:4178` adresinde yerel sunucuyu başlatır. |
| `npm run build` | TypeScript projelerini kontrol eder ve üretim çıktısını `dist` klasörüne oluşturur. |
| `npm run preview` | Üretim çıktısını yerel olarak önizler. |
| `npm run lint` | Oxlint ile kaynak dosyalarını denetler. |
| `npm run demo:video` | Cypress demo senaryolarını çalıştırır ve video kaydı oluşturur. |

## Demo ve testler

Demo senaryoları, uygulamanın iki örnek davranışını sınar:

1. Örnek bir sözleşmede risk skoru ve riskli maddelerin gösterilmesi.
2. Gizli bir talimat bulunduğunda belirsizlik gösterilmesi ve Gemini isteği
   yapılmaması.

Demo verileri yalnızca Vite geliştirme modunda kullanılabilir ve arayüzde yerel
örnek sonuç olduğu belirtilir. Bu senaryolar canlı Gemini analizi değildir; API
anahtarı gerekmez. Cypress'in oluşturduğu video `cypress/videos/` altında
saklanır.

```bash
npm run demo:video
```

## Proje yapısı

```text
.
├── cypress/
│   └── e2e/            # Cypress uçtan uca demo senaryoları
├── public/
│   └── manifest.json   # Chrome uzantısı manifest dosyası
├── src/
│   ├── App.tsx         # Uzantı arayüzü ve Gemini analiz akışı
│   ├── App.css         # Uzantı arayüzü stilleri
│   ├── content.ts      # Etkin sayfa metnini çıkaran içerik betiği
│   └── main.tsx        # React uygulamasının başlangıç noktası
├── index.html
└── vite.config.ts      # Arayüz ve içerik betiği derleme ayarları
```

## Kullanılan teknolojiler

- React ve TypeScript
- Vite
- Chrome Extensions Manifest V3
- Google Gemini API
- Zod ile model yanıtı şema doğrulaması
- Cypress ile uçtan uca demo testleri
- Oxlint
