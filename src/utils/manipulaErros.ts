import { EnumStatusCodes } from '../enum/statusCodes';

export class ManipulaErros extends Error {
  readonly statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequest extends ManipulaErros {
  constructor(message: string) {
    super(message, EnumStatusCodes.BAD_REQUEST);
  }
}

export class NotFound extends ManipulaErros {
  constructor(message: string) {
    super(message, EnumStatusCodes.NOT_FOUND);
  }
}
