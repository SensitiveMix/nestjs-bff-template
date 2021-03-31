import { Get, Controller, UsePipes, Query, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { AjvValidationPipe } from '../../common/pipes/validation.pipe';
import { UtilService } from '../../common/providers/util.service';

const UserParam = {
  type: 'object',
  properties: {
    key: { type: 'string' },
  },
};

@Controller('dashboard')
export class UserController {
  constructor(
    private userService: UserService,
    private readonly util: UtilService,
  ) {}
  @Get()
  @UsePipes(new AjvValidationPipe(UserParam))
  async getData(@Query() query: any, @Res() res): Promise<any> {
    const data = await this.userService.getUserData(query.key);
    res.json(this.util.wrapResultSuccess(data));
  }
}
