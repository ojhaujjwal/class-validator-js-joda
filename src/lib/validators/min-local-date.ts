import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { LocalDate } from '@js-joda/core';

type LocalDateProvider = () => LocalDate;

export function MinLocalDate(minDate: LocalDate | LocalDateProvider, validationOptions?: ValidationOptions) {
  return function(object: object, propertyName: string) {
    registerDecorator({
      name: 'MinLocalDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [minDate],
      options: validationOptions,
      validator: {
        validate: (value: any, args: ValidationArguments) => {
          if (!(value instanceof LocalDate)) {
            return false;
          }

          const [minDateOrProvider] = args.constraints as unknown as readonly [LocalDate | LocalDateProvider];
          const minDate = minDateOrProvider instanceof LocalDate ? minDateOrProvider : minDateOrProvider();

          return value.compareTo(minDate) >= 0;
        },
      },
    });
  };
}
