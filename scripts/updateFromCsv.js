// CSV dosyasından ilaç verilerini mockMedicines.ts dosyasına ekleyen betik
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { fileURLToPath } from 'url';

// __dirname'i ES modüllerinde kullanabilmek için
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CSV dosyasının yolu (bu dosyayı scripts klasörüne koyabilirsiniz)
const csvFilePath = path.join(__dirname, 'medicines.csv');

// mockMedicines.ts dosyasının yolu
const mockMedicinesPath = path.join(__dirname, '../src/data/mockMedicines.ts');

try {
  console.log('CSV dosyası okunuyor...');
  const csvContent = fs.readFileSync(csvFilePath, 'utf8');
  
  // CSV'yi parse et
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true
  });
  
  // mockMedicines.ts dosyasını oku
  const mockMedicinesContent = fs.readFileSync(mockMedicinesPath, 'utf8');
  
  // Mevcut en yüksek ID'yi bul
  const idRegex = /id: (\d+)/g;
  let match;
  let highestId = 0;
  
  while ((match = idRegex.exec(mockMedicinesContent)) !== null) {
    const id = parseInt(match[1], 10);
    if (id > highestId) {
      highestId = id;
    }
  }
  
  console.log(`Mevcut en yüksek ID: ${highestId}`);
  
  // Verileri Medicine tipine dönüştür
  const newMedicines = records.map((row, index) => {
    return `  { id: ${highestId + index + 1}, name: "${(row.name || row.NAME || row.İlaçAdı || row.ILAC_ADI || '').replace(/"/g, '\\"')}", activeIngredient: "${(row.activeIngredient || row.ACTIVE_INGREDIENT || row.EtkinMadde || row.ETKIN_MADDE || '').replace(/"/g, '\\"')}", category: "${(row.category || row.CATEGORY || row.Kategori || row.KATEGORI || '').replace(/"/g, '\\"')}", packaging: "${(row.packaging || row.PACKAGING || row.Paketleme || row.PAKETLEME || '').replace(/"/g, '\\"')}", manufacturer: "${(row.manufacturer || row.MANUFACTURER || row.Üretici || row.URETICI || '').replace(/"/g, '\\"')}", country: "${(row.country || row.COUNTRY || row.Ülke || row.ULKE || '').replace(/"/g, '\\"')}" }`;
  }).join(',\n');
  
  // mockMedicines.ts dosyasını güncelle
  const updatedContent = mockMedicinesContent.replace(
    /];(\s*)$/,
    `,\n  // CSV'den eklenen yeni ilaçlar - ${new Date().toLocaleDateString()}\n${newMedicines}\n];$1`
  );
  
  // Dosyayı yaz
  fs.writeFileSync(mockMedicinesPath, updatedContent);
  
  console.log(`Güncelleme tamamlandı. ${records.length} ilaç mockMedicines.ts dosyasına eklendi.`);
  
} catch (error) {
  console.error('Hata oluştu:', error);
} 