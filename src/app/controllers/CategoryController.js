import Category from '../models/Category';

class CategoryController{

    async index(req, res){

        return res.json({user: req.userId})
    }

    async store(req, res){
        return res.json({user: req.userId})
    }

    async show(req, res){
        return res.json({user: req.userId})
    }

    async update(req, res){
        return res.json({user: req.userId})
    }

    async destroy(req, res){
        return res.json({user: req.userId})
    }
}

export default new CategoryController();