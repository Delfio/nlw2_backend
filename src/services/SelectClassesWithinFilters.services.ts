import database from '../database';
import ConvertHourToMinute from '../utils/convertHoursToMinutes';
import AplyFiltersIntoSearchClassDTO from '../dtos/AplyFiltersIntoSearchClassDTO';
import IUserEntity from '../interfaces/IUsers';
import IClasses from '../interfaces/IClasses';


interface ResponseDTO extends IClasses {
    users: IUserEntity[];
}

export default class SelectClassesWithinFilters {
    public async Execute({
        filters,
        subject,
        time,
        week_day
    }: AplyFiltersIntoSearchClassDTO): Promise<ResponseDTO | undefined> {
        
        try {
            const timeMinuets = ConvertHourToMinute(time);

            const classes: IClasses[] = await database('classes')
                .select('*')
                .where('classes.subject', '=', subject)

            const usersID: string[] = classes.map(classe => {
                const { user_id } = classe;
                return String(user_id);
            });

            const users: IUserEntity[] = await database('users')
                .select('*')
                .whereIn('id', usersID);

            const response: ResponseDTO = {
                ...classes[0],
                users
            }
            
            return response;
        } catch (err){
            console.log(err.message);
        }
        
    }
}