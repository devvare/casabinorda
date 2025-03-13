# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/b453f157-2290-4653-a501-6acf348ba1b3

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/b453f157-2290-4653-a501-6acf348ba1b3) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/b453f157-2290-4653-a501-6acf348ba1b3) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

## E-posta Gönderme Özelliği

Uygulama, iki farklı bölümde e-posta gönderme özelliği sunmaktadır:

1. **Teklif Talebi Gönderme**: Kullanıcılar, talep listesindeki ilaçlar için teklif talebini e-posta olarak gönderebilir.
2. **İletişim Formu**: Kullanıcılar, iletişim sayfasındaki form aracılığıyla genel sorular veya talepler için mesaj gönderebilir.

Her iki özellik de [FormSubmit](https://formsubmit.co/) servisi kullanılarak gerçekleştirilmiştir. FormSubmit, herhangi bir hesap oluşturmadan veya arka uç kodu yazmadan form verilerini e-posta olarak almanızı sağlayan ücretsiz bir servistir.

### FormSubmit Kurulumu

1. `src/components/cart/CartPanel.tsx` ve `src/components/Contact.tsx` dosyalarındaki form etiketlerinde bulunan `action` özelliğini kendi e-posta adresinizle güncelleyin:

```tsx
<form 
  action="https://formsubmit.co/your-email@example.com" 
  method="POST"
  ...
>
```

2. İlk form gönderiminden sonra, FormSubmit size bir aktivasyon e-postası gönderecektir. Bu e-postadaki aktivasyon bağlantısına tıklayarak form gönderimlerini almaya başlayabilirsiniz.

3. Daha fazla özelleştirme için FormSubmit'in [resmi dokümantasyonunu](https://formsubmit.co/) inceleyebilirsiniz.

### Form Yapılandırması

Her iki formda da aşağıdaki gizli alanlar kullanılmıştır:

```html
<input type="hidden" name="_subject" value="Yeni Teklif Talebi" />
<input type="hidden" name="_captcha" value="false" />
<input type="hidden" name="_template" value="table" />
```

Bu alanlar:
- `_subject`: Alınan e-postanın konu satırını belirler
- `_captcha`: CAPTCHA doğrulamasını devre dışı bırakır (isteğe bağlı olarak etkinleştirilebilir)
- `_template`: E-posta içeriğinin tablo formatında görüntülenmesini sağlar

### Formların İçeriği

#### Teklif Talebi Formu
- Gönderenin adı
- E-posta adresi
- Telefon numarası
- Notlar
- Talep edilen ilaçların listesi

#### İletişim Formu
- Gönderenin adı ve soyadı
- E-posta adresi
- Telefon numarası
- Mesaj
