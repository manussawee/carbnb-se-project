# Carbnb API documentation

## Convention

 1. **Always** use `kebab-case`.
 2. **Avoid** using verbs in endpoint name; use HTTP verb (e.g. `GET`, `POST`, `PUT`, `UPDATE`, `DELETE`) instead.

## Table of Contents

> TODO: Add TOC

### Authentication
base endpoint: `/auth/`

 -  POST `/`
 Returns a JWT Token signed by the server. The JWT *should* be kept at client side, and is used in all endpoints that need authentication.
 Responds with status 401 if authentication is failed.

     Example request body:
    ```json
    {
		"username": "<username>",
		"password": "<password>"
    }
     ```
     Example response:
     ```json
     {
		 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2U2OSIsImlhdCI6MTU0MjE3NjQ1NywiYXVkIjoiY2FyYm5iLmNvbSIsImlzcyI6ImNhcmJuYi5jb20ifQ._SCEfdTG943gZfbBTDQVgopx1_OLiC6uUsY_-VQNIj8"
     }
     ```
- POST `/register`
- [development only] POST `/testjwt`
- [development only] POST `/testjwt-admin`

### Lessee Functions
base endpoint: `/lessee`
All endpoints except GET `/car` requires JWT token with admin role.

 - GET `/car`
 - GET `/rental/history`
 - POST `/rental/request`
 - POST `/rental/retrieval`
 - POST `/rental/return`
 - POST `/rental/cancel`

### Lessor Functions
base endpoint: `/lessor`
All endpoints requires JWT token with lessor role.

 - GET `/car`
 - PUT `/car`
 - UPDATE `/car`
 - DELETE `/car`
 - POST `/rental/retrieval`
 - POST `/rental/return`

### Admin Functions
base endpoint: `/admin/`
All endpoints requires JWT token with admin role.

 - GET `/rental`
   Returns all rental objects in the system.
   Responds with status 401 if no JWT is given, or the given JWT is invalid, or does not have admin   role.

      Example response:
      ```json
      [
	      {
		      "id": "rentalID001",
		      "userId": "manussawee",
		      "carId": "carID001",
		      "startedAt": "<some datetime representation>",
		      "endedAt": "<some datetime representation>",
		      "status": "retrieved",
		      "paymentRef": "paymentID001"
	      }
      ]
      ```

 - GET `/user`
 - POST `/user/:id/ban`
 - POST `/user/:id/unban`
 <!-- - GET `/lessee`
 - POST `/lessee/ban`
 - POST `/lessee/unban`
 - GET `/lessor`
 - POST `/lessor/ban`
 - POST `/lessor/unban` -->
 - POST `/car/:id/force-delete`
 - POST `/rental/:id/force-terminate`
