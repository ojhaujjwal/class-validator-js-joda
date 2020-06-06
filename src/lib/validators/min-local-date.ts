import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { LocalDate } from '@js-joda/core';

type LocalDateProvider = () => LocalDate;

export function MinLocalDate(minDateOrProvider: LocalDate | LocalDateProvider, validationOptions?: ValidationOptions) {
  return function(object: object, propertyName: string) {
    registerDecorator({
      name: 'minLocalDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [minDateOrProvider],
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
        defaultMessage(args: ValidationArguments): string {
          const [minDateOrProvider] = args.constraints as unknown as readonly [LocalDate | LocalDateProvider];
          const minDate = minDateOrProvider instanceof LocalDate ? minDateOrProvider : minDateOrProvider();

          return `${args.property} must be greater than ${minDate.toString()}`;
        }
      },
    });
  };
}
