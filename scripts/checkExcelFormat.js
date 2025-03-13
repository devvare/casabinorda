// Excel dosyasının formatını kontrol eden betik
import xlsx from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname'i ES modüllerinde kullanabilmek için
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Excel dosyasının yolu
const excelFilePath = path.join(__dirname, 'medicines.xlsx');

try {
  console.log('Excel dosyası okunuyor...');
  const workbook = xlsx.readFile(excelFilePath);
  
  // İlk çalışma sayfasını al
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  
  // Verileri JSON'a dönüştür
  const jsonData = xlsx.utils.sheet_to_json(worksheet);
  
  console.log(`Excel dosyasında ${jsonData.length} satır bulundu.`);
  
  if (jsonData.length > 0) {
    console.log('İlk satırın sütun başlıkları:');
    console.log(Object.keys(jsonData[0]));
    
    console.log('\nİlk 3 satırın içeriği:');
    for (let i = 0; i < Math.min(3, jsonData.length); i++) {
      console.log(`Satır ${i + 1}:`, jsonData[i]);
    }
  } else {
    console.log('Excel dosyası boş veya okunamadı.');
  }
  
} catch (error) {
  console.error('Hata oluştu:', error);
} 