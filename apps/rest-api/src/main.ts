/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { apiPathPrefix } from '@rendu-tp0/common/resource/core';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = apiPathPrefix;
  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
    .setTitle('RenduTp')
    .setDescription('RenduTp Desc')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(globalPrefix, app, document);

  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
