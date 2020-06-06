import { LocalTime } from '@js-joda/core';
import { ValidationOptions } from 'class-validator';
import { IsInstanceOf } from './is-instance-of';

export function IsLocalTime(validationOptions?: ValidationOptions) {
  return IsInstanceOf(LocalTime, {
    decoratorName: 'isLocalTime',
    ...validationOptions,
  });
}
