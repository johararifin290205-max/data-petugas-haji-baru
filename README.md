# Data Petugas Haji — GitHub Pages

## Upload
Upload seluruh isi ZIP ke root repository GitHub baru. Jangan upload ZIP sebagai satu file.

## Tambahkan PDF
Letakkan PDF asli di folder `pdf/` dengan nama persis sesuai properti `file` pada `daftar.json`. PDF asli tidak disertakan di ZIP ini karena belum diberikan pada percakapan ini.

## Aktifkan GitHub Pages
Repository → Settings → Pages → Build and deployment:
- Source: Deploy from a branch
- Branch: `main`
- Folder: `/(root)`
- Save

File `CNAME` disiapkan untuk domain `kemenhaj.com`. Pastikan pengaturan DNS domain sudah menunjuk ke GitHub Pages sebelum mengandalkannya.

## Menambahkan dokumen
Tambahkan PDF ke folder `pdf/`, lalu tambahkan objek ke `daftar.json`:
```json
{
  "judul": "Judul dokumen",
  "file": "nama-file.pdf",
  "namaUnduhan": "Nama-Unduhan.pdf"
}
```

## Catatan
Repository Public membuat PDF dapat diakses siapa pun yang mengetahui atau menemukan URL file. Tombol memakai atribut HTML `download`; browser biasanya mengunduh file saat tombol diklik, tetapi GitHub Pages tidak menyediakan header `Content-Disposition` untuk memaksa unduhan pada semua browser. Jangan simpan dokumen sensitif/terbatas di repository publik.
