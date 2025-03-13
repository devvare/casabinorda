import { Medicine } from "../types/medicine";

// Tüm ilaç verileri
export const medicines: Medicine[] = [
  { id: 1, name: "ZIAGEN", activeIngredient: "ABACAVIR", activeIngredientDescription: "HIV enfeksiyonunun tedavisinde kullanılır; virüsün çoğalmasını baskılar ve bağışıklığı korur. Genellikle antiretroviral kombinasyonlarla reçete edilir.", packaging: "300 MG 60 FILM-COATED TABLETS", manufacturer: "GLAXOSMITHKLINE", country: "CANADA", imageUrl: "" },
  { id: 2, name: "ORENCIA", activeIngredient: "ABATACEPT", activeIngredientDescription: "Romatoid artrit tedavisinde kullanılır; bağışıklık sistemini düzenleyerek eklem iltihabını azaltır. Otoimmün hastalıklarda semptomları hafifletir.", packaging: "125 MG 4 SOLUTION FOR INJECTION IN PRE-FILLED SYRINGES", manufacturer: "BRISTOL-MYERS SQUIBB", country: "PUERTO RICO", imageUrl: "" },
  { id: 3, name: "ORENCIA", activeIngredient: "ABATACEPT", activeIngredientDescription: "Romatoid artrit tedavisinde kullanılır; bağışıklık sistemini düzenleyerek eklem iltihabını azaltır. Otoimmün hastalıklarda semptomları hafifletir.", packaging: "250 MG POWDER FOR CONCENTRATE FOR SOLUTION FOR INFUSION", manufacturer: "BRISTOL-MYERS SQUIBB", country: "USA", imageUrl: "" },
  { id: 4, name: "CLOTINAB", activeIngredient: "ABCIXIMAB", activeIngredientDescription: "Kalp krizi veya anjiyoplasti sırasında kan pıhtılaşmasını önlemek için kullanılır. Damar tıkanıklığı riskini azaltan bir antitrombosit ajandır.", packaging: "10 MG 5 ML. VIAL", manufacturer: "DEM", country: "SOUTH KOREA", imageUrl: "" },
  { id: 5, name: "VERZENIOS", activeIngredient: "ABEMACICLIB", activeIngredientDescription: "Hormon reseptörü pozitif, HER2 negatif ileri veya metastatik meme kanseri tedavisinde kullanılır. Hücre bölünmesini engelleyerek tümör büyümesini yavaşlatır.", packaging: "100 MG 42 FILM-COATED TABLETS", manufacturer: "LILLY", country: "PUERTO RICO", imageUrl: "" },
  
  // Burada sadece ilk 5 ilaç gösterilmiştir
  // Gerçek uygulamada tüm ilaçlar burada listelenecektir
  // Performans nedeniyle dosyayı kısa tutuyoruz
  
  // Gerçek uygulamada mockMedicines.ts dosyasındaki tüm ilaçlar buraya taşınacaktır
]; 