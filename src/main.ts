import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'
import { TypeORMErrorFilter } from './filters/errors.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true })
  )
  app.useGlobalFilters(new TypeORMErrorFilter())
  await app.listen(3000)
}
bootstrap()
