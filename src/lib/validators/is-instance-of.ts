import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsInstanceOf(targetType: Function, validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      constraints: [targetType],
      name: 'IsInstanceOf',
      options: validationOptions,
      propertyName,
      target: object.constructor,
      validator: {
        validate: (value: any, args: ValidationArguments) => {
          const [targetType] = args.constraints;

          return value instanceof targetType;
        },
      },
    });
  };
}
