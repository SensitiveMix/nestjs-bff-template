import { createParamDecorator } from '@nestjs/common';

export const LoginInfo = createParamDecorator((_data, req) => {
  return req.as.login_info;
});
