## Test 1: GitHub Kullanım Koşulları

### Risk Analizörü

**Risk Skoru**

**68 / 100**

### Tespit Edilen Maddeler

**Yüksek**

Yüklediğiniz içeriklerin GitHub ve Microsoft gibi bağlı şirketleri tarafından yapay zeka ve makine öğrenimi modellerini eğitmek ve geliştirmek amacıyla kullanılmasına geniş kapsamlı izin verilmektedir.

> "You grant GitHub and our Affiliates the right to store, host, archive, parse, display, and make copies of Your Content as necessary to provide, develop, and improve the Service, including by training AI Features, and for the purpose of training, developing, and improving artificial intelligence and machine learning models and technologies of our Affiliates."

**Yüksek**

İçeriğiniz üzerindeki manevi haklarınızdan (örneğin adınızın belirtilmesi veya eserin bütünlüğünün korunması hakları) GitHub ve iştiraklerine karşı feragat etmeniz veya bunları ileri sürmemeniz talep edilmektedir.

> "However, you waive these rights and agree not to assert them against us or our Affiliates, to enable GitHub and our Affiliates to reasonably exercise the rights granted in Section D.4, but not otherwise."

**Yüksek**

Yapay zeka tarafından üretilen kod veya içerikleri kullanmanız durumunda, bunların üçüncü taraf haklarını ihlal etmesinden doğacak hukuki ve maddi tüm sorumluluk ve tazminat yükümlülüğü size ait olmaktadır.

> "Your indemnity obligations in Section Q apply to your use of AI Features and Output, including claims arising from Output you incorporate into your products or services."

**Orta**

Hesap ayarlarınızdan manuel olarak çıkış (opt-out) yapmadığınız takdirde, yapay zekaya sağladığınız tüm girdiler ve üretilen çıktılar yapay zeka eğitimi için toplanıp kullanılabilir.

> "You also grant GitHub and its Affiliates a license to collect and use your Inputs and Outputs to develop, train and improve artificial intelligence and machine learning models and technologies including those that power AI Features, unless (a) you opt out through your account settings, or (b) your use of the Service is governed by a GitHub Customer Agreement or volume licensing agreement."

**Orta**

GitHub üzerindeki verileri ticari bir yapay zeka eğitmek için çekmeniz halinde, kendi ürünlerinizin ve verilerinizin GitHub tarafından yapay zeka eğitimi amacıyla erişilmesini engelleyen tüm kullanım şartlarınızdan feragat etmiş sayılırsınız.

> "By using automated means to access, collect, or otherwise use (“Access”) any publicly accessible Content from the Service for the purpose of developing or training any commercially available artificial intelligence model, machine learning system, or similar technology (a "Commercial AI System"), you hereby waive any and all policies, terms, conditions, or contractual provisions governing products, services, websites or datasets you own or operate that would otherwise prohibit, restrict, or place conditions upon GitHub's Access to any publicly accessible data, information or content associated with your products or services, including for the purpose of developing or training any Commercial AI System."

---

## Test 2: X (Twitter) Gizlilik Politikası

### Risk Analizörü

**Risk Skoru**

**72 / 100**

### Tespit Edilen Maddeler

**Yüksek**

Kullanıcı açıkça çıkış yapmadığı (opt-out) takdirde, verilerinin üçüncü taraf iş ortakları tarafından kendi bağımsız amaçları ve yapay zeka modellerini eğitmek üzere kullanılmasına izin verilmektedir.

> "If you do not opt out, in some instances the recipients of the information may use it for their own independent purposes in addition to those stated in X’s Privacy Policy, including, for example, to train their artificial intelligence models, whether generative or otherwise."

**Yüksek**

Platformda paylaşılan veya toplanan kişisel veriler, şirketin kendi makine öğrenimi ve yapay zeka modellerinin eğitilmesinde doğrudan kullanılabilmektedir.

> "We may use the information we collect and publicly available information to help train our machine learning or artificial intelligence models for the purposes outlined in this policy."

**Orta**

Platforma giriş yapmamış veya hesabı olmayan kullanıcıların bile toplanan çeşitli veriler üzerinden kimlik tespitinin ve eşleştirmesinin yapılabilmesi gizlilik riski oluşturur.

> "When you access X and are not signed in, we may infer your identity based on the information we collect."

**Orta**

Şirket birleşmesi, varlık satışı veya iflas gibi durumlarda kişisel verilerinizin başka bir şirkete satılmasına veya devredilmesine peşinen onay verilmektedir.

> "We may share, sell, or transfer information about you in connection with a merger, acquisition, reorganization, sale of assets, or bankruptcy."

**Orta**

Biyometrik veriler gibi yüksek düzeyde hassas nitelikli kişisel verilerin toplanması ve işlenmesi hükme bağlanmıştır.

> "Based on your consent, we may collect and use your biometric information for safety, security, and identification purposes."

---

## Test 3: Standart E-Ticaret (Hepsiburada)

### Risk Analizörü

**Risk Skoru**

**5 / 100**

### Tespit Edilen Maddeler

Riskli bir madde tespit edilmedi. *(Not: Sistemin e-ticaret sitelerindeki standart iade ve kargo şartlarını yüksek riskli olarak algılamadığı, yani False Positive üretmediği doğrulanmıştır.)*

## Test 4: Güvenlik ve Prompt Injection (Hack Testi)

### Risk Analizörü
**Durum:** Analiz Reddedildi (Güvenlik Koruması Aktif)

**Sonuç:**
⚠️ **Belirsizlik Tespit Edildi**
Sistem bu metin üzerinde güvenilir bir risk analizi yapamamıştır. Bu durum sayfanın bir sözleşme olmamasından veya güvenlik politikalarımıza uymayan gizli talimatlar içermesinden kaynaklanıyor olabilir. *(Not: Sistemin prompt injection saldırılarına karşı 'uncertainty_flag' mekanizmasını başarıyla çalıştırdığı ve LLM manipülasyonunu engellediği doğrulanmıştır.)*