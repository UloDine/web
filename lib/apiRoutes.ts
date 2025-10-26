export const apiRoutes = {
  restaurant: {
    auth: {
      register: `/api/auth/restaurant/register`,
      login: `/api/auth/restaurant/login`,
      request_otp: `/api/auth/otp/request`,
      verify_otp: `/api/auth/otp/verify`,
    },
    fetchOverview: (id: string) =>
      `/api/restaurant/overview?restaurantId=${id}`,
    fetchById: (id: string) => `/api/restaurants/${id}`,
    fetchByEmail: (email: string) => `/api/restaurants/${email}`,
    updateBanner: (id: string) => `/api/restaurants/${id}/banner`,
    updateDescription: (id: string) => `/api/restaurants/${id}/description`,
    updateEmail: (id: string) => `/api/restaurants/${id}/email`,
    updatePhone: (id: string) => `/api/restaurants/${id}/phone`,
    updatePassword: (id: string) => `/api/restaurants/${id}/password`,
    updateName: (id: string) => `/api/restaurants/${id}/name`,
    block: (id: string) => `/api/restaurants/${id}/block`,
    unblock: (id: string) => `/api/restaurants/${id}/unblock`,
    delete: (id: string) => `/api/restaurants/${id}`,
    order: {
      create: `/api/restaurant/orders`,
      fetchById: (id: string, restaurantId: string) =>
        `/api/restaurant/orders/${id}/${restaurantId}`,
      fetchByReference: (reference: string, restaurantId: string) =>
        `/api/restaurant/orders/reference/${reference}/${restaurantId}`,
      fetchAllByRestaurant: (restaurantId: string) =>
        `/api/restaurant/orders/all?restaurantId=${restaurantId}`,
      fetchAllByCustomer: (customerId: string) =>
        `/api/restaurant/orders/customer/${customerId}`,
      cancelOrder: (customerId: string, id: string) =>
        `/api/restaurant/orders/cancel/${id}/${customerId}`,
      updateStatus: (id: string, restaurantId: string) =>
        `/api/restaurant/orders/update/${restaurantId}/${id}`,
      filterByStatus: (restaurantId: string, status: string) =>
        `/api/restaurant/orders/filter/status/${restaurantId}/${status}`,
      filterByDate: `/api/orders/filter/date`,
      fetchAll: `/api/orders`,
    },
    menu: {
      fetchAll: (restaurantId: string) =>
        `/api/restaurant/menu/all?restaurantId=${restaurantId}`,
      fetchById: (id: string, restaurantId: string) =>
        `/api/menu/${restaurantId}/${id}`,
      create: (restaurantId: string) =>
        `/api/restaurant/menu/create?restaurantId=${restaurantId}`,
      update: (id: string) => `/api/menu/${id}`,
      search: (restaurantId: string, query: string) =>
        `/api/menu/search/${restaurantId}/${encodeURIComponent(query)}`,
      filterByStatus: (restaurantId: string, status: string) =>
        `/api/menu/filter/status/${restaurantId}/${status}`,
      filterByStockStatus: (restaurantId: string, status: string) =>
        `/api/menu/filter/stock/${restaurantId}/${status}`,
      filterByCategory: (restaurantId: string, category: string) =>
        `/api/menu/filter/category/${restaurantId}/${category}`,
      updateStatus: (id: string, restaurantId: string, status: string) =>
        `/api/menu/status/${restaurantId}/${id}/${status}`,
      updateStockStatus: (id: string, restaurantId: string, status: number) =>
        `/api/menu/stock/${restaurantId}/${id}/${status}`,
      delete: (id: string, restaurantId: string) =>
        `/api/menu/${restaurantId}/${id}`,
    },
    qr: {
      fetchOverview: (id: string) => `/api/restaurant/qr?restaurantId=${id}`,
      generate: `/api/qr/create/`,
      update: (restaurantId: string) => `/api/qr/update/${restaurantId}`,
      delete: (restaurantId: string, id: string) =>
        `/api/qr/delete/${restaurantId}/${id}`,
    },
  },
};
