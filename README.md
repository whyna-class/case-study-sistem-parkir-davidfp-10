# 🚗 Parkiran API — NestJS + Prisma + MySQL

API ini dibuat untuk mengelola data parkir kendaraan. Mulai dari mencatat kendaraan masuk, menghitung total tarif otomatis, hingga mendapatkan total pendapatan keseluruhan. Proyek ini cocok sebagai latihan backend CRUD, query filtering, serta implementasi Prisma ORM.

---

## ✨ Fitur Utama

* Create, Show All, Show by Id
* Hitung **total tarif otomatis** berdasarkan durasi & jenis kendaraan
* **Search**, **Filter**, dan **Pagination** pada data parkir
* Endpoint untuk **menghitung total pendapatan**
* Terintegrasi dengan **NestJS**, **Prisma ORM**, dan **MySQL**

---

## 🛠️ Teknologi yang Digunakan

* **NestJS** — Backend framework
* **Prisma ORM** — Database ORM
* **MySQL** — Database
* **Postman** — Testing API

---

# 🧩 Struktur Data (Schema Prisma)

```prisma
model Parkir {
  id              Int              @id @default(autoincrement())
  plat_nomor      String
  jenis_kendaraan JenisKendaraan
  durasi          Int
  totalTarif      Int
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

enum JenisKendaraan {
  roda2
  roda4
}
```

---

# 📡 Endpoint API

## 🔵 1. **Create Parkir**

**POST /parkir**

![](images/add%20parkir.png)

---

## 🟢 2. **Get All Parkir (Search + Filter + Pagination)**

**GET /parkir**

![](images/show%20all.png)

---

## 🟡 3. **Get Parkir by ID**

![](images/show%20by%20id.png)

---

## 🟣 4. **Total Pendapatan**

![](images/total%20pendapatan.png)

---

# 🔍 Contoh Search, Filter, Pagination

![](images/contoh%20search,dll.png)

---

# ✔️ Kesimpulan

Project ini merupakan API parkiran sederhana namun lengkap, dengan fitur tarif otomatis, total pendapatan, search, filter, pagination, dan arsitektur bersih menggunakan NestJS + Prisma.