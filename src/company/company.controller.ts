import { Controller } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";

import { Company } from "./company.entity";
import { CompaniesService } from "./company.service";

@Crud({
  model: {
    type: Company,
  },
})
@Controller("companies")
export class CompaniesController implements CrudController<Company> {
  constructor(public service: CompaniesService) {}
}
