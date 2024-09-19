import { PartialType } from '@nestjs/mapped-types';
import { CreateGlobalBbbDto } from './create-global-bbb.dto';

export class UpdateGlobalBbbDto extends PartialType(CreateGlobalBbbDto) {}
