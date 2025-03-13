// Etkin madde açıklamalarını ing.xlsx dosyasından okuyup mockMedicines.ts dosyasına ekleyen betik
import xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname'i ES modüllerinde kullanabilmek için
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Excel dosyasının yolu
const excelFilePath = path.join(__dirname, 'ing.xlsx');

// mockMedicines.ts dosyasının yolu
const mockMedicinesPath = path.join(__dirname, '../src/data/mockMedicines.ts');

try {
  console.log('Etkin madde açıklamaları Excel dosyası okunuyor...');
  const workbook = xlsx.readFile(excelFilePath);
  
  // İlk çalışma sayfasını al
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  
  // Verileri JSON'a dönüştür
  const rawData = xlsx.utils.sheet_to_json(worksheet);
  
  console.log(`Excel dosyasında ${rawData.length} etkin madde açıklaması bulundu.`);
  
  // İlk birkaç satırı göster
  console.log('İlk 3 satır:');
  console.log(JSON.stringify(rawData.slice(0, 3), null, 2));
  
  // Sütun adlarını bul
  if (rawData.length > 0) {
    console.log('Sütun adları:');
    console.log(Object.keys(rawData[0]));
  }
  
  // Açıklamaları etkin maddelere göre eşleştir
  const descriptionMap = new Map();
  
  // Excel dosyasındaki sütun adlarını belirle
  const activeIngredientColumn = ' Aktif Madde                                      ';
  const descriptionColumn = ' Kullanım Alanı ve Rahatsızlıklar                                                                 ';
  
  console.log('Kullanılacak sütun adları:');
  console.log('Etkin Madde:', activeIngredientColumn);
  console.log('Açıklama:', descriptionColumn);
  
  rawData.forEach(row => {
    if (row[activeIngredientColumn] && row[descriptionColumn]) {
      const activeIngredient = row[activeIngredientColumn].toString().trim().toUpperCase();
      const description = row[descriptionColumn].toString().trim()
        .replace(/"/g, '\\"') // Çift tırnakları escape et
        .replace(/\n/g, ' '); // Satır sonlarını temizle
      
      descriptionMap.set(activeIngredient, description);
    }
  });
  
  console.log(`${descriptionMap.size} benzersiz etkin madde açıklaması işlendi.`);
  
  // Birkaç örnek göster
  console.log('Örnek açıklamalar:');
  let count = 0;
  for (const [key, value] of descriptionMap.entries()) {
    console.log(`${key}: ${value.substring(0, 50)}...`);
    count++;
    if (count >= 3) break;
  }
  
  // mockMedicines.ts dosyasını oku
  console.log('mockMedicines.ts dosyası okunuyor...');
  const mockMedicinesContent = fs.readFileSync(mockMedicinesPath, 'utf8');
  
  // Regex ile tüm ilaçları bul
  const medicineRegex = /{\s*id:\s*(\d+),\s*name:\s*"([^"]*)",\s*activeIngredient:\s*"([^"]*)",\s*activeIngredientDescription:\s*"([^"]*)",\s*packaging:\s*"([^"]*)",\s*manufacturer:\s*"([^"]*)",\s*country:\s*"([^"]*)",\s*imageUrl:\s*"([^"]*)"\s*}/g;
  
  let updatedContent = mockMedicinesContent;
  let match;
  let updateCount = 0;
  
  // Her ilaç için açıklama ekle
  while ((match = medicineRegex.exec(mockMedicinesContent)) !== null) {
    const [fullMatch, id, name, activeIngredient, currentDescription, packaging, manufacturer, country, imageUrl] = match;
    
    // Etkin madde için açıklama bul
    const description = descriptionMap.get(activeIngredient.trim().toUpperCase());
    
    if (description && currentDescription !== description) {
      // Yeni ilaç bilgisi oluştur
      const updatedMedicine = `{ id: ${id}, name: "${name}", activeIngredient: "${activeIngredient}", activeIngredientDescription: "${description}", packaging: "${packaging}", manufacturer: "${manufacturer}", country: "${country}", imageUrl: "${imageUrl}" }`;
      
      // İçeriği güncelle
      updatedContent = updatedContent.replace(fullMatch, updatedMedicine);
      updateCount++;
    }
  }
  
  // Dosyayı güncelle
  if (updateCount > 0) {
    fs.writeFileSync(mockMedicinesPath, updatedContent);
    console.log(`Güncelleme tamamlandı. ${updateCount} ilaç kaydına açıklama eklendi.`);
  } else {
    console.log('Güncellenecek açıklama bulunamadı.');
  }
  
} catch (error) {
  console.error('Hata oluştu:', error);
} 