import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EquipeEntity, EquipeSchema } from './equipe.entity';
import { EquipeService } from './equipe.service';
import { EquipeController } from './equipe.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EquipeEntity.name,
        schema: EquipeSchema,
      },
    ]),
  ],
  controllers: [EquipeController],
  providers: [EquipeService],
})
export class EquipeModule {}
