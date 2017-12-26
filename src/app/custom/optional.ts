

export class Optional<T> {

  private value: T;

  private constructor(t: T = null) {
    this.value = t;
  }

  public isPresent(): boolean {
    return !!this.value;
  }

  public static ofNullable<T>(value: T): Optional<T> {
    return new Optional<T>(value);
  }

  public static of<T>(value: T): Optional<T> {
    if (value) {
      return new Optional<T>(value);
    } else {
      throw new Error("Value must be not null or undefined");
    }
  }

  public get(): T {
    if (this.value) {
      return this.value;
    } else {
      throw new Error("Value is null");
    }
  }

}
