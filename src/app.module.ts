import { Module } from '@nestjs/common';
import { GreetModule } from 'greet/greet.module';

@Module({
  imports: [GreetModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
