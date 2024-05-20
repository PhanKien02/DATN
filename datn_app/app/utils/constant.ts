export const Loading = {
  disable: "disable_loading",
}
export const MAP_4D_KEY = "5307d797a1932e132e2942280dd07173"
export enum EVENT_REGISTER {
  EVENT_LOG_OUT = "EVENT_LOG_OUT",
  RESET_NAVIGATION = "RESET_NAVIGATION",
  UPDATE_PRODUCTS = "UPDATE_PRODUCTS",
  CANNOT_CONNECT = "CANNOT_CONNECT",
  RELOAD_ORDER = "RELOAD_ORDER",
  RELOAD_COMPLETED_ORDER = "RELOAD_COMPLETED_ORDER",
}

export enum KIND_STATUS {
  OK = "ok",
  NOT_FOUND = "not-found",
  CANNOT_CONNECT = "cannot-connect",
  BAD_DATA = "bad-data",
  UNAUTHORIZED = "unauthorized",
  FORBIDDEN = "forbidden",
  REJECTED = "rejected",
  SERVER = "server",
  TIMEOUT = "timeout",
  UNKNOWN = "unknown",
}

export enum ORDER_STATUS {
  ORDER_CREATED = "ORDER_CREATED",
  OPEN_ORDER = "OPEN_ORDER",
  ORDER_COMPLETED = "ORDER_COMPLETED",
  ORDER_CANCELLED = "ORDER_CANCELLED",
  ORDER_PROCESSING = "ORDER_PROCESSING",
  ORDER_CONFIRM = "ORDER_CONFIRM"
}

export const ITEMS_LIMIT = 15

export enum ERROR_CODE {
  ACCOUNT_NOT_BRAND = "ACCOUNT_NOT_BRAND"
}

export enum LOCATION_TYPE {
  PROVINCE = "Tỉnh/Thành",
  DISTRICT = "Quận/Huyện",
  WARD = "Phường/Xã",
}

export const TABS = [
  {
    name: "Fibo Cart",
    icon: "invoices"
  },
  {
    name: "Hàng hóa",
    icon: "merchandise"
  }, {
    name: "Bán tại quầy",
    icon: "cart"
  }, {
    name: "Tổng quan",
    icon: "dashboard"
  }, {
    name: "Tài khoản",
    icon: "user"
  }
]
export const IMAGES_BASE_URL = `http://139.180.128.230:8080/ofbizinterfacetest/api/v1/upload/file/decoder`

export enum PRODUCT_STATUS {
  ALL = "all",
  NOT_SALE = "editing",
  WAITING_APPROVE = "pending",
  APPROVED = "approved"
}

export const STATUS_RENDER = {
  all: "Tất cả",
  editing: "Chưa đăng bán",
  pending: "Đang chờ duyệt",
  approved: "Đang bán"
}

export const LIST_STATUS_FILTER = [
  {
    key: "all",
    value: STATUS_RENDER.all
  },
  {
    key: "editing",
    value: STATUS_RENDER.editing
  }, {
    key: "pending",
    value: STATUS_RENDER.pending
  }, {
    key: "approved",
    value: STATUS_RENDER.approved
  }
]

export enum CART_QUANTITY {
  SUBTRACT = "SUBTRACT",
  PLUS = "PLUS"
}

export enum ORDER_STORE_STATUS {
  EDITING = "editing",
  COMPLETED = "completed"
}
