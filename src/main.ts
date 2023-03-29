import { NestFactory } from "@nestjs/core";
import { Logger } from '@nestjs/common';
import { AppModule } from "./app.module";

const port = 3000;
const globalPrefix = 'api';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(globalPrefix);

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );

  return app;
}

if (!process.env.HMR) bootstrap();
