import { ValidationOptions } from 'class-validator';
import { JodaValueObjectProperty } from './joda-value-object.property';

export function LocalDateProperty(validationOptions?: ValidationOptions) {
  return JodaValueObjectProperty('localDate', validationOptions)
}
