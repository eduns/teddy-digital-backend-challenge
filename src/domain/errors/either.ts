// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class Left<L, R> {
  value: L;
  
  constructor (value: L) {
    this.value = value;
  }

  isLeft (): this is Left<L, R> {
    return true;
  }

  isRight (): this is Right<L, R>{
    return false;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class Right<L, R> {
  value: R;
  
  constructor (value: R) {
    this.value = value;
  }

  isLeft (): this is Left<L, R> {
    return false;
  }
  
  isRight (): this is Right<L, R> {
    return true;
  }
}

export type Either<L, R> = Left<L, R> | Right<L, R>;

export const left = <L, R>(l: L): Either<L, R> => {
  return new Left(l);
};

export const right = <L, R>(r: R): Either<L, R> => {
  return new Right(r);
};