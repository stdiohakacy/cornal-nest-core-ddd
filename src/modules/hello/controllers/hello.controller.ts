import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HelperDateService } from 'src/shared/helper/services/helper.date.service';

@ApiTags('modules.public.hello')
@Controller({
  version: VERSION_NEUTRAL,
  path: '/hello',
})
export class HelloPublicController {
  constructor(private readonly helperDateService: HelperDateService) {}

  @Get('/')
  async hello() {
    const today = this.helperDateService.create();
    return {
      data: {
        date: today,
        format: this.helperDateService.formatToIso(today),
        timestamp: this.helperDateService.getTimestamp(today),
      },
    };
  }
}
