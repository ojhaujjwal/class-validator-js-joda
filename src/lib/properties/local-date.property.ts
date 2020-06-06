import { ValidationOptions } from 'class-validator';
import { IsLocalDate } from '../..';
import { LocalDate } from '@js-joda/core';
import { Transform, Type } from 'class-transformer';

export function LocalDateProperty(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    Transform(
      (value) => {
        try {
          return LocalDate.parse(value);
        } catch (e) {
          // will be marked as invalid by IsInstanceOf validator
          return 'invalid date';
        }
      }
    )(object, propertyName);
    IsLocalDate(
      {
        message: 'Invalid local date passed.',
        ...validationOptions,
      }
    )(object, propertyName);
    Type(() => LocalDate)(object, propertyName);
  }
}
