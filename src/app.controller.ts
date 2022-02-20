import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/source-maps")
  getSourceMaps(): string {
    throw new Error(
      "check the server logs at stdout for a correct mapping to this exception.",
    );
  }
}
