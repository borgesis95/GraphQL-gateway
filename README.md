# GraphQL-gateway


## Login And Redis
This paragraph will describe the flow that allow user to authenticate in the platoform. At the end user will receive JWT and he can perform the other operation against other service (based on his role).

- User will query this:
 ```
mutation {
    login(email: "mail@mail.com", password: "passowrd") {
      id
      email
    }
  }
```
- If the gateway get response (without error) as this:
```
{
  "data": {
    "login": {
      "email": "mail@mail.com",
      "token": "JWTTOKEN"
    }
  }
}

```
means that user is able to enter in the application. In order to avoid to ask every time the token to the user-service, API-gateway will save user's ID and JWT into Redis. So the next time that user want to make an operations, this service will check into Redis instead of carry out an REST operation against user-service. 


## Redis
If you want to avoid to install redis on your machine (For instance redis doesn't officially support windows), you could go through it using Docker 
```
docker run redis
```

Of course the port number on the container need to bind to the port exposed outside of it.
```
docker run -p 6379:6379 redis
```
You can find more info about Redis here:
https://redis.io/
