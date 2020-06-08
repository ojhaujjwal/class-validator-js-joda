import { ValidationOptions } from 'class-validator';
import { JodaValueObjectProperty } from './joda-value-object.property';

export function LocalDateTimeProperty(validationOptions?: ValidationOptions) {
  return JodaValueObjectProperty('localDateTime', validationOptions)
}
