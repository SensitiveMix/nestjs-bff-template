import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UnauthorizedException } from '../exception/unauthorized.exception';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  validateRequest(req) {
    if (!req.as || !req.as.login_info) {
      throw new UnauthorizedException('UNAUTHORIZE');
    }

    return true;
  }
}
