import districtsRepository from "../repositories/districtsRepository";
import provinceRepository from "../repositories/provinceRepository";
import wardRepository from "../repositories/wardRepository";

class ProvincesService {
    async getProvince() {
        return await provinceRepository.findAll({
            include: [
                {
                    model: districtsRepository,
                    include: [
                        {
                            model: wardRepository,
                        },
                    ],
                },
            ],
        });
    }
}
export default new ProvincesService();
