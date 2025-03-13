# İlaç Veri Yükleme Betikleri

Bu klasördeki betikler, Excel veya CSV formatındaki ilaç verilerini mockMedicines.ts dosyasına eklemek için kullanılır.

## Gerekli Bağımlılıklar

Betikleri kullanmadan önce gerekli bağımlılıkları yükleyin:

```bash
npm install xlsx csv-parse
```

## Kullanım

### Excel'den İlaç Verilerini Yükleme

1. Excel dosyanızı `medicines.xlsx` adıyla bu klasöre kopyalayın
2. Aşağıdaki komutu çalıştırın:

```bash
node updateMockMedicines.js
```

### CSV'den İlaç Verilerini Yükleme

1. CSV dosyanızı `medicines.csv` adıyla bu klasöre kopyalayın
2. Aşağıdaki komutu çalıştırın:

```bash
node updateFromCsv.js
```

### Excel'i JSON'a Dönüştürme

Excel dosyanızı JSON formatına dönüştürmek isterseniz:

```bash
node convertExcelToJson.js
```

## Excel/CSV Dosya Formatı

Excel veya CSV dosyanızın aşağıdaki sütunlardan en az birini içermesi gerekir:

- `name` veya `NAME` veya `İlaçAdı` veya `ILAC_ADI`
- `activeIngredient` veya `ACTIVE_INGREDIENT` veya `EtkinMadde` veya `ETKIN_MADDE`

Diğer desteklenen sütunlar:
- `category` veya `CATEGORY` veya `Kategori` veya `KATEGORI`
- `packaging` veya `PACKAGING` veya `Paketleme` veya `PAKETLEME`
- `manufacturer` veya `MANUFACTURER` veya `Üretici` veya `URETICI`
- `country` veya `COUNTRY` veya `Ülke` veya `ULKE`

## Notlar

- Betikler otomatik olarak mevcut en yüksek ID'yi bulur ve yeni ilaçlara sıralı ID'ler atar
- Çift tırnak karakterleri otomatik olarak kaçırılır
- Eklenen ilaçlar, tarih bilgisiyle birlikte mockMedicines.ts dosyasının sonuna eklenir 