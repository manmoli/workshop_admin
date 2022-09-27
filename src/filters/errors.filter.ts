import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus
} from '@nestjs/common'
import { Response, Request } from 'express'
import { EntityNotFoundError, QueryFailedError, TypeORMError } from 'typeorm'

const typeOrmErrorList = {
  duplicateKeyValue:
    'duplicate key value violates unique constraint "UQ_ed90edcfa924ec9ec45da7c66d7"'
}

interface ErrorResponse {
  statusCode: number
  message: string
  timestamp: string
  path: string
}

@Catch(TypeORMError)
export class TypeORMErrorFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status: HttpStatus = 500
    const responseObject: ErrorResponse = {
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url
    }

    switch (exception.constructor) {
      case QueryFailedError:
        if (responseObject.message === typeOrmErrorList.duplicateKeyValue) {
          responseObject.statusCode = HttpStatus.CONFLICT
        }
        break
      case EntityNotFoundError:
        responseObject.statusCode = HttpStatus.NOT_FOUND
        break
    }
    response.status(status).json(responseObject)
  }
}
