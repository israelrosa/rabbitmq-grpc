import { Transport, ClientOptions } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:50051',
    package: 'messages',
    protoPath: join(process.cwd(), 'src/protofiles/messages.proto'),
  },
};
