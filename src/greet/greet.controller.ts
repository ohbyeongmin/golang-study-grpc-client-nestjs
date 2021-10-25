import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GreetService } from './greet.service';

@Controller()
export class GreetController {
  constructor(private readonly greetService: GreetService) {}
  @Get()
  call(): Observable<string> {
    return this.greetService.sayHello({ name: 'World' });
  }
}
