import { ValidationOptions } from 'class-validator';
import { IsLocalDateTime } from '../..';
import { LocalDateTime } from '@js-joda/core';
import { Transform, Type } from 'class-transformer';

export function LocalDateTimeProperty(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    Transform(
      (value) => {
        try {
          return LocalDateTime.parse(value);
        } catch (e) {
          // will be marked as invalid by IsInstanceOf validator
          return 'invalid date';
        }
      }
    )(object, propertyName);
    IsLocalDateTime(
      {
        message: 'Invalid local date passed.',
        ...validationOptions,
      }
    )(object, propertyName);
    Type(() => LocalDateTime)(object, propertyName);
  }
}
