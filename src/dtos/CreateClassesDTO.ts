interface schedule {
    week_day: number,
    from: string,
    to: string
}

export default interface CreateClassesDTO {
    name: string,
    avatar: string,
    whatsapp: string,
    bio: string,
    subject: string,
    cost: string,
    schedule: schedule[]
}


/**
 *         const novaClasse = {
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
 */