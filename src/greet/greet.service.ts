import { Deadline } from '@grpc/grpc-js';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { grpcClientOptions } from 'grpc-greet.options';
import { Observable } from 'rxjs';

interface Greeter {
  // sayHello 인터페이스 구현 data 는 요청 메세지가 들어가고 deadline 에 응답 기한을 설정 할 수 있다.
  sayHello(
    data: { name: string },
    deadline: { deadline: Deadline },
  ): Observable<any>;
}

@Injectable()
export class GreetService implements OnModuleInit {
  @Client(grpcClientOptions) private readonly client: ClientGrpc;
  private greetService: Greeter;

  onModuleInit() {
    this.greetService = this.client.getService<Greeter>('Greeter');
  }

  sayHello(data: { name: string }): Observable<string> {
    // 요청 데드라인 설정
    // 5초 이상으로 하면 서버로부터 정상적으로 응답을 받고 5초 이하면 응답을 안받고 요청을 취소하게 된다.
    const deadline = new Date(Date.now() + 6000);
    return this.greetService.sayHello(data, { deadline: deadline });
  }
}
