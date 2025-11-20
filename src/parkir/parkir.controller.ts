import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { ParkirService } from './parkir.service';
import { CreateParkirDto } from './dto/create-parkir.dto';
import { UpdateParkirDto } from './dto/update-parkir.dto';
import { FindParkirDto } from './dto/find-parkir.dto';

@Controller('parkir')
export class ParkirController {
  constructor(private readonly parkirService: ParkirService) { }

  @Post()
  create(@Body() createParkirDto: CreateParkirDto) {
    return this.parkirService.create(createParkirDto);
  }

  @Get('pendapatan')
  totalPendapatan() {
    return this.parkirService.totalPendapatan();
  }

  @Get()
  findAll(@Query() query: FindParkirDto) {
    return this.parkirService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parkirService.findOne(+id);
  }
}
