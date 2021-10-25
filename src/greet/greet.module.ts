import { Module } from '@nestjs/common';
import { GreetController } from './greet.controller';
import { GreetService } from './greet.service';

@Module({
  controllers: [GreetController],
  providers: [GreetService],
})
export class GreetModule {}
