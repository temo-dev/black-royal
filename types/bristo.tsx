export interface MenuTypes {
    id: number;
    name_menu: string;
    dph?: number;
    locale?: string;
    background: string;
    foods: FoodTypes[];
}

export interface FoodTypes {
    id: number;
    image: string;
    is_discount?: boolean;
    locale?: string;
    name_food: string;
    price: number;
    value_discount?: number;
}
