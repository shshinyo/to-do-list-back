import { Logger, INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): any {
    const logger: Logger = new Logger('Swagger');
    const swaggerEndpoint ="explorer";

    const options = new DocumentBuilder()
        .setTitle("Task Service API")
        .setDescription("Task Service API documentation")
        .setVersion("1.0.0")
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(swaggerEndpoint, app, document);
    logger.log(`Added swagger on endpoint http://localhost:3000/${swaggerEndpoint} `);
}
