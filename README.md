# Portfolio Trio Prawiro Negoro (lokal)

## Menjalankan
```bash
npm install
npm run dev
```
Buka http://localhost:5173

## Deploy ke Vercel
Proyek ini menggunakan Vite. Pengaturan build Vercel:
- Framework Preset: **Vite**
- Root Directory: `.` (jika isi folder `portfolio` menjadi root repository)
- Build Command: `npm run build`
- Output Directory: `dist`

Cara deploy:
1. Buat repository GitHub baru, lalu unggah isi folder proyek ini. Repository boleh private.
2. Di Vercel, pilih **Add New → Project**, hubungkan GitHub, lalu impor repository tersebut.
3. Pastikan pengaturan build di atas benar, kemudian pilih **Deploy**.
4. Setelah deployment berhasil, uji alamat `*.vercel.app` yang diberikan Vercel.
5. Di proyek Vercel, buka **Settings → Domains**, tambahkan `portotrio.my.id` dan `www.portotrio.my.id`.
6. Di Domainesia, buka pengaturan DNS domain dan tambahkan/perbarui record sesuai nilai yang ditampilkan Vercel. Jangan mengubah nameserver atau menghapus record email yang sudah ada kecuali memang diperlukan.
7. Tunggu sampai status domain di Vercel terverifikasi dan sertifikat HTTPS aktif. Jika nameserver domain menggunakan provider lain, perubahan DNS dilakukan di provider nameserver tersebut.

Sebelum repository dibuat publik, periksa kembali data portofolio dan file CV agar tidak ada informasi yang tidak ingin dibagikan. Data yang tersimpan di `localStorage` browser lokal tidak otomatis ikut ter-deploy; gunakan **Export Backup** di situs lokal, lalu **Import Backup** di situs Vercel jika ingin memindahkannya.

## Fitur tambah data
Tombol **Add ...** ada di section Skills, Projects, Lab & Docs, Experience, dan Certifications.
Tombol hapus (ikon tempat sampah) muncul di tiap item (untuk Skills muncul saat di-hover).

Data tersimpan di localStorage browser. Di footer ada:
- **Export Backup**: unduh semua data jadi file JSON
- **Import Backup**: pulihkan dari file JSON
- **Reset ke Contoh**: kembalikan ke data contoh awal

Catatan: localStorage terikat ke browser dan alamat (localhost:5173). Ganti browser/port = data kosong, jadi rutin Export Backup.

## Yang perlu kamu ganti
Data contoh awal (perusahaan, periode, angka hasil uji, credential ID, email/LinkedIn/GitHub) adalah placeholder.
Hapus atau ganti dengan data aslimu sebelum portofolio dibagikan.

## Struktur kode
- Bagian halaman ada di `src/components/sections/` (Home, About, Skills, Projects, Lab, Experience, Certifications, Contact, dan Footer).
- State, penyimpanan data, serta logika utama ada di `src/App.jsx`.
- CV PDF saat ini ada di `public/cv/CV_Trio.pdf`; tombol **Download PDF Resume** akan mengunduh file tersebut. Jika nama file diganti, sesuaikan juga tautannya di `src/components/sections/CertificationsSection.jsx`.
- Letakkan gambar statis di `public/images/`, lalu gunakan path seperti `/images/nama-gambar.jpg` pada properti `image` di data Lab (`LAB_DEFAULT` dalam `src/App.jsx`).
- Gambar yang ditambahkan melalui formulir Lab disimpan di `localStorage` browser, bukan di folder proyek. Untuk memasukkan gambar ke proyek, salin file ke `public/images/` dan gunakan path publiknya.
- Data contoh hanya dipakai jika belum ada data tersimpan di browser. Untuk melihat perubahan `LAB_DEFAULT` pada browser yang sudah pernah dipakai, pilih **Reset ke Contoh** di footer.
