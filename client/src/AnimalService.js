import axios from 'axios';
const url = 'api/animals/';

class AnimalService {
    
    // Get Animal
    static getAnimals() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(animal => ({
                        ...animal,
                        createdAt:new Date()
                    }))
                );
            } catch(err) {
                reject(err);
            }
        })
    }

    // Create Animal
    static insertAnimal(text) {
        return axios.post(url, {
            text
        });
    }    
    // Delete Animal
    static deleteAnimal(id){
        return axios.delete(`${url}${id}`);
    }
}

export default AnimalService;