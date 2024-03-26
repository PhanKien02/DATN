import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { TypeProductDTO } from '../src/service/dto/type-product.dto';
import { TypeProductService } from '../src/service/type-product.service';

describe('TypeProduct Controller', () => {
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
        .overrideProvider(TypeProductService)
        .useValue(serviceMock)
        .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all type-products ', async () => {

        const getEntities: TypeProductDTO[] = (await request(app.getHttpServer())
        .get('/api/type-products')
        .expect(200)).body;

        expect(getEntities).toEqual(entityMock);

    }
    );

    it('/GET type-products by id', async () => {


        const getEntity: TypeProductDTO = (await request(app.getHttpServer())
            .get('/api/type-products/' + entityMock.id)
            .expect(200)).body;

        expect(getEntity).toEqual(entityMock);

    }
    );

    it('/POST create type-products', async () => {

        const createdEntity: TypeProductDTO = (await request(app.getHttpServer())
            .post('/api/type-products')
            .send(entityMock)
            .expect(201)).body;

        expect(createdEntity).toEqual(entityMock);

    }
    );

    it('/PUT update type-products', async () => {


        const updatedEntity: TypeProductDTO = (await request(app.getHttpServer())
            .put('/api/type-products')
            .send(entityMock)
            .expect(201)).body;


        expect(updatedEntity).toEqual(entityMock);

    }
    );

    it('/PUT update type-products from id', async () => {


        const updatedEntity: TypeProductDTO = (await request(app.getHttpServer())
            .put('/api/type-products/' + entityMock.id)
            .send(entityMock)
            .expect(201)).body;


        expect(updatedEntity).toEqual(entityMock);

    }
    );


    it('/DELETE type-products', async () => {


        const deletedEntity: TypeProductDTO = (await request(app.getHttpServer())
            .delete('/api/type-products/' + entityMock.id)
            .expect(204)).body;

            expect(deletedEntity).toEqual({});
    }
    );

    afterEach(async () => {
        await app.close();
    });
});

