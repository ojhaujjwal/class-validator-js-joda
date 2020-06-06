import { LocalDateTime } from '@js-joda/core';
import { ValidationOptions } from 'class-validator';
import { IsInstanceOf } from './is-instance-of';

export function IsLocalDateTime(validationOptions?: ValidationOptions) {
  return IsInstanceOf(LocalDateTime, {
    decoratorName: 'isLocalDateTime',
    ...validationOptions,
  });
}
