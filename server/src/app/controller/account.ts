import BaseController from '../../lib/baseController';
import { controller, inject, post, provide } from 'midway';
import { IAccountService } from '../../interface/service/IAccountService';
import { IAccountInfo } from '../../interface/IAccountInfo';

@provide()
@controller('/node/user/')
export class Account extends BaseController {

  @inject('AccountService')
  service: IAccountService;

  @post('/login')
  async login() {
    try {
      const { body } = this.getRequestBody();
      console.log(body, 'body');
      const { userAccount, password } = body;
      console.log(userAccount, 'userAccount');
      let crypto = require('crypto');
      let hash = crypto.createHash('md5').update(password).digest('hex');
      const accountInfo: IAccountInfo = { userAccount, password: hash };
      const result = await this.service.login(accountInfo);
      this.success(result);
    } catch (e) {
      this.ctx.logger.error('login-----:', e);
      this.fail(e);
    }
  }

  @post('/register')
  async register() {
    try {
      const { body } = this.getRequestBody();
      console.log(body);
      const { userAccount, password, nickName } = body;

      let crypto = require('crypto');
      let hash = crypto.createHash('md5').update(password).digest('hex');
      const accountInfo: IAccountInfo = { userAccount, password: hash, nickName };
      const result = await this.service.register(accountInfo);
      this.success(result);
    } catch (e) {
      this.ctx.logger.error('login-----:', e);
      this.fail(e);
    }
  }
}
