# Golang study grpc client (NestJS)

Grpc 서버 링크
https://github.com/seoyhaein/golang-study/blob/main/v1rpc/examples/grpc_servermain.go

Grpc 서버에서는 5초뒤에 클라이언트에 응답
서버에서 context 를 사용하여 클라이언트가 5초 전에 요청을 취소하면 서버측에서는 api 실행을 취소

클라이언트에서 요청을 취소하면 그 요청은 의미가 없어지게 된다.
따라서 context를 사용하게 되면 서버에서는 해당 요청에 대한 처리를 하지 않아도 되므로 서버 자원을 효율 적으로 사용 할 수 있다.

## 6초로 설정 했을 경우

### Client

```Typescript
// greet.service.ts
sayHello(data: { name: string }): Observable<string> {
    const deadline = new Date(Date.now() + 6000);
    return this.greetService.sayHello(data, { deadline: deadline });
  }
```

```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 25
ETag: W/"19-c6Hfa5VVP+Ghysj+6y9cPi5QQbk"
Date: Mon, 25 Oct 2021 04:33:38 GMT
Connection: close

{
  "message": "Hello World"
}
```

### Server

```bash
2021/10/25 13:33:58 GRPC Listening Port:  :50052
2021/10/25 13:34:04 Received:  World
```

## 3초로 설정 했을 경우

### Client

```Typescript
// greet.service.ts
sayHello(data: { name: string }): Observable<string> {
    const deadline = new Date(Date.now() + 3000);
    return this.greetService.sayHello(data, { deadline: deadline });
  }
```

```bash
Nest] 72463   - 2021. 10. 25. 오후 1:35:39   [ExceptionsHandler] 4 DEADLINE_EXCEEDED: Deadline exceeded +7698ms
Error: 4 DEADLINE_EXCEEDED: Deadline exceeded
```

### Server

```bash
2021/10/25 13:36:52 GRPC Listening Port:  :50052
2021/10/25 13:37:11 SayHello exit
```
