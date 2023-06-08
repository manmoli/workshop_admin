import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { ParseIntPipe, ParseFloatPipe } from '@nestjs/common'

@Injectable()
export class ParseNumericMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    // Parse request body properties
    for (const key in req.body) {
      if (typeof req.body[key] === 'string' && /^\d+$/.test(req.body[key])) {
        req.body[key] = await new ParseIntPipe().transform(req.body[key], {
          type: 'body'
        })
      }
      if (
        typeof req.body[key] === 'string' &&
        /^\d+(\.\d+)?$/.test(req.body[key])
      ) {
        req.body[key] = new ParseFloatPipe().transform(req.body[key], {
          type: 'body'
        })
      }
    }

    next()
  }
}
