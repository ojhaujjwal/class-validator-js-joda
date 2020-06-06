import { LocalDate } from '@js-joda/core';
import { ValidationOptions } from 'class-validator';
import { IsInstanceOf } from './is-instance-of';

export function IsLocalDate(validationOptions?: ValidationOptions) {
  return IsInstanceOf(LocalDate, {
    decoratorName: 'isLocalDate',
    ...validationOptions,
  });
}
