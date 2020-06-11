# class-validator-js-joda

This library provides some handy decorators that you can use if you are using [class-validator](https://github.com/typestack/class-validator) and [class-transformer](https://github.com/typestack/class-transformer) together with the awesome [js-joda](https://js-joda.github.io/js-joda/) datetime library.

## Decorators
### LocalDateProperty
- Attaches string to `LocalDate` [transformer decorator](https://github.com/typestack/class-transformer#advanced-usage)
- Attaches decorator for validating `LocalDate`

```ts
import { LocalDate } from 'js-joda';
import { LocalDateProperty } from 'class-validator-js-joda';
import { plainToClass } from "class-transformer";
import { validateOrReject } from "class-validator";

class UserSignupRequest {
    @LocalDateProperty()
    readonly dateOfBirth: LocalDate;
}

const request = plainToClass(UserSignupRequest, {
    dateOfBirth: '1995-10-10'
});

try {
    await validateOrReject(input);

    //request is valid; lets process it.
} catch (errors) {
    console.log("Caught promise rejection (validation failed). Errors: ", errors)
}
```

### LocalTimeProperty
- Attaches string to `LocalTime` [transformer decorator](https://github.com/typestack/class-transformer#advanced-usage)
- Attaches decorator for validating `LocalTime`

```ts
import { LocalTime } from 'js-joda';
import { LocalTimeProperty } from 'class-validator-js-joda';

class Attendance {
    @LocalTimeProperty()
    readonly checkInTime: LocalTime;
}
```

### LocalDateTimeProperty
- Attaches string to `LocalDateTime` [transformer decorator](https://github.com/typestack/class-transformer#advanced-usage)
- Attaches decorator for validating `LocalDateTime`
```ts
import { LocalDateTime } from 'js-joda';
import { LocalDateTimeProperty } from 'class-validator-js-joda';

class PublishPostRequest {
    @LocalDateTimeProperty()
    readonly scheduledPublishTime: LocalDateTime;
}
```

### MinLocalDate
- Attaches decorator for validating whether the value is a local date that's after the specified local date. 
```ts
import { LocalDate } from 'js-joda';
import { MinLocalDate } from 'class-validator-js-joda';

class SomeClass {
    @MinLocalDate(() => LocalDate.now())
    readonly dateField: LocalDate;
}

class SomeOtherClass {
    @MinLocalDate(LocalDate.now())
    readonly dateField: LocalDate;
}
```

## TODO
- [ ] Unit Tests
- [ ] Better documentation
