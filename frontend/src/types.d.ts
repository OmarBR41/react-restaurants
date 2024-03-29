export type BusinessAPIResponse = {
  businesses: Business[];
  total: number;
  region: {
    center: Coordinates;
  };
};

export type Business = {
  id: string;
  alias: string;
  name: string;
  image_url: string;
  is_closed: boolean;
  url: string;
  review_count: number;
  categories: Category[];
  rating: number;
  coordinates: Coordinates;
  transactions: string[];
  price: string;
  location: Location;
  phone: string;
  display_phone: string;
  distance: number;
};

export type Category = {
  alias: string;
  title: string;
};

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type Location = {
  address1: string;
  address2: string;
  address3: string;
  city: string;
  zip_code: string;
  country: string;
  state: string;
  display_address: string[];
};
