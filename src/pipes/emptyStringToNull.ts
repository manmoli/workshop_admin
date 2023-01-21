import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common'
import { isEmpty } from 'lodash'

@Injectable()
export class EmptyStringToNull implements PipeTransform {
  transform(values: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      Object.keys(values).forEach((key) => {
        if (typeof values[key] === 'string' && isEmpty(values[key])) {
          values[key] = null
        }
      })
    }
    return values
  }
}
