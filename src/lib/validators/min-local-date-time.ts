import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { LocalDateTime } from '@js-joda/core';

type LocalDateTimeProvider = () => LocalDateTime;

export function MinLocalDateTime(minDateTimeOrProvider: LocalDateTime | LocalDateTimeProvider, validationOptions?: ValidationOptions) {
  return function(object: object, propertyName: string) {
    registerDecorator({
      name: 'minLocalDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [minDateTimeOrProvider],
      options: validationOptions,
      validator: {
        validate: (value: any, args: ValidationArguments) => {
          if (!(value instanceof LocalDateTime)) {
            return false;
          }

          const [minDateTimeOrProvider] = args.constraints as unknown as readonly [LocalDateTime | LocalDateTimeProvider];
          const minDateTime = minDateTimeOrProvider instanceof LocalDateTime ? minDateTimeOrProvider : minDateTimeOrProvider();

          return value.compareTo(minDateTime) >= 0;
        },
        defaultMessage(args: ValidationArguments): string {
          const [minDateOrProvider] = args.constraints as unknown as readonly [LocalDateTime | LocalDateTimeProvider];
          const minDate = minDateOrProvider instanceof LocalDateTime ? minDateOrProvider : minDateOrProvider();

          return `${args.property} must be greater than ${minDate.toString()}`;
        }
      },
    });
  };
}
