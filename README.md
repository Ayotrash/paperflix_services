# Paperflix REST APIs
Selamat datang di project Paperfix APIs. Project ini bertujuan untuk memberikan service endpoint yang akan mengatur lalu-lintas data di dalam aplikasi Paperflix. Service project dibangun menggunakan bahasa Javascript yang di jalankan oleh [Node JS](https://nodejs.org/en/) sebagai Javascript Engine di sisi server. Untuk framework sendiri, kami menggunakan [Express JS](https://expressjs.com/) yang sangat luar biasa dalam pembangunan semua [method HTTP requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods).

Berikut adalah list dari dokumentasi yang ada di project ini, untuk membantu kalian dalam menggunakan ataupun ikut berkontribusi dalam melakukan pengembangan di project ini;
1. [API Services Architecture](https://github.com/Ayotrash/paperflix_services/blob/master/docs/RESPONSERS.md)
2. [API Responsers](https://github.com/Ayotrash/paperflix_services/blob/master/docs/RESPONSERS.md)
3. [Consume The API](#consume-the-api)
     * [Authentication](#authentication)
     * [Users](#users)
     * Profile
4. Contributes to Development
     * Setup the project locally
     * Running The Project
     * Deployment
     * Project Structures

-------------------------------------------------------------------------------------

# Consume The API
Berikut adalah *endpoints* yang bisa kamu pergunakan dalam membangun frontend. Endpoints akan dikelompokan kedalam masing-masing *services*. Sehingga kamu bisa mencari endpoint yang kamu inginkan di service tersebut. Misalnya; kamu membutuhkan endpoint untuk mengedit data `users`, berarti kamu bisa mencari endpoint tersebut di service Users.

**Base URL**
Production: `https://ayotrust.com`
Development: `http://localhost:8080`

## Authentication
**Authentication Service** membantu kamu untuk melakukan beragam hal yang berurusan dengan *authentication* ataupun *authorization*. Ini adalah awal untuk kamu bisa mengakses semua sumber daya yang ada didalam project ini. Endpoint di service ini akan men-generate token ketika melakukan register atau login, untuk kamu bisa mengakses semua data atau memanggil endpoints lain.

Berikut adalah endpoints yang tersedia di **Authentication Service**;

No | Endpoint's Name | HTTP Method | HTTP Request | HTTP Status Code
---|-----------------|-------------|--------------|-----------------
1 | [Register](#register) | **`POST`** | /v1/register | 201, 409, 406, 500
2 | [Login](#login) | **`POST`** | /v1/login | 302, 401, 500
3 | [Logout](#logout) | **`POST`** | /v1/logout | 204, 500
4 | [Forgot Password](#forgot-password) | **`POST`** | /v1/forgot_password | 200, 500

#### Register
**Register Endpoint** akan membantun kamu untuk melakukan registrasi terhadap regular-user yang ada di Paperflix. Selain itu, *endpoint* ini akan memberikan return berupa `token` dan `id` dari user yang barusan di registrasi.

**Method & URL:** **`POST -> /v1/register`**

**Parameters:** No

**Query:** No

**Body:**
Name | Required | Description | Default Value | Example
-----|----------|-------------|---------------|--------
**firstname** | required | Nama depan dari regular-user. Tipe datanya adalah `string`. | - | `Fuadit`
**lastname** | required | Nama belakang dari regular-user. Tipe datanya adalah `string`. | - | `Muhammad`
**email** | required | Email dari regular-user. Ini tidak bisa di fake karena sudah menggunakan plugin dari [Postmark](https://postmarkapp.com/loves/node). Tipe datanya adalah `string`. | - |  `fuadit@email.com`
**password** | required | Tipe datanya adalah `string`, dan password akan di hashing menggunakan bcrypt. Proses dari hashing password akan dilakukan di backend. | - | `12345`
**gender** | required | Tipe data dari gender adalah **Enum**. Enum nya adalah `("male", "female")`. | - | `male`
**avatar** | optional | Tipe data nya adalah `string`. Yang dimana string nya berupa id yang mereferensikan pada chunk file yang ada di table `avatars`. File avatar akan di proses melalui backend menggunakan engine [GridFS dari MongoDB](https://docs.mongodb.com/manual/core/gridfs/). | `paperflix-avatar.jpg` | `5dd3f241ab7fe202027a1a60`
**device_name** | required | Nama device yang didapatkan dari plugin yang digunakan di frontend. | - | `Xiaomi Mi Max`
**device_id** | required | Tipe data adalah `string` dan `unique`. Apabila ada `id` yang terduplikat, sistem backend akan otomatis mereplace device yang tersedia di database dengan akun yang baru. | - | `00000000-89ABCDEF-01234567-89ABCDEF`

**Success Responses:**
```javascript
{
    "statusCode": 201,
    "error": false,
    "message": "Welcome Elsa, don't forget to confirmation your email.",
    "data": {
        "user_id": "5dd2334d6ce25d2e61cf22cf",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im11aGFtbWFkZnVhZGl0QGdtYWlsLmNvbSIsInVzZXJJZCI6IjVkZDIzMzRkNmNlMjVkMmU2MWNmMjJjZiIsImlhdCI6MTU3NDA1Njc4MSwiZXhwIjoxNTc0MDY3NTgxfQ.4b2YQE8VJ09eBuSIdkce5d6tEkf6H9yw3CNT3VGkXuM"
    }
}
```

**Error Responses:**
```javascript
{
    "statusCode": 409,
    "error": true,
    "message": "muhammadfuaditrockz@gmail.com has already exist."
}

// OR

{
    "statusCode": 406,
    "error": true,
    "message": "Last name is required."
}
```