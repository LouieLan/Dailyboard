# Dailyboard

Dailyboard adalah dashboard sederhana untuk mengelola tugas, mencatat catatan cepat, melihat cuaca, dan membaca kutipan harian dalam satu halaman.

## Fitur

- Menambahkan, mengedit, menghapus, dan menandai tugas sebagai selesai.
- Memfilter tugas berdasarkan status: semua, selesai, atau belum selesai.
- Mencari tugas dengan debounce 300 ms agar proses render tidak berjalan setiap kali tombol ditekan.
- Menambahkan, mengedit, dan menghapus catatan cepat.
- Menyimpan tugas dan catatan di `localStorage` browser.
- Mengambil informasi cuaca berdasarkan nama kota menggunakan OpenWeatherMap.
- Menampilkan kutipan dari Advice Slip API dan memuat ulang kutipan dengan tombol refresh.
- Mengganti tema terang dan gelap; pilihan tema disimpan di `localStorage`.
- Layout responsif untuk perangkat desktop dan mobile.

### Menggunakan fitur

- **Tugas:** masukkan tugas pada kolom input, lalu tekan **Tambah**. Klik tugas untuk mengubah status selesai. Klik dua kali untuk mengedit dan gunakan **Hapus** untuk menghapusnya.
- **Pencarian:** ketik kata kunci pada kolom **Cari tugas**. Daftar akan diperbarui setelah berhenti mengetik selama 300 ms.
- **Filter:** pilih **semua**, **selesai**, atau **belum** untuk menyaring daftar tugas.
- **Catatan cepat:** tulis catatan lalu tekan **Simpan**. Klik dua kali catatan untuk mengeditnya.
- **Cuaca:** masukkan nama kota lalu tekan **Cek Cuaca**. Fitur ini memerlukan koneksi internet.
- **Kutipan:** kutipan dimuat saat halaman dibuka. Tekan **Refresh kutipan** untuk mengambil kutipan baru.
- **Tema:** tekan tombol tema di bagian atas untuk beralih antara tema terang dan gelap.

## Struktur File

index.html    # Struktur halaman utama dan titik masuk aplikasi
style.css     # Tampilan, layout, tema, dan aturan responsif
tugas.js      # Store dan operasi data tugas
catatan.js    # Store dan operasi data catatan
storage.js    # Helper untuk localStorage dan preferensi tema
package.json  # Metadata dan konfigurasi proyek Node.js
README.md     # Dokumentasi proyek
