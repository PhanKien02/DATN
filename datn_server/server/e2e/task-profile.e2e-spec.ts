import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { TaskProfileDTO } from '../src/service/dto/task-profile.dto';
import { TaskProfileService } from '../src/service/task-profile.service';

describe('TaskProfile Controller', () => {
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
        .overrideProvider(TaskProfileService)
        .useValue(serviceMock)
        .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all task-profiles ', async () => {

        const getEntities: TaskProfileDTO[] = (await request(app.getHttpServer())
        .get('/api/task-profiles')
        .expect(200)).body;

        expect(getEntities).toEqual(entityMock);

    }
    );

    it('/GET task-profiles by id', async () => {


        const getEntity: TaskProfileDTO = (await request(app.getHttpServer())
            .get('/api/task-profiles/' + entityMock.id)
            .expect(200)).body;

        expect(getEntity).toEqual(entityMock);

    }
    );

    it('/POST create task-profiles', async () => {

        const createdEntity: TaskProfileDTO = (await request(app.getHttpServer())
            .post('/api/task-profiles')
            .send(entityMock)
            .expect(201)).body;

        expect(createdEntity).toEqual(entityMock);

    }
    );

    it('/PUT update task-profiles', async () => {


        const updatedEntity: TaskProfileDTO = (await request(app.getHttpServer())
            .put('/api/task-profiles')
            .send(entityMock)
            .expect(201)).body;


        expect(updatedEntity).toEqual(entityMock);

    }
    );

    it('/PUT update task-profiles from id', async () => {


        const updatedEntity: TaskProfileDTO = (await request(app.getHttpServer())
            .put('/api/task-profiles/' + entityMock.id)
            .send(entityMock)
            .expect(201)).body;


        expect(updatedEntity).toEqual(entityMock);

    }
    );


    it('/DELETE task-profiles', async () => {


        const deletedEntity: TaskProfileDTO = (await request(app.getHttpServer())
            .delete('/api/task-profiles/' + entityMock.id)
            .expect(204)).body;

            expect(deletedEntity).toEqual({});
    }
    );

    afterEach(async () => {
        await app.close();
    });
});

