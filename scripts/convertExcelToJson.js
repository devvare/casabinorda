// Excel dosyasını JSON formatına dönüştüren betik
import xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname'i ES modüllerinde kullanabilmek için
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Excel dosyasının yolu (bu dosyayı scripts klasörüne koyabilirsiniz)
const excelFilePath = path.join(__dirname, 'medicines.xlsx');

// Çıktı JSON dosyasının yolu
const outputJsonPath = path.join(__dirname, 'medicines.json');

// Excel dosyasını oku
try {
  console.log('Excel dosyası okunuyor...');
  const workbook = xlsx.readFile(excelFilePath);
  
  // İlk çalışma sayfasını al
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  
  // Verileri JSON'a dönüştür
  const jsonData = xlsx.utils.sheet_to_json(worksheet);
  
  // Mevcut en yüksek ID'yi bul (mockMedicines.ts'deki son ilaç ID'si)
  const lastId = 45; // mockMedicines.ts dosyasındaki son ID
  
  // Verileri Medicine tipine dönüştür
  const medicines = jsonData.map((row, index) => {
    return {
      id: lastId + index + 1,
      name: row.name || row.NAME || row.İlaçAdı || row.ILAC_ADI || '',
      activeIngredient: row.activeIngredient || row.ACTIVE_INGREDIENT || row.EtkinMadde || row.ETKIN_MADDE || '',
      packaging: row.packaging || row.PACKAGING || row.Paketleme || row.PAKETLEME || '',
      manufacturer: row.manufacturer || row.MANUFACTURER || row.Üretici || row.URETICI || '',
      country: row.country || row.COUNTRY || row.Ülke || row.ULKE || ''
    };
  });
  
  // JSON dosyasına yaz
  fs.writeFileSync(outputJsonPath, JSON.stringify(medicines, null, 2));
  
  console.log(`Dönüştürme tamamlandı. ${medicines.length} ilaç JSON formatına dönüştürüldü.`);
  console.log(`Çıktı dosyası: ${outputJsonPath}`);
  
  // Nasıl kullanılacağına dair talimatlar
  console.log('\nBu JSON verisini mockMedicines.ts dosyasına eklemek için:');
  console.log('1. medicines.json dosyasını açın');
  console.log('2. İçeriğini kopyalayın');
  console.log('3. mockMedicines.ts dosyasındaki dizinin sonuna (son ilaçtan sonra) yapıştırın');
  console.log('4. Gerekirse virgülleri düzenleyin');
  
} catch (error) {
  console.error('Hata oluştu:', error);
} 