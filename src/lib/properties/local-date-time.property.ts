import curry from 'lodash.curry';
import { JodaValueObjectProperty } from './joda-value-object.property';

export const LocalDateTimeProperty = curry(JodaValueObjectProperty)('localDateTime');
