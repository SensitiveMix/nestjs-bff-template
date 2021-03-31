import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import type { Request } from 'express';
import { IncomingHttpHeaders } from 'http';

declare module 'http' {
  interface IncomingHttpHeaders {
    'x-request-id'?: string;
  }
}
/**
 * https://github.com/nestjs/nest/issues/173
 */
@Injectable({ scope: Scope.REQUEST })
export class RequestContext {
  headers: IncomingHttpHeaders;
  constructor(@Inject(REQUEST) public context: Request) {}
}
