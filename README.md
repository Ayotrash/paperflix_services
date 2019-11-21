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
```javascript
{
    "firstname": "Elsa",
    "lastname": "Power",
	"email": "elsa_power@gmail.com",
	"password": "12345",
	"gender": "male",
	"avatar": "anakpadang.jpg",
	"device_info": {
		"name": "Xiaomi Mi Max"
	}
}
```

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