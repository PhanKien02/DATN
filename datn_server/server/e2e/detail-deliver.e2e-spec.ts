import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { DetailDeliverDTO } from '../src/service/dto/detail-deliver.dto';
import { DetailDeliverService } from '../src/service/detail-deliver.service';

describe('DetailDeliver Controller', () => {
    let app: INestApplication;

    const authGuardMock = { canActivate: (): any => true };
    const rolesGuardMock = { canActivate: (): any => true };
    const entityMock: any = {
        id: 'entityId'
    }

    const serviceMock = {
        findById: (): any => entityMock,
        findAndCount: (): any => [entityMock, 0],
        save: (): any => entityMock,
        update: (): any => entityMock,
        deleteById: (): any => entityMock
    };


    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).overrideGuard(AuthGuard)
        .useValue(authGuardMock)
        .overrideGuard(RolesGuard)
        .useValue(rolesGuardMock)
        .overrideProvider(DetailDeliverService)
        .useValue(serviceMock)
        .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all detail-delivers ', async () => {

        const getEntities: DetailDeliverDTO[] = (await request(app.getHttpServer())
        .get('/api/detail-delivers')
        .expect(200)).body;

        expect(getEntities).toEqual(entityMock);

    }
    );

    it('/GET detail-delivers by id', async () => {


        const getEntity: DetailDeliverDTO = (await request(app.getHttpServer())
            .get('/api/detail-delivers/' + entityMock.id)
            .expect(200)).body;

        expect(getEntity).toEqual(entityMock);

    }
    );

    it('/POST create detail-delivers', async () => {

        const createdEntity: DetailDeliverDTO = (await request(app.getHttpServer())
            .post('/api/detail-delivers')
            .send(entityMock)
            .expect(201)).body;

        expect(createdEntity).toEqual(entityMock);

    }
    );

    it('/PUT update detail-delivers', async () => {


        const updatedEntity: DetailDeliverDTO = (await request(app.getHttpServer())
            .put('/api/detail-delivers')
            .send(entityMock)
            .expect(201)).body;


        expect(updatedEntity).toEqual(entityMock);

    }
    );

    it('/PUT update detail-delivers from id', async () => {


        const updatedEntity: DetailDeliverDTO = (await request(app.getHttpServer())
            .put('/api/detail-delivers/' + entityMock.id)
            .send(entityMock)
            .expect(201)).body;


        expect(updatedEntity).toEqual(entityMock);

    }
    );


    it('/DELETE detail-delivers', async () => {


        const deletedEntity: DetailDeliverDTO = (await request(app.getHttpServer())
            .delete('/api/detail-delivers/' + entityMock.id)
            .expect(204)).body;

            expect(deletedEntity).toEqual({});
    }
    );

    afterEach(async () => {
        await app.close();
    });
});

