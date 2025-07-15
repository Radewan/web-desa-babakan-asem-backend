jalankan npm install di setiap folder
Ganti Semua .example.env jadi .env
Isi .env dengan benar
Untuk yang port sesuaikan dengan gateway.config.yaml yang ada di api-gateway/config
EMAIL_USER=#email
EMAIL_PASS=#buat password di https://myaccount.google.com/u/2/apppasswords
jalankan npx prisma migrate dev di setiap service
jalankan npm run build di setiap service
jalankan npm run start di setiap service
jalankan npm start di api-gateway
