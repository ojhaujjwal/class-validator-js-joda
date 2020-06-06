import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

interface Options extends ValidationOptions {
  readonly decoratorName?: string;
}

export function IsInstanceOf(targetType: Function, options?: Options) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      constraints: [targetType],
      name: options?.decoratorName || 'isInstanceOf',
      options: options,
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
