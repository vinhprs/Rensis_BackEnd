import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(graphqlUploadExpress({maxFileSize: 999999999, maxFile: 4}));
  await app.listen(+process.env.PORT || 3000, 
    () => console.log(`App is running on http://localhost:${3000}/graphql `));
}
bootstrap();
