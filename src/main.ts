import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule,DocumentBuilder } from '@nestjs/swagger'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('Nestjs Template')
    .setDescription('Nestjs Template')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api',app,document);
  app.enableCors();
  console.log(`http://localhost:${process.env.PORT}`);
  await app.listen(process.env.PORT);

}
bootstrap();
