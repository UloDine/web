interface FilterObject {
  title: string;
  items: string[];
}

interface FilterProps {
  filters: FilterGroup[];
  action: (selected: FilterOption[]) => void;
  onClose: () => void;
  selectedFilters?: FilterOption[];
  updateSelectedFilters?: (newList: FilterOption[]) => void;
}

interface FilterOption {
  key: string; // e.g. "status", "category", "stock"
  value: string; // e.g. "active", "pizza", "in_stock"
}

interface FilterGroup {
  title: string; // e.g. "Status"
  items: FilterOption[];
}
