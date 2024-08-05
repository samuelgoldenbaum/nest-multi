import { Injectable } from '@nestjs/common'
import { TenancyService } from '@/modules/tenancy/tenancy-service'
import { Character } from '@/modules/tenanted/characters/entities/character.entity'
import { CreateCharacterDto } from '@/modules/tenanted/characters/dto/create-character.dto'

@Injectable()
export class CharactersService {
  constructor(private readonly tenancyService: TenancyService) {}

  async findAll() {
    const characterRepository = (
      await this.tenancyService.getDataSource()
    ).getRepository(Character)

    return characterRepository.find()
  }

  async create(createCharacterDto: CreateCharacterDto) {
    const characterRepository = (
      await this.tenancyService.getDataSource()
    ).getRepository(Character)

    const character = characterRepository.create(createCharacterDto)

    return characterRepository.save(character)
  }
}
