import {fridgesModel} from "../models/fridgesModel.js"

export const fridgesService = {
        async getAllFridges() {

                return fridgesModel.getAllFridges();
        },

        async getFridgeById(fridgeId) {
                const fridge = await fridgesModel.getFridgeById(fridgeId);
                                if (!fridge) {
                                        throw new Error('Fridge not found');
                                }
                                return fridge;
        },

        async createFridge(newFridge) { 
                const {fridgeName,
                        fridgeType,
                        notes} = newFridge;
                const sanitizedFridge = {
                        fridgeName: fridgeName?.trim(),
                        fridgeType: fridgeType?.trim(),
                        notes
                }

                const createdFridge = fridgesModel.createFridge(sanitizedFridge);
                return createdFridge;
        },

        async editFridge(fridgeId, newValues) { 
                
                return {};
        },

        async deleteFridge(fridgeId) { 

                return { message: 'Fridge deleted successfully'};
        }
};