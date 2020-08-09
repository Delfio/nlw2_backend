import request from 'supertest';
import Server from '../../server';
import database from '../../database';
import supertest from 'supertest';

describe('Testes responsáveis pelas rotas de aulas', () => {

    beforeAll(async () => {
        try {
            await database('classes').select('*');

            await database.migrate.rollback();
            await database.migrate.latest();
        } catch(err) {
            await database.migrate.latest();

        }
    }, 2000)

    afterEach(async () => {
        await database.migrate.rollback();
    }, 3000);

    beforeEach( async() => {
        await database.migrate.latest()
    })

    interface CreateClassesDTO {
        subject?: string,
        cost?: string,
        name?: string,
        schedule?: {
            week_day: number,
            from: string,
            to: string
        }
    }

    const createClasses = async ({
        cost,
        schedule,
        subject,
        name
    }: CreateClassesDTO) => {
        const novaClasse = {
            name: !name ? "Delfio Francisco": name,
            avatar: "https://www.google.com.br",
            whatsapp: "99999999",
            bio: "bio teste 123  Jhow Doe",
            subject: !subject ? "Matemática": subject,
            cost: !cost ? "150": cost,
            schedule: !schedule ? [
                {
                    week_day: 1,
                    from: "8:00",
                    to: "12:00"
                },
                {
                    week_day: 3,
                    from: "10:00",
                    to: "18:00"
                },
                {
                    week_day: 4,
                    from: "8:00",
                    to: "12:00"
                }
            ]: schedule
        }

        const response = await request(Server).post('/classes').send(novaClasse);
        
        return response;
    }

    it('Espero que me retorne os dados referentes a criação de classes completos', async() => {
        const novaClasse = {
            name: "Delfio Francisco",
            avatar: "https://www.google.com.br",
            whatsapp: "99999999",
            bio: "bio teste 123  Jhow Doe",
            subject: "Matemática",
            cost: "150",
            schedule: [
                {
                    week_day: 1,
                    from: "8:00",
                    to: "12:00"
                },
                {
                    week_day: 3,
                    from: "10:00",
                    to: "18:00"
                },
                {
                    week_day: 4,
                    from: "8:00",
                    to: "12:00"
                }
            ]
        }

        const response = await request(Server).post('/classes').send(novaClasse);
        
        expect(response.status).toBe(201);

        const userExists = await database('users')
            .select(['name', 'bio', 'avatar', 'id'])
            .where('name', '=', novaClasse.name)
            .first();

        expect(userExists.name).toEqual(novaClasse.name);

        const classeExists = await database('classes')
            .select(['subject', 'cost', 'user_id', 'id'])
            .where('user_id', '=', userExists.id)
            .first();

        expect(classeExists).toEqual({
            subject: novaClasse.subject,
            cost: Number(novaClasse.cost),
            user_id: userExists.id,
            id: 1
        });

        const classScheduleHasBenCreated = await database('classe_schedule')
            .select(['week_day', 'from', 'to'])
            .where('class_id', '=', classeExists.id);

        expect(
            classScheduleHasBenCreated
            .length === novaClasse.schedule.length
            ).toBe(true);
    });

    it('Espero que me retorne um erro, pois não estou enviando as informações corretas',  async () => {

        const resposne = await supertest(Server).get('/classes');
        // subject,
        // week_day,
        // filters,
        // time

        expect(resposne.status).toBe(401);

    })

    it('Espero que me retorne as informações de classes com filtros aplicado', async () => {
        
        await createClasses({});
        await createClasses({
            cost: '55',
            name: 'Jhow Doe 2',
            subject: "Matemática"
        });

        const filtros = {
            week_day: 1,
            subject: 'Matemática',
            filters: "ddd",
            time: '9:00'
        };

        const response = await supertest(Server).get('/classes').query(filtros);

        console.log(response.body);
        
        expect(response.body !== null || '').toBe(true);
    })
})