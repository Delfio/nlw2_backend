import convertHoursToMinutes from '../../utils/convertHoursToMinutes';

describe('Testar a funcionalidade de converter horas em minutos', () => {
    it('Espero que me retorne 60 minutos', () => {
        const time = '1:00';
        const minutos = convertHoursToMinutes(time);

        expect(minutos).toBe(60);
    });

    it('Espero que me retorne 120 minutos', () => {
        const time = '2:00';
        const minutos = convertHoursToMinutes(time);

        expect(minutos).toBe(120);
    })
})
