import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";

@Injectable()
export class SettingsService {
  constructor(private readonly commandBus: CommandBus){
    // TODO everything
  }
}