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

interface MenuContextProps {
  toggleModal: () => void;
  createMenu: (menu: MenuForm) => void;
  updateMenu: (details: any) => void;
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
}
