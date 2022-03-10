import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MatchEntity, MatchSchema } from './match.entity';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MatchEntity.name,
        schema: MatchSchema,
      },
    ]),
  ],
  controllers: [MatchController],
  providers: [MatchService],
})
export class MatchModule {}
