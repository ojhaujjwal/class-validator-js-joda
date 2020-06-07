import { ValidationOptions } from 'class-validator';
import { IsLocalDate, IsLocalDateTime, IsLocalTime } from '../..';
import { LocalDate, LocalDateTime, LocalTime } from '@js-joda/core';
import { Transform, Type } from 'class-transformer';

const mapTypes = {
  localDate: LocalDate,
  localTime: LocalTime,
  localDateTime: LocalDateTime,
};

const mapDecorators = {
  localDate: IsLocalDate,
  localTime: IsLocalTime,
  localDateTime: IsLocalDateTime,
};

export function JodaValueObjectProperty(valueObjectType: keyof typeof mapTypes, validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    Transform(
      (value) => {
        try {
          return mapTypes[valueObjectType].parse(value);
        } catch (e) {
          // will be marked as invalid by IsInstanceOf validator
          return 'invalid date';
        }
      }
    )(object, propertyName);
    mapDecorators[valueObjectType](
      {
        message: 'Invalid value object passed.',
        ...validationOptions,
      }
    )(object, propertyName);
    Type(() => mapTypes[valueObjectType])(object, propertyName);
  }
}
