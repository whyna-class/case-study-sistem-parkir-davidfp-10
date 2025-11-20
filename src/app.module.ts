import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParkirModule } from './parkir/parkir.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [ParkirModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
