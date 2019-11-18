# Paperflix REST APIs
REST APIs services for Paperflix application. This project was built using Node.js and Express framework to make an endpoint and handle the responses. This documentation will be separate by two section, first, the section for consumer or user(frontend developer), and second for developer who in charge in this project.

### Status Code Responsers

#### Informational Responsers

Status Code | Name | Description
------------|------|------------
**100** | Continue | The server has received the request headers, and that the client should proceed to send the request body.
**101** | Switching Protocols | The requester has asked the server to switch protocols and the server is acknowledging that it will do so.
**102** | Processing | The server has received and is processing the request, but no response is available yet.

#### Success Responsers

Status Code | Name | Description
------------|------|------------
**200** | OK | The standard response for successful HTTP requests.
**201** | Created | The request has been fulfilled and a new resource has been created.
**202** | Accepted | The request has been accepted but has not been processed yet. This code does not guarantee that the request will process successfully.
**203** | Non-authoritative information | HTTP 1.1. The server successfully processed the request but is returning information from another source.
**204** | No Content | The server accepted the request but is not returning any content. This is often used as a response to a `DELETE` request.
**205** | Reset Content | Similar to a `204 No Content` response but this response requires the requester to reset the document view.
**206** | Partial Content | The server is delivering only a portion of the content, as requested by the client via a range header.
**207** | Multi-status | The message body that follows is an XML message and can contain a number of separate response codes, depending on how many sub-requests were made.
**208** | Already reported | The members of a DAV binding have already been enumerated in a previous reply to this request, and are not being included again.
**226** | IM Used | The server has fulfilled a `GET` request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.

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