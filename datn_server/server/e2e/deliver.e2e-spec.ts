import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { DeliverDTO } from '../src/service/dto/deliver.dto';
import { DeliverService } from '../src/service/deliver.service';

describe('Deliver Controller', () => {
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
        .overrideProvider(DeliverService)
        .useValue(serviceMock)
        .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all delivers ', async () => {

        const getEntities: DeliverDTO[] = (await request(app.getHttpServer())
        .get('/api/delivers')
        .expect(200)).body;

        expect(getEntities).toEqual(entityMock);

    }
    );

    it('/GET delivers by id', async () => {


        const getEntity: DeliverDTO = (await request(app.getHttpServer())
            .get('/api/delivers/' + entityMock.id)
            .expect(200)).body;

        expect(getEntity).toEqual(entityMock);

    }
    );

    it('/POST create delivers', async () => {

        const createdEntity: DeliverDTO = (await request(app.getHttpServer())
            .post('/api/delivers')
            .send(entityMock)
            .expect(201)).body;

        expect(createdEntity).toEqual(entityMock);

    }
    );

    it('/PUT update delivers', async () => {


        const updatedEntity: DeliverDTO = (await request(app.getHttpServer())
            .put('/api/delivers')
            .send(entityMock)
            .expect(201)).body;


        expect(updatedEntity).toEqual(entityMock);

    }
    );

    it('/PUT update delivers from id', async () => {


        const updatedEntity: DeliverDTO = (await request(app.getHttpServer())
            .put('/api/delivers/' + entityMock.id)
            .send(entityMock)
            .expect(201)).body;


        expect(updatedEntity).toEqual(entityMock);

    }
    );


    it('/DELETE delivers', async () => {


        const deletedEntity: DeliverDTO = (await request(app.getHttpServer())
            .delete('/api/delivers/' + entityMock.id)
            .expect(204)).body;

            expect(deletedEntity).toEqual({});
    }
    );

    afterEach(async () => {
        await app.close();
    });
});

