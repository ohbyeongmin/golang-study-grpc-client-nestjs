import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:50052',
    package: 'greet',
    protoPath: join(__dirname, '../src/proto/greet.proto'),
  },
};
