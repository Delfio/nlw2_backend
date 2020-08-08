import Database from '../../database';

describe('Teste responsável por avaliar os campos no banco de dados', () => {
    
    beforeAll(async () => {
        await Database.migrate.rollback()
        await Database.migrate.latest()
    }, 3000);

    afterAll(async() => {
        await Database.migrate.rollback()
    })

    it('Espero que as tabelas principais estejam criadas', async () => {
        try {
            await Database('users').select('*')
            await Database('classes').select('*')
            await Database('classe_schedule').select('*')
            await Database('connections').select('*')

        } catch(err) {
            expect(err).toBe(null)
        }
    })

})
