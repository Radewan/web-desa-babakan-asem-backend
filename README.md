# 📦 Multi-Service Node.js Project Setup Guide

Panduan ini membantu kamu menyiapkan dan menjalankan seluruh service dalam proyek ini dengan benar.

---

## 🔧 Persiapan Awal

1. **Install dependencies di semua :**

   Jalankan perintah berikut **di setiap folder :**:

   ```bash
   npm install
   ```

2. **Ganti file `.example.env` jadi `.env`:**

   Di setiap folder, ubah nama file:

   ```bash
   mv .example.env .env
   ```

3. **Isi file `.env` dengan konfigurasi yang benar:**

   Contoh environment variable yang harus diisi:

   ```
   Kalo postgreesql
   - DATABASE_URL=postgresql://postgres:@localhost:5432/yourDatabase
   kalo mysql
    - DATABASE_URL=mysql://root:@localhost:3306/yourDatabase
   PORT=yourPort
   JWT_SECRET_KEY=yourSecretKey
   JWT_SECRET_KEY_RESET=yourSecretKeyReset
   EMAIL_USER=youremail@gmail.com
   EMAIL_PASS=your_app_password
   ```

   📌 **Catatan:**

   - Untuk `EMAIL_PASS`, buat App Password melalui link ini:  
     👉 https://myaccount.google.com/apppasswords  
     (Pastikan akun Gmail kamu sudah mengaktifkan verifikasi 2 langkah.)
   - Untuk database masing-masing berbeda setiap service

4. **Sesuaikan `PORT` di file `.env` sesuai dengan konfigurasi `gateway.config.yaml`:**

   Cek file berikut:

   ```
   api-gateway/config/gateway.config.yaml
   ```

   Pastikan port service kamu cocok agar tidak bentrok saat dijalankan bersama.

---

## ⚙️ Migrasi Database dengan Prisma

Jalankan perintah berikut di setiap service yang menggunakan database:

```bash
npx prisma migrate dev
```

---

## ⚒️ Build dan Jalankan Service

Setiap service perlu dibuild sebelum dijalankan.

1. **Build semua service:**

   ```bash
   npm run build
   ```

2. **Start semua service (kecuali `api-gateway`):**

   ```bash
   npm run start
   ```

3. **Start `api-gateway`:**

   Pindah ke folder `api-gateway` dan jalankan:

   ```bash
   npm start
   ```

---

## ✅ Selesai!

Sekarang semua service kamu seharusnya sudah jalan dengan baik.  
Kalau ada error saat `migrate`, `build`, atau `start`, periksa kembali konfigurasi `.env` dan port service-nya.

---

## 📬 Butuh Bantuan?

Kalau butuh bantuan lebih lanjut, jangan sungkan buat tanya.  
Dan ingat, ngoding itu bukan soal cepat-cepatan, tapi soal konsistensi. Semangat, pejuang bug! 🐛🚀
