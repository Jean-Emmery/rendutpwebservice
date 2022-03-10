import { IsObjectIdPipe } from '@rendu-tp0/api/validation/id';
import {
  EquipeDto,
  resourceEquipePath,
} from '@rendu-tp0/common/resource/equipe';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  ApiEquipeCreateDto,
  ApiEquipeDto,
  ApiEquipeResetDto,
  ApiEquipeUpdateDto,
  equipeExample,
} from './equipe.documentation';
import { EquipeService } from './equipe.service';
import {
  EquipeCreateValidationDto,
  EquipeResetValidationDto,
  EquipeUpdateValidationDto,
} from './equipe.validation';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type as TypeTransformer } from 'class-transformer';

export interface PaginationParams {
  page?: number;
  size?: number;
}

export class PaginationParamsValidation implements PaginationParams {
  @IsOptional()
  @TypeTransformer(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  size?: number;

  @IsOptional()
  @TypeTransformer(() => Number)
  @IsInt()
  @Min(1)
  page?: number;
}

@ApiTags(resourceEquipePath)
@Controller(resourceEquipePath)
export class EquipeController {
  constructor(private readonly equipeService: EquipeService) {}

  @Post()
  @ApiBody({ type: ApiEquipeCreateDto })
  @ApiCreatedResponse({ type: ApiEquipeDto })
  @ApiBadRequestResponse()
  create(@Body() dto: EquipeCreateValidationDto): Promise<EquipeDto> {
    return this.equipeService.create(dto);
  }

  @ApiQuery({ name: 'page', type: 'integer', example: 0 })
  @ApiQuery({ name: 'size', type: 'integer', example: 10 })
  @Get()
  @ApiOkResponse({ type: [ApiEquipeDto] })
  findAll(
    @Query(
      new ValidationPipe({
        transform: true,
        expectedType: PaginationParamsValidation,
      })
    )
    paginationParams: PaginationParams
  ): Promise<EquipeDto[]> {
    return this.equipeService.findAll(paginationParams);
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: equipeExample.id })
  @ApiOkResponse({ type: ApiEquipeDto })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  findOne(@Param('id', IsObjectIdPipe) id: string): Promise<EquipeDto> {
    return this.equipeService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', example: equipeExample.id })
  @ApiBody({ type: ApiEquipeUpdateDto })
  @ApiOkResponse({ type: ApiEquipeDto })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  update(
    @Param('id', IsObjectIdPipe) id: string,
    @Body() dto: EquipeUpdateValidationDto
  ): Promise<EquipeDto> {
    return this.equipeService.update({ ...dto, id });
  }

  @Put(':id')
  @ApiParam({ name: 'id', example: equipeExample.id })
  @ApiBody({ type: ApiEquipeResetDto })
  @ApiOkResponse({ type: ApiEquipeDto })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  reset(
    @Param('id', IsObjectIdPipe) id: string,
    @Body() dto: EquipeResetValidationDto
  ): Promise<EquipeDto> {
    return this.equipeService.reset({ ...dto, id });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'id', example: equipeExample.id })
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  remove(@Param('id', IsObjectIdPipe) id: string): Promise<void> {
    return this.equipeService.remove(id);
  }
}
