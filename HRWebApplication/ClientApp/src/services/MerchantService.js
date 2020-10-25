
import axiosAPI from './api/api';
import BaseService from './api/BaseService';


const SERVICE_NAME = '/';

class MerchantService extends BaseService {

    createMerchant(body) {
        return axiosAPI.post(`${SERVICE_NAME}/merchants/create`,
            JSON.stringify(body),
            {
                cancelToken: this.source.token
            }
        );
    }

    getAllMerchants() {
        return axiosAPI.get(`${SERVICE_NAME}/merchants`,
            {
                cancelToken: this.source.token
            }
        );
    }

}

export default MerchantService;
