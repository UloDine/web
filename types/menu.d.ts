interface Menu {
  id: string;
  image: string;
  name: string;
  description: string;
  category:
    | "Appetizers"
    | "Soups"
    | "Salads"
    | "Main Course"
    | "Side Dishes"
    | "Fast Food"
    | "Seafood"
    | "Vegetarian"
    | "Vegan"
    | "Pasta"
    | "Pizza"
    | "Rice Dishes"
    | "Grilled"
    | "Beverages"
    | "Desserts"
    | "Bakery"
    | "Breakfast"
    | "Brunch"
    | "Snacks"
    | "Street Food"
    | "Asian"
    | "Mexican"
    | "Italian"
    | "Indian"
    | "Middle Eastern"
    | "African"
    | "Caribbean"
    | "BBQ"
    | "Healthy"
    | "Gluten-Free"
    | "Keto"
    | "Organic";
  stockStatus: "Available" | "Out of Stock";
  status: "Ready" | "Not Ready";
  price: number;
}

interface MenuData {
  id: string;
  item_name: string;
  category: string;
  restaurant_id: string;
  price: string;
  item_description: string;
  prep_status: string;
  stock_status: string;
  discount: number;
  menu_image: string;
  date_created: string;
  updated_at: string;
}

interface MenuContextProps {
  // Modal controls
  toggleModal: () => void;
  createMenu: () => Promise<void>;
  updateMenu: (menu?: MenuForm) => Promise<void>;
  editMenu: (menu: MenuEditDraft) => void;
  deleteMenu: (menuId: string, restaurantId: string) => Promise<void>;
  updateMenuStatus: (
    menuId: string,
    restaurantId: string,
    status: string,
  ) => Promise<void>;
  updateMenuStockStatus: (
    menuId: string,
    restaurantId: string,
    status: string,
  ) => Promise<void>;

  // Data and loading
  data: ListData<MenuData> | null;
  loading: boolean;
  refetch: () => void;

  // Filter states
  keyword: string;
  setKeyword: (keyword: string) => void;
  page: number;
  setPage: (page: number) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  sortOrder: "ASC" | "DESC";
  setSortOrder: (order: "ASC" | "DESC") => void;
  limit: number;
  setLimit: (limit: number) => void;
  stockStatus: string;
  setStockStatus: (status: string) => void;
  itemStatus: string;
  setItemStatus: (status: string) => void;
  openFilter: boolean;
  setOpenFilter: (open: boolean) => void;
}

interface MenuForm {
  title: string;
  image: File | null;
  name: string;
  description: string;
  status: string;
  category: string;
  stockStatus: string;
  price: string;
  discount: string;
  restaurantId: string;
}

interface MenuEditDraft {
  id: string;
  restaurant_id: string;
  item_name: string;
  item_description: string;
  category: string;
  stock_status: string;
  prep_status: string;
  price: string | number;
  discount?: number | string;
  menu_image: string;
}
