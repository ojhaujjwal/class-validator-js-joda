import { ValidationOptions } from 'class-validator';
import { IsLocalTime } from '../..';
import { LocalTime } from '@js-joda/core';
import { Transform, Type } from 'class-transformer';

export function LocalTimeProperty(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    Transform(
      (value) => {
        try {
          return LocalTime.parse(value);
        } catch (e) {
          // will be marked as invalid by IsInstanceOf validator
          return 'invalid date';
        }
      }
    )(object, propertyName);
    IsLocalTime(
      {
        message: 'Invalid local date passed.',
        ...validationOptions,
      }
    )(object, propertyName);
    Type(() => LocalTime)(object, propertyName);
  }
}
