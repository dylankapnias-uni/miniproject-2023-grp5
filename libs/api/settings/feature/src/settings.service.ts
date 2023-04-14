import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { AddTimeCommand, IAddTimeRequest, IAddTimeResponse } from "@mp/api/settings/util";

@Injectable()
export class SettingsService {
  constructor(private readonly commandBus: CommandBus){}

  async addTime(
    request: IAddTimeRequest
  ): Promise<IAddTimeResponse> {
    return await this.commandBus.execute<
      AddTimeCommand,
      IAddTimeResponse
    >(new AddTimeCommand(request));
  }
  // TODO everything
}