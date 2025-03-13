import xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Excel dosyasını oku
const excelPath = path.join(__dirname, 'medicines.xlsx');
const workbook = xlsx.readFile(excelPath);
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

// Ham verileri al
const rawData = xlsx.utils.sheet_to_json(worksheet, { raw: true });
console.log(`Excel dosyası okundu. Toplam ${rawData.length} satır bulundu.`);

// İlk satırı kontrol et
console.log('\nİlk satır:', rawData[0]);

// Verileri işle
const medicines = rawData.map((row, index) => {
  const medicine = {
    id: index + 1,
    name: row['BRAND NAME'] || '',
    activeIngredient: row['ACTIVE INGREDIENT'] || '',
    activeIngredientDescription: '',
    packaging: row['PACKAGE SIZE'] || '',
    manufacturer: row['MANUFACTURER'] || '',
    country: row['ORIGIN'] || '',
    imageUrl: ''
  };

  return medicine;
});

// İlk 3 ilaç kaydını göster
console.log('\nİlk 3 ilaç kaydı:');
medicines.slice(0, 3).forEach(medicine => console.log(medicine));

// Yeni içeriği oluştur
const medicinesJson = medicines.map(medicine => {
  return `  { id: ${medicine.id}, name: "${medicine.name}", activeIngredient: "${medicine.activeIngredient}", activeIngredientDescription: "${medicine.activeIngredientDescription}", packaging: "${medicine.packaging}", manufacturer: "${medicine.manufacturer}", country: "${medicine.country}", imageUrl: "${medicine.imageUrl}" }`;
}).join(',\n');

const newContent = `import { Medicine } from "../types/medicine";

// Mock data - Excel'den aktarılan ilaç verileri
export const mockMedicines: Medicine[] = [
${medicinesJson}
];`;

// mockMedicines.ts dosyasını güncelle
const mockMedicinesPath = path.join(__dirname, '..', 'src', 'data', 'mockMedicines.ts');
fs.writeFileSync(mockMedicinesPath, newContent);

console.log(`\nGüncelleme tamamlandı. ${medicines.length} ilaç kaydı güncellendi.`);