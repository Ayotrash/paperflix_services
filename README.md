# Paperflix REST APIs
REST APIs services for Paperflix application. This project was built using Node.js and Express framework to make an endpoint and handle the responses. This documentation will be separate by two section, first, the section for consumer or user(frontend developer), and second for developer who in charge in this project.

#### Informational Status Codes

Status Code | Name | Description
------------|------|------------
**100** | Continue | The server has received the request headers, and that the client should proceed to send the request body.
**101** | Switching Protocols | The requester has asked the server to switch protocols and the server is acknowledging that it will do so.
**102** | Processing | The server has received and is processing the request, but no response is available yet.

#### Success Status Codes

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

#### Redirection Status Codes

Status Code | Name | Description
------------|------|------------
**300** | Multiple Choices | There are multiple options that the client may follow.
**301** | Moved Permanently | The resource has been moved and all further requests should reference its new URI.
**302** | Found | The HTTP 1.0 specification described this status as *Moved Temporarily*, but popular browsers respond to this status similar to behavior intended for `303`. The resource can be retrieved by referencing the returned URI.
**303** | See Other | The resource can be retrieved by following other URI using the `GET` method. When received in response to a `POST`, `PUT`, or `DELETE`, it can usually be assumed that the server processed the request successfully and is sending the client to an informational endpoint.
**304** | Not Modified | The resource has not been modified since the version specified in `If-Modified-Since` or `If-Match` headers. The resource will not be returned in response body.
**305** | Use Proxy | HTTP 1.1. The resource is only available through a proxy and the address is provided in the response.
**306** | Switch Proxy | Deprecated in HTTP 1.1. Used to mean that subsequent requests should be sent using the specified proxy.
**307** | Temporary Redirect | HTTP 1.1. The request should be repeated with the URI provided in the response, but future requests should still call the original URI.
**308** | Permanent Redirect | Experimental. The request and all future requests should be repeated with the URI provided in the response. The HTTP method is not allowed to be changed in the subsequent request.
**309** | Resume Incomplete(Google) | This code is used in the Resumable HTTP Requests Proposal to resume aborted `PUT` or `POST` requests.

#### Client Error Status Codes

Status Code | Name | Description
------------|------|------------
**400** | Bad Request | The request could not be fulfilled due to the incorrect syntax of the request.
**401** | Unauthorized | The requester is not authorized to access the resource. This is similar to `403` but is used in cases where authentication is expected but has failed or has not been provided.
**402** | Payment Required | Reserved for future use. Some web services use this as an indication that the client has sent an excessive number of requests.
**403** | Forbidden | The request was formatted correctly but the server is refusing to supply the requested resource. Unlike `401`, authenticating will not make a difference in the server's response.
**404** | Not Found | The resource could not be found. This is often used as a catch-all for all invalid URIs requested of the server.
**405** | Method Not Allowed | The resource was requested using a method that is not allowed. For example, requesting a resource via a `POST` method when the resource only supports the `GET` method.
**406** | Not Acceptable | The resource is valid, but cannot be provided in a format specified in the `Accept` headers in the request.
**407** | Proxy Authentication Required | Authentication is required with the proxy before requests can be fulfilled.
**408** | Request Timeout | The server timed out waiting for a request from the client. The client is allowed to repeat the request.
**409** | Conflict | The request cannot be completed due to a conflict in the request parameters.
**410** | Gone | The resource is no longer available at the requested URI and no redirection will be given.
**411** | Length Required | The request did not specify the length of its content as required by the resource.
**412** | Precondition Failed | The server does not meet one of the preconditions specified by the client.
**413** | Request Entity to Large | The request is larger than what the server is able to process.
**414** | Request-URI to Long |  URI provided in the request is too long for the server to process. This is often used when too much data has been encoded into the URI of a `GET` request and a `POST` request should be used instead.
**415** | Unsupported Media Type | The client provided data with a media type that the server does not support.
**416** | Requested Range not Satisfiable | The client has asked for a portion of the resource but the server cannot supply that portion.
**417** | Expectation Failed | The server cannot meet the requirements of the Expect request-header field.
**418** | I'm a Teapot | Any attempt to brew coffee with a teapot should result in the error code "418 I'm a teapot". The resulting entity body MAY be short and stout.
**421** | Misdirected Request | The request was directed at a server that is not able to produce a response. This can be sent by a server that is not configured to produce responses for the combination of scheme and authority that are included in the request URI.
**422** | Unprocessable Entity | The request was formatted correctly but cannot be processed in its current form. Often used when the specified parameters fail validation errors.
**423** | Locked | The requested resource was found but has been locked and will not be returned.
**424** | Failed Dependency | The request failed due to a failure of a previous request.
**426** | Upgrade Required | The client should repeat the request using an upgraded protocol such as TLS 1.0.
**428** | Precondition Required | The origin server requires the request to be conditional.
**429** | Too Many Requests | The user has sent too many requests in a given amount of time ("rate limiting").
**431** | Request Header Fields too Large | The server is unwilling to process the request because its header fields are too large.

#### Server Error Status Codes

Status Code | Name | Description
------------|------|------------
**500** | Internal Server Error | A generic status for an error in the server itself.
**501** | Not Implemented | The server cannot respond to the request. This usually implies that the server could possibly support the request in the future — otherwise a `4xx` status may be more appropriate.
**502** | Bad Gateway | The server is acting as a proxy and did not receive an acceptable response from the upstream server.
**503** | Service Unavailable | The server is down and is not accepting requests.
**504** | Gateway Timeout | The server is acting as a proxy and did not receive a response from the upstream server.
**505** | HTTP Version Not Supported | The server does not support the HTTP protocol version specified in the request.
**506** | Variant Also Negotiates | Transparent content negotiation for the request results in a circular reference.
**507** | Insufficient Storage | The user or server does not have sufficient storage quota to fulfill the request.
**508** | Loop Detected | The server detected an infinite loop in the request.
**510** | Not Extended | Further extensions to the request are necessary for it to be fulfilled.
**511** | Network Authentication Required | The client must authenticate with the network before sending requests.

## Consumer
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