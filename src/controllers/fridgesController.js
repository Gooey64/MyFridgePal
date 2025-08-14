import {fridgesService} from "../services/fridgesService.js"

export const fridgesController = {
        async getAllFridges(req, res) {
                try {
                        const fridges = await fridgesService.getAllFridges();
                        res.status(200).json(fridges);
                }
                catch (error) {
                        res.status(500).send({message: 'Internal Server Error'});
                }
                
        },

        async getFridgeById(req, res) {
                try {
                        const fridgeId = parseInt(req.params.id);
                        const fridge = await fridgesService.getFridgeById(fridgeId);
                        res.status(200).json(fridge);

                }
                catch (error) {
                        res.status(500).send({message: 'Internal Server Error'});
                }
        },

        async createFridge(req, res) {
                try {
                        const fridge = await fridgesService.createFridge(req.body);
                        res.status(200).json(fridge);
                }
                catch (error) {
                        res.status(500).send({message: 'Internal Server Error'});
                }
        },

        async editFridge(req, res) {
                try {
                        const fridgeId = parseInt(req.params.id);
                        const fridge = await fridgesService.editFridge(fridgeId, req.body);
                        res.status(200).json(fridge);
                }
                catch (error) {
                        res.status(500).send({message: 'Internal Server Error'});
                }
        },

        async deleteFridge(req, res) {
                try {
                        const fridgeId = parseInt(req.params.id);
                        const fridge = await fridgesService.deleteFridge(fridgeId);
                        res.status(200).json(fridge);
                }
                catch (error) {
                        res.status(500).send({message: 'Internal Server Error'});
                }
        }
}