import Database from '../database';
import CreateClassesDTO from '../dtos/CreateClassesDTO';
import ConvertHourToMinutes from '../utils/convertHoursToMinutes';


export default class CreateClasses{
    public async Execute({
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost,
        schedule
    }: CreateClassesDTO) {
        const transaction = await Database.transaction();
        try {
            
            const [user_id] = await transaction('users').insert({
                name,
                avatar,
                whatsapp,
                bio,
            });

            const [class_id] = await transaction('classes').insert({
                subject,
                cost,
                user_id
            });


            const classSchedule = schedule.map((item) => {
                const { from, to, week_day } = item;
                return {
                    week_day,
                    from: ConvertHourToMinutes(from),
                    to: ConvertHourToMinutes(to),
                    class_id
                }
            });

            await transaction('classe_schedule').insert(classSchedule);
            
            return transaction.commit();
        } catch (err) {
            transaction.rollback();
        }
    }
}