import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { DetailReceiveDTO } from '../src/service/dto/detail-receive.dto';
import { DetailReceiveService } from '../src/service/detail-receive.service';

describe('DetailReceive Controller', () => {
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
        .overrideProvider(DetailReceiveService)
        .useValue(serviceMock)
        .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all detail-receives ', async () => {

        const getEntities: DetailReceiveDTO[] = (await request(app.getHttpServer())
        .get('/api/detail-receives')
        .expect(200)).body;

        expect(getEntities).toEqual(entityMock);

    }
    );

    it('/GET detail-receives by id', async () => {


        const getEntity: DetailReceiveDTO = (await request(app.getHttpServer())
            .get('/api/detail-receives/' + entityMock.id)
            .expect(200)).body;

        expect(getEntity).toEqual(entityMock);

    }
    );

    it('/POST create detail-receives', async () => {

        const createdEntity: DetailReceiveDTO = (await request(app.getHttpServer())
            .post('/api/detail-receives')
            .send(entityMock)
            .expect(201)).body;

        expect(createdEntity).toEqual(entityMock);

    }
    );

    it('/PUT update detail-receives', async () => {


        const updatedEntity: DetailReceiveDTO = (await request(app.getHttpServer())
            .put('/api/detail-receives')
            .send(entityMock)
            .expect(201)).body;


        expect(updatedEntity).toEqual(entityMock);

    }
    );

    it('/PUT update detail-receives from id', async () => {


        const updatedEntity: DetailReceiveDTO = (await request(app.getHttpServer())
            .put('/api/detail-receives/' + entityMock.id)
            .send(entityMock)
            .expect(201)).body;


        expect(updatedEntity).toEqual(entityMock);

    }
    );


    it('/DELETE detail-receives', async () => {


        const deletedEntity: DetailReceiveDTO = (await request(app.getHttpServer())
            .delete('/api/detail-receives/' + entityMock.id)
            .expect(204)).body;

            expect(deletedEntity).toEqual({});
    }
    );

    afterEach(async () => {
        await app.close();
    });
});

