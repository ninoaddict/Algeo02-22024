# Algeo02-22024
Tugas Besar 2 IF2123 Algeo

## Anggota Kelompok
Kristo Anugrah                 (13522024) <br/>
Adril Putra Merin              (13522068) <br/>
Berto Richardo Togatorop       (13522118) <br/>

## Deskripsi Tugas
Di dalam Tugas Besar 2 ini, mahasiswa diminta untuk mengimplementasikan sistem temu balik gambar yang sudah dijelaskan sebelumnya dengan memanfaatkan Aljabar Vektor dalam bentuk sebuah website, dimana hal ini merupakan pendekatan yang penting dalam dunia pemrosesan data dan pencarian informasi. Dalam konteks ini, aljabar vektor digunakan untuk menggambarkan dan menganalisis data menggunakan pendekatan klasifikasi berbasis konten (Content-Based Image Retrieval atau CBIR), di mana sistem temu balik gambar bekerja dengan mengidentifikasi gambar berdasarkan konten visualnya, seperti warna dan tekstur.

## Struktur File
Direktori tugas besar ini memiliki struktur file sebagai berikut:
```shell
.
│   README.md
│
├───img                                 # screenshot hasil uji coba program serta image yang digunakan            
├───doc                                 # Laporan tugas besar (dokumentasi)
├───src                                 # Source code tugas besar
│   ├───api
|   |      cpp
|   |      ...
│   └───client
│          public
│          ...
└───test                                # gambar masukan untuk pengujian
        test1.jpg
        test2.jpg
        ...   
```
## Dependensi
* C++17 ke atas
* Python 3 ke atas
* Modul selenium, requests pada Python
* npm 10.1.0 ke atas

## Cara Menjalankan Program
1. Konfigurasikan semua dependensi yang diperlukan
2. Jalankan perintah 'npm start' pada Algeo02-22024/src/client dan pada Algeo02-22024/src/api
3. Ketik 'localhost:3000' di browser pilihan Anda
4. Klik tombol 'Try Now' di Home page
5. Upload dataset dan gambar kueri, kemudian pilih parameter pencarian
6. Klik 'search'
