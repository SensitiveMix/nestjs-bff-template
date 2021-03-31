import { Injectable } from '@nestjs/common';

export interface Response {
  code: number;
  message?: string;
  data?: any;
}

@Injectable()
export class UtilService {
  public wrapResultSuccess(data): Response {
    return this.wrapJsonResponse(200, 'success', data);
  }

  public wrapResultFailure(code: number, message): Response {
    return this.wrapJsonResponse(code, message);
  }

  public isEmpty(value): boolean {
    return typeof value === 'undefined' || value === null;
  }

  private wrapJsonResponse(
    _code: number | null,
    _message: string,
    _data?: any,
  ) {
    const response: Response = { code: 200 };

    if (!this.isEmpty(_code)) response.code = _code;
    if (!this.isEmpty(_message)) response.message = _message;
    if (!this.isEmpty(_data)) response.data = _data;

    return response;
  }
}
