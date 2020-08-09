export default function ConvertHourToMinutes(time: string): Number {
    
    const timeInMinutes = time.split(':').reduce((acumulator, currency, index) => {    
        if (index === 0) {
            return acumulator + Number(currency) * 60;
        }
        return acumulator + Number(currency);

    }, 0);


    return timeInMinutes;
}