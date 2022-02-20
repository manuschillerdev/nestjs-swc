import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CompanyModule } from "./company/company.module";

@Module({
  imports: [
    CompanyModule,
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "typeorm-db.sql",
      entities: [__dirname + "/**/*entity{.ts,.js}"],
      synchronize: !!process.env.HMR,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
