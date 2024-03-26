import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './module/auth.module';
import { ormConfig } from './orm.config';
import { ProvinceModule } from './module/province.module';
import { WardModule } from './module/ward.module';
import { DistrictModule } from './module/district.module';
import { AreaModule } from './module/area.module';
import { ProductModule } from './module/product.module';
import { TypeProductModule } from './module/type-product.module';
import { ProfileModule } from './module/profile.module';
import { TaskProfileModule } from './module/task-profile.module';
import { TaskModule } from './module/task.module';
import { ReceiveModule } from './module/receive.module';
import { DeliverModule } from './module/deliver.module';
import { DetailDeliverModule } from './module/detail-deliver.module';
import { DetailReceiveModule } from './module/detail-receive.module';
import { NotificationsModule } from './module/notifications.module';
// jhipster-needle-add-entity-module-to-main-import - JHipster will import entity modules here, do not remove
// jhipster-needle-add-controller-module-to-main-import - JHipster will import controller modules here, do not remove
// jhipster-needle-add-service-module-to-main-import - JHipster will import service modules here, do not remove

@Module({
    imports: [
        TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
        AuthModule,
        ProvinceModule,
        WardModule,
        DistrictModule,
        AreaModule,
        ProductModule,
        TypeProductModule,
        ProfileModule,
        TaskProfileModule,
        TaskModule,
        ReceiveModule,
        DeliverModule,
        DetailDeliverModule,
        DetailReceiveModule,
        NotificationsModule,
        // jhipster-needle-add-entity-module-to-main - JHipster will add entity modules here, do not remove
    ],
    controllers: [
        // jhipster-needle-add-controller-module-to-main - JHipster will add controller modules here, do not remove
    ],
    providers: [
        // jhipster-needle-add-service-module-to-main - JHipster will add service modules here, do not remove
    ],
})
export class AppModule {}
