import { ReactNode } from "react";

declare global {
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
    icon: ReactNode | null;
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
    icon?: ReactNode;
    title?: string;
    subTitle?: string;
    button?: boolean;
    buttonLabel?: string;
    action?: () => void;
    buttonColor?: string;
    buttonLabelColor?: string;
  }

  interface ReportCard {
    icon: ReactNode;
    label: string;
    value: number | string;
  }

  interface NavElement {
    label: string;
    path: string;
  }
}
