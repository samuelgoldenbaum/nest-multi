import { Body, Controller, Get, Post } from '@nestjs/common'
import { CharactersService } from './characters.service'
import { CreateCharacterDto } from '@/modules/tenanted/characters/dto/create-character.dto'

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.charactersService.create(createCharacterDto)
  }

  @Get()
  findAll() {
    return this.charactersService.findAll()
  }
}
