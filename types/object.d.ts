interface Currency {
  code: string;
  name: string;
  symbol: string;
}

interface TimeZone {
  name: string;
  offset: number;
  offset_with_dst: number;
  current_time: string;
  current_time_unix: number;
  is_dst: boolean;
  dst_savings: number;
  dst_exists: boolean;
  dst_start: string;
  dst_end: string;
}

interface IPGeolocation {
  ip: string;
  continent_code: string;
  continent_name: string;
  country_code2: string;
  country_code3: string;
  country_name: string;
  country_name_official: string;
  country_capital: string;
  state_prov: string;
  state_code: string;
  district: string;
  city: string;
  zipcode: string;
  latitude: string;
  longitude: string;
  is_eu: boolean;
  calling_code: string;
  country_tld: string;
  languages: string;
  country_flag: string;
  geoname_id: string;
  isp: string;
  connection_type: string;
  organization: string;
  country_emoji: string;
  currency: Currency;
  time_zone: TimeZone;
}

interface Restaurant {
  businessName: string;
  email: string;
  id: string;
  plan: "free" | "premium" | "enterprise";
}

interface PageTitle {
  title: string;
  rightContent?: any;
}

interface Filter {
  selected: string;
  action: (e: string) => void;
  filter: string[];
}

interface OverviewCard {
  label: string;
  icon: React.ReactNode | null;
  rate: number;
  count: number | string;
  filterItems: Filter | null;
}

interface Feedback {
  id: string;
  username: string;
  profile: string;
  content: string;
  rating: number;
}

interface EmptyScreen {
  icon?: React.ReactNode;
  title?: string;
  subTitle?: string;
  showButton?: boolean;
  buttonLabel?: string;
  action?: () => void;
  buttonColor?: buttonColor;
  buttonLabelColor?: string;
}

interface ReportCard {
  icon: React.ReactNode;
  label: string;
  value: number | string;
}

interface NavElement {
  label: string;
  path: string;
}

interface WhyData {
  image: string;
  title: string;
  description: string;
}

interface HowData {
  image: string;
  title: string;
  description: string;
  step: string;
}

interface Pricing {
  plan: "Free" | "Pro" | "Premium" | "Enterprise";
  price: number;
  details: string[];
}

interface LinkPair {
  label: string;
  path: string;
}

interface FooterObject {
  title: string;
  links: LinkPair[];
}

interface SocialObject {
  icon: React.ReactNode;
  link: string;
}

interface AppLinkObject {
  icon: React.ReactNode;
  link: string;
}

interface TabData {
  label: string;
  value: string;
  action: () => void;
  icon?: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  subLabel?: string;
  subLabelColor?: string;
  subLabelAction?: () => void;
  subLabelIcon?: React.ReactNode;
  subLabelDisabled?: boolean;
}

interface WindowSize {
  width: number;
  height: number;
}

type Theme = "light" | "dark";

type AppType = "restaurant" | "customer" | "visitor";

interface AppContextType {
  windowSize: WindowSize;
  isOnline: boolean;
  theme: Theme;
  type: AppType;
  setType: React.Dispatch<React.SetStateAction<AppType>>;
}

interface Profile {
  user: User | null;
  restaurant: Restaurant | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setRestaurant: React.Dispatch<React.SetStateAction<Restaurant | null>>;
  updateProfileStore: (payload: {
    user: User;
    restaurant: Restaurant;
    accountType?: AccountType;
  }) => void;
}

interface User {
  id: string;
  user_role: string;
  email: string;
}

interface Restaurant {
  id: string;
  business_name: string;
  business_plan: string;
}

interface CopyText {
  text: string;
  textToCopy: string;
  onCopied?: () => void;
  onCopyError?: (err: any) => void;
}

interface ListData<T> {
  pagination: Pagination;
  result: T[];
}

interface Pagination {
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface QRResponse {
  qr_code: string;
  restaurant_url: string;
  business_name: string;
  pdfPath: string;
  imgPath: string;
}
