export class ROUTER_URL {
  static OVERVIEW_PAGE = '/admin';
  static CATEGORY_PAGE = '/admin/category';
  static ATTRIBUTE_PAGE = '/admin/attributes';
  static GROUP_SET_ATTRIBUTE_PAGE = '/admin/set-attributes';
  static CONFIRM_PRODUCTS_PAGE = '/staff/confirm-products';
  static DETAIL_CONFIRM_PRODUCTS_PAGE = '/staff/confirm-products/:id';
  static MERCHANTS_PAGE = '/staff/merchants';
  static MERCHANT_DETAIL_PAGE = '/staff/merchant-detail/:id';
  static MERCHANT_ADD_PAGE = '/staff/merchant-add';
  static LOGIN_PAGE = '/login';
  static DEFAULT_PAGE = '/';
}

export class API {
  static BASE_URL = 'http://localhost:8081';
}

export class MENU {
  static OVERVIEW_MENU = 'OVERVIEW_MENU';
  static PARENT_CATEGORY_MENU = 'PARENT_CATEGORY_MENU';
  static CATEGORY_MENU = 'CATEGORY_MENU';
  static ATTRIBUTE_MENU = 'ATTRIBUTE_MENU';
  static CONFIRM_PRODUCTS_PAGE = 'CONFIRM_PRODUCTS_PAGE';
  static MERCHANTS_PAGE = 'MERCHANTS_PAGE';
  static GROUP_SET_ATTR_MENU = 'GROUP_SET_ATTR_MENU'; // cluste plenty of groups containing attributes
}

export class AR_RESPONSE_CODE {
  static S100 = 'AR_S100'; //  success with body
  static S101 = 'AR_S101'; // success with empty body
  static E100 = 'AR_E100'; // invalid body
  static E101 = 'AR_E101'; // logical error
}

export class STATUS_REQUEST {
  static NEW = 0;
  static PENDING = 1;
  static APPROVED = 2;
  static REJECTED = 3;
  static CANCELED = 4;
}

export class AT_RESPONSE_CODE {
  static S100 = 'AT_S100'; //  success with body
  static S101 = 'AT_S101'; // success with empty body
  static E100 = 'AT_E100'; // invalid body
  static E101 = 'AT_E101'; // logical error
}

export class EVENT_TYPE {
  static CREATE_PRODUCT = 'CREATE_PRODUCT';
  static IMPORTED_PRODUCTs = 'IMPORTED_PRODUCTs';
  static UPDATE_PRODUCT = 'UPDATE_PRODUCT';
  static DELETE_PRODUCTS = 'DELETE_PRODUCTS';
}

export const MAX_PAGE = 10;

export const FAILED_MESSAGE = 'Xử lí đang quá tải!\nXin hãy thử lại!';

export const THEME_COLOR = '#1890ff';

export const URL = 'http://localhost:3002';

export const FOTTER_TEXT = '© 2020 WeWear Inc. All rights reserved';
