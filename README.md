# Paperflix REST APIs
REST APIs services for Paperflix application. This project was built using Node.js and Express framework to make an endpoint and handle the responses. This documentation will be separate by two section, first, the section for consumer or user(frontend developer), and second for developer who in charge in this project.

### Status Code Responsers**

#### Informational Responsers

Status Code | Name | Description
------------|------|------------
**100** | Continue | The server has received the request headers, and that the client should proceed to send the request body.
**101** | Switching Protocols | The requester has asked the server to switch protocols and the server is acknowledging that it will do so.
**102** | Processing | The server has received and is processing the request, but no response is available yet.

## Consumer
The documentation for consume this APIs.

### Authentication
Endpoints for manage authentication in Paperflix.

**Authentication Services**

No | Endpoint's Name | HTTP Method | HTTP Request | HTTP Status Code 
---|-----------------|-------------|--------------|-----------------
1 | **Register** | POST | /v1/register | 201, 405
2 | **Login** | POST | /v1/login | 200, 405
3 | **Logout** | POST | /v1/logout | 200