import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CompaniesController } from "./company.controller";
import { CompaniesService } from "./company.service";
import { Company } from "./company.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompanyModule {}
