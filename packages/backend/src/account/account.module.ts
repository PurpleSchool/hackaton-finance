import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { BillModule } from '../bill/bill.module';

@Module({
  imports: [BillModule],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
