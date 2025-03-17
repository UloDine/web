declare global {
  interface FilterObject {
    title: string;
    items: string[];
  }

  interface FilterProps {
    filters: FilterObject[];
    action: (filter: string[]) => void;
    onClose: () => void;
    selectedFilters?: string[];
    updateSelectedFilters?: (newList: string[]) => void;
  }
}

export {};
