import Database from '../database';
import { Request, Response } from 'express';
import CreateClassesService from '../services/CreateClasses.services'
import SelectClassesWithinFiltersServices from '../services/SelectClassesWithinFilters.services'

export default class ClassesController {

    public async index(request: Request, response: Response) {
        const {
            subject,
            week_day,
            filters,
            time
        } = request.query;
        try {
            if (!week_day || !subject || !filters || !time) {
                return response.status(401).json({
                    error: 'Filtros necessários para a filtragem'
                });
            }
            
            const selectClassesWithinFiltersServices = new SelectClassesWithinFiltersServices();

            await selectClassesWithinFiltersServices.Execute({
                filters: filters as string,
                subject: subject as string,
                time: time as string,
                week_day: (week_day as unknown) as number,
            })

            return response.json({
                ok: true
            })
        } catch(err) {

        }
    }

    public async create(request: Request, response: Response) { 
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;

        try {
            const createClassService = new CreateClassesService();

            await createClassService.Execute({
                name,
                avatar,
                bio,
                cost,
                schedule,
                subject, 
                whatsapp
            });
    
            return response.status(201).json();

        } catch (err) {
            return response
                .status(400)
                .json({
                    erro: err.message
                })
        }
    }
}