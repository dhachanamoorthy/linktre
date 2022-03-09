import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import admin from "firebase-admin";
async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle("Linktre")
		.setDescription("API Documentation")
		.setVersion("1.0")
		.addBearerAuth(
			{
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT",
				name: "JWT",
				description: "Enter bearer token",
				in: "header",
			},
			"JWT-auth"
		)
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, document);
	app.enableCors();

	admin.initializeApp({
		credential: admin.credential.cert({
			projectId: process.env.PROJECT_ID,
			privateKey: process.env.PROJECT_KEY?.replace(/\\n/g, "\n"),
			clientEmail: process.env.PROJECT_CLIENT_EMAIL,
		}),
	});
	console.log(`http://localhost:${process.env.PORT}`);
	await app.listen(process.env.PORT);
}
bootstrap();
