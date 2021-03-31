class CODE_AND_MESSAGE {
  code: number;
  message: string;
}

export class ErrorCode {
  /**
   * HTTP STATUS: 400
   */
  static readonly INVALID_NUMBER: CODE_AND_MESSAGE = {
    code: 400001,
    message: 'Invalid number',
  };
  static readonly INVALID_PARM: CODE_AND_MESSAGE = {
    code: 400002,
    message: 'Invalid param',
  };

  /**
   * HTTP STATUS: 404
   */
  static readonly USER_NOT_FOUND: CODE_AND_MESSAGE = {
    code: 404001,
    message: 'User not found',
  };
  static readonly SESSION_NOT_FOUND: CODE_AND_MESSAGE = {
    code: 404002,
    message: 'Session not found',
  };
  static readonly EMAIL_NOT_FOUND: CODE_AND_MESSAGE = {
    code: 404003,
    message: 'Email not found',
  };

  static readonly UNAUTHORIZE: CODE_AND_MESSAGE = {
    code: 401001,
    message: 'Please Sign in',
  };

  /**
   * HTTP STATUS: 403
   */
  static readonly INVALID_TOKEN: CODE_AND_MESSAGE = {
    code: 403001,
    message: 'Invalid token',
  };
  static readonly UNVERIFIED_EMAIL: CODE_AND_MESSAGE = {
    code: 403002,
    message: 'Email is not verified',
  };

  /**
   * HTTP STATUS: 409
   */
  static readonly RATE_LIMIT_EXCEEDED: CODE_AND_MESSAGE = {
    code: 409001,
    message: 'Rate limit exceeded',
  };

  /**
   * HTTP STATUS: 500
   */
  static readonly INTERVAL_ERROR: CODE_AND_MESSAGE = {
    code: 500001,
    message: 'Internal server error',
  };
  static readonly SERVICE_UNAVAILABLE: CODE_AND_MESSAGE = {
    code: 503002,
    message: 'Service unavailable',
  };

  static CodeToMessage(code: number): string {
    for (const key of Object.keys(this)) {
      if (this[key].CODE === code) {
        return this[key].MESSAGE;
      }
    }
    return '';
  }

  static HasCode(code: number): boolean {
    for (const key of Object.keys(this)) {
      if (this[key].CODE === code) {
        return true;
      }
    }
    return false;
  }
}
