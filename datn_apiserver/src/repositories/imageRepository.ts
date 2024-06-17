import Image from "../domain/image.entity";
import { Repository } from "./baseRepository";

class ImageRepository extends Repository<Image> {
    constructor() {
        super(Image);
    }
}
export default new ImageRepository().repository();
