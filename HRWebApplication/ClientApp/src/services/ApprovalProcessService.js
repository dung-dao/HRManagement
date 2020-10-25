import BaseService from './api/BaseService';

const SERVICE_NAME = '/athena';

class ApprovalProcessService extends BaseService {
  getRequestProductHistories(statusRequest, offset, limit) {
    return null;
  }

  confirmRequest(id, body) {
    return null;
  }

  confirmMultipleRequets(body, multiple) {
    return null;
  }

  getRequest(id) {
    return null;
  }
}

export default ApprovalProcessService;
