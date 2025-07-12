import { API_BASE_URL } from "@/env";

export const BASE_API = {
  restaurant: API_BASE_URL,
};

export const apiRoutes = {
  restaurant: {
    auth: {
      register: `${BASE_API.restaurant}/api/auth/restaurant/register`,
      login: `${BASE_API.restaurant}/api/auth/restaurant/login`,
      request_otp: `${BASE_API.restaurant}/api/auth/send-otp`,
      verify_otp: `${BASE_API.restaurant}/api/auth/verify-otp`,
    },
    fetchOverview: `${BASE_API.restaurant}/api/restaurants/overview`,
    fetchById: (id: string) => `${BASE_API.restaurant}/api/restaurants/${id}`,
    fetchByEmail: (email: string) =>
      `${BASE_API.restaurant}/api/restaurants/${email}`,
    updateBanner: (id: string) =>
      `${BASE_API.restaurant}/api/restaurants/${id}/banner`,
    updateDescription: (id: string) =>
      `${BASE_API.restaurant}/api/restaurants/${id}/description`,
    updateEmail: (id: string) =>
      `${BASE_API.restaurant}/api/restaurants/${id}/email`,
    updatePhone: (id: string) =>
      `${BASE_API.restaurant}/api/restaurants/${id}/phone`,
    updatePassword: (id: string) =>
      `${BASE_API.restaurant}/api/restaurants/${id}/password`,
    updateName: (id: string) =>
      `${BASE_API.restaurant}/api/restaurants/${id}/name`,
    block: (id: string) => `${BASE_API.restaurant}/api/restaurants/${id}/block`,
    unblock: (id: string) =>
      `${BASE_API.restaurant}/api/restaurants/${id}/unblock`,
    delete: (id: string) => `${BASE_API.restaurant}/api/restaurants/${id}`,
    order: {
      create: `${BASE_API.restaurant}/api/orders`,
      fetchById: (id: string, restaurantId: string) =>
        `${BASE_API.restaurant}/api/orders/${id}/${restaurantId}`,
      fetchByReference: (reference: string, restaurantId: string) =>
        `${BASE_API.restaurant}/api/orders/reference/${reference}/${restaurantId}`,
      fetchAllByRestaurant: (restaurantId: string) =>
        `${BASE_API.restaurant}/api/orders/restaurant/${restaurantId}`,
      fetchAllByCustomer: (customerId: string) =>
        `${BASE_API.restaurant}/api/orders/customer/${customerId}`,
      cancelOrder: (customerId: string, id: string) =>
        `${BASE_API.restaurant}/api/orders/cancel/${id}/${customerId}`,
      updateStatus: (id: string, restaurantId: string) =>
        `${BASE_API.restaurant}/api/orders/update/${restaurantId}/${id}`,
      filterByStatus: (restaurantId: string, status: string) =>
        `${BASE_API.restaurant}/api/orders/filter/status/${restaurantId}/${status}`,
      filterByDate: `${BASE_API.restaurant}/api/orders/filter/date`,
      fetchAll: `${BASE_API.restaurant}/api/orders`,
    },
    menu: {
      fetchAll: (restaurantId: string) =>
        `${BASE_API.restaurant}/api/menu/restaurant/${restaurantId}`,
      fetchById: (id: string, restaurantId: string) =>
        `${BASE_API.restaurant}/api/menu/${restaurantId}/${id}`,
      create: `${BASE_API.restaurant}/api/menu/`,
      update: (id: string) => `${BASE_API.restaurant}/api/menu/${id}`,
      search: (restaurantId: string, query: string) =>
        `${
          BASE_API.restaurant
        }/api/menu/search/${restaurantId}/${encodeURIComponent(query)}`,
      filterByStatus: (restaurantId: string, status: string) =>
        `${BASE_API.restaurant}/api/menu/filter/status/${restaurantId}/${status}`,
      filterByStockStatus: (restaurantId: string, status: string) =>
        `${BASE_API.restaurant}/api/menu/filter/stock/${restaurantId}/${status}`,
      filterByCategory: (restaurantId: string, category: string) =>
        `${BASE_API.restaurant}/api/menu/filter/category/${restaurantId}/${category}`,
      updateStatus: (id: string, restaurantId: string, status: string) =>
        `${BASE_API.restaurant}/api/menu/status/${restaurantId}/${id}/${status}`,
      updateStockStatus: (id: string, restaurantId: string, status: number) =>
        `${BASE_API.restaurant}/api/menu/stock/${restaurantId}/${id}/${status}`,
      delete: (id: string, restaurantId: string) =>
        `${BASE_API.restaurant}/api/menu/${restaurantId}/${id}`,
    },
    qr: {
      generate: `${BASE_API.restaurant}/api/qr/create/`,
      update: (restaurantId: string) =>
        `${BASE_API.restaurant}/api/qr/update/${restaurantId}`,
      delete: (restaurantId: string, id: string) =>
        `${BASE_API.restaurant}/api/qr/delete/${restaurantId}/${id}`,
    },
  },
};
