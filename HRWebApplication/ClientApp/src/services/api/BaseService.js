
export default class BaseService {

    constructor() {
        this.headers = {
            "content-type": "application/json"
        }
    }

    cancel() {
        this.source.cancel('');
    }
}