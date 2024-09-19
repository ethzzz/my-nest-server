import { PartialType } from '@nestjs/mapped-types';
import { CreateGlobalAaaDto } from './create-global-aaa.dto';

export class UpdateGlobalAaaDto extends PartialType(CreateGlobalAaaDto) {}
