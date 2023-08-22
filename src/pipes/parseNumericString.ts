import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common'
import { ParseIntPipe, ParseFloatPipe } from '@nestjs/common'

@Injectable()
export class ParseNumericPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    for (const key in value) {
      if (typeof value[key] === 'string' && /^\d+$/.test(value[key])) {
        value[key] = await new ParseIntPipe().transform(value[key], {
          type: 'body'
        })
      } else if (
        typeof value[key] === 'string' &&
        /^\d+(\.\d+)?$/.test(value[key])
      ) {
        value[key] = await new ParseFloatPipe().transform(value[key], {
          type: 'body'
        })
      }
    }
    return value
  }
}
