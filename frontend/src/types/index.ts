// frontend/src/types/index.ts
export interface User {
  id: number;
  email: string;
  role: "customer" | "vendor" | "admin";
  username?: string;
}

export interface Vendor {
  vid: number;
  uid: number;
  username: string;
  phoneNumber?: string;
  veg_nonveg?: "veg" | "nonveg";
  shopName?: string;
  shopAddress?: string;
  area?: string;
  city?: string;
  state?: string;
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

export interface Order {
  otime: string | number | Date;
  oid: number;
  cid: number;
  uid: number;
  hid: number;
  mealName: string;
  mealCount: number;
  createdAt: string; // renamed from otime
  totalPrice: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  hotspot?: Hotspot;
  customer?: Customer;
  vendor?: Vendor;
}

