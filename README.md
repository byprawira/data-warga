# Data Warga - Apps Script Web App

Aplikasi denah interaktif untuk membaca data warga dari Google Spreadsheet.

## Struktur
- `Code.gs` : backend Google Apps Script
- `Index.html` : frontend web app

## Cara pakai
1. Buka Google Apps Script
2. Buat project baru
3. Tambahkan file `Code.gs` dan `Index.html`
4. Paste kode dari repository ini
5. Ubah `SPREADSHEET_ID` dan `SHEET_NAME` bila perlu
6. Deploy sebagai Web App

## Catatan
Web app ini memakai `google.script.run`, jadi frontend harus dijalankan dari Apps Script, bukan dari GitHub Pages biasa.
