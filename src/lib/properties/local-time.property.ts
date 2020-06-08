import { ValidationOptions } from 'class-validator';
import { JodaValueObjectProperty } from './joda-value-object.property';

export function LocalTimeProperty(validationOptions?: ValidationOptions) {
  return JodaValueObjectProperty('localTime', validationOptions)
}
