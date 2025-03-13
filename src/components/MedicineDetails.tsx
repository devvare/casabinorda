import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Medicine } from '../types/medicine';
import { mockMedicines } from '../data/mockMedicines';

// Test resmi
const testImage = 'https://via.placeholder.com/150';

const MedicineDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (id) {
      const foundMedicine = mockMedicines.find(m => m.id === parseInt(id));
      setMedicine(foundMedicine || null);
    }
  }, [id]);

  if (!medicine) {
    return <div className="container mx-auto px-4 py-8">İlaç bulunamadı.</div>;
  }

  // Resim URL'sini oluştur
  const imageUrl = `/images/medicines/${medicine.id}.jpg`;
  console.log('Resim URL:', imageUrl);
  console.log('İlaç ID:', medicine.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4">{medicine.name}</h1>
        
        {/* Test resmi */}
        <div className="mb-4">
          <h3>Test Resmi (Placeholder):</h3>
          <img 
            src={testImage} 
            alt="Test Resmi" 
            className="w-48 h-48 object-cover rounded-lg mb-4"
          />
        </div>
        
        {/* Gerçek resim */}
        <div className="mb-4">
          <h3>İlaç Resmi (ID: {medicine.id}):</h3>
          <img 
            src={imageUrl} 
            alt={medicine.name} 
            className="w-48 h-48 object-cover rounded-lg mb-4"
            onError={(e) => {
              console.error('Resim yüklenirken hata:', imageUrl);
              setImageError(true);
            }}
          />
          {imageError && <p className="text-red-500">Resim yüklenemedi!</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">İlaç Bilgileri</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Etkin Madde:</span> {medicine.activeIngredient}</p>
              {medicine.activeIngredientDescription && (
                <p className="text-sm text-gray-600 mt-1">{medicine.activeIngredientDescription}</p>
              )}
              <p><span className="font-medium">Ambalaj:</span> {medicine.packaging}</p>
              <p><span className="font-medium">Üretici:</span> {medicine.manufacturer}</p>
              <p><span className="font-medium">Üretim Yeri:</span> {medicine.country}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetails; 