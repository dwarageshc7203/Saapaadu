export type VegType = 'veg' | 'nonveg';

export interface Hotspot {
  hid: number;
  vid: number;
  shopName: string;
  shopAddress: string;
  area: string;
  city: string;
  state: string;
  latitude?: number | null;
  longitude?: number | null;
  shopImage?: string | null;
  veg_nonveg: VegType;
  mealName: string;
  mealCount: number;
  price: number;     // convert from string if backend returns decimal as string
  duration: number;  // minutes
}
