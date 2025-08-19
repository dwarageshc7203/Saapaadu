// frontend/src/types/index.ts
export interface Vendor {
  vid: number;
  username: string;
  shopName: string;
  shopAddress: string;
  area: string;
  city: string;
  state: string;
  latitude?: number;
  longitude?: number;
  shopImage?: string;
  verification: boolean;
}

export interface Hotspot {
  hid: number;
  vendor: Vendor;
  shopName: string;
  shopAddress: string;
  area: string;
  city: string;
  state: string;
  latitude?: number;
  longitude?: number;
  shopImage?: string;
  veg_nonveg: "veg" | "nonveg";
  mealName: string;
  mealCount: number;
  price: number;
  duration: number;
}

export interface Customer {
  cid: number;
  uid: number;
  username: string;
  phoneNumber?: string;
  veg_nonveg?: "veg" | "nonveg";
  address?: string;
  area?: string;
  city?: string;
  state?: string;
}

