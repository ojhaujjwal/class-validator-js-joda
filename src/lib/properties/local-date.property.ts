import curry from 'lodash.curry';
import { JodaValueObjectProperty } from './joda-value-object.property';

export const LocalDateProperty = curry(JodaValueObjectProperty)('localDate');
