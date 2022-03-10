import {
  EquipeCreateDto,
  EquipeDto,
  EquipeResetDto,
  EquipeUpdateDto,
} from '@rendu-tp0/common/resource/equipe';
import {
  EquipeDocument,
  EquipeEntity,
  EquipeEntityWithId,
} from './equipe.entity';

export const equipeDocumentToDto = (document: EquipeDocument): EquipeDto => ({
  id: document.id,
  teamName: document.teamName,
});

export const equipeCreateDtoToEntity = (
  dto: EquipeCreateDto
): EquipeEntity => ({
  teamName: dto.teamName,
});

export const equipeUpdateDtoToEntity = (
  dto: EquipeUpdateDto
): EquipeEntityWithId => ({
  id: dto.id,
  teamName: dto.teamName,
});

export const equipeResetDtoToEntity = (
  dto: EquipeResetDto
): EquipeEntityWithId => ({
  id: dto.id,
  teamName: dto.teamName ?? null,
});
