import { UserRoles } from "../domain/Enums/userRoles";
import authorityRepository from "../repositories/authorityRepository";
import routeDriverRepository from "../repositories/routeDriverRepository";
import userRepository from "../repositories/userRepository";
import { BadRequestError } from "../utils/httpErrors";

class RouteDriverService {
    async trackingLocation(idDriver: number, lat: number, long: number) {
        const role = await authorityRepository.findOne({
            where: {
                name: UserRoles.DRIVER,
            },
        });
        const driver = await userRepository.findOne({
            where: {
                id: idDriver,
                roleId: role.id,
            },
        });
        if (!driver) throw new BadRequestError("User Không Tồn Tại");
        return await routeDriverRepository.create({
            lat: lat,
            long: long,
            time: new Date(),
            driverId: driver.id,
        });
    }
}
export default new RouteDriverService();
