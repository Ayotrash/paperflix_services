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

## Consume The API
The documentation for consume this APIs.

### Authentication
Endpoints for manage authentication in Paperflix.

No | Endpoint's Name | HTTP Method | HTTP Request | HTTP Status Code
---|-----------------|-------------|--------------|-----------------
1 | **Register** | POST | /v1/register | 201, 409, 406, 500
2 | **Login** | POST | /v1/login | 302, 401, 500
3 | **Logout** | POST | /v1/logout | 204, 500

#### Register

An endpoint for make a new user or register new account.

**`POST` /v1/register**

Extension Name | Required | Details
---------------|----------|--------
URL Params | No | -
Data Params | No | -
URL Query | No | -

Request Body
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

Success Response
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

Error Response
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