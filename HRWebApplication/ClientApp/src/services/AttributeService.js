import BaseService from './api/BaseService';

import {OrganizationUnitsClient, OrganizationUnit} from './ApiClient';

const SERVICE_NAME = '/ares';

class AttributeService extends BaseService {
  updateAttribute(body, id) {
    OrganizationUnit unit = new OrganizationUnit();
    const client = new OrganizationUnitsClient();
  }

  createAttribute(body) {
    return null;
  }

  getAllAttributes() {
    return null;
  }
}

export default AttributeService;
