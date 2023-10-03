import {Request, Response} from 'express'
import { ListCategoryService } from '../../services/category/ListCategoryService'

class ListCategoryController{

    async handle(req: Request, res: Response){

        const listCategorieService = new ListCategoryService();

        const category = await listCategorieService.execute();

        return res.json(category);

    }
}

export {ListCategoryController}