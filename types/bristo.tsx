export interface MenuTypes {
    id: number;
    name_menu: string;
    dph?: number;
    locale?: string;
    background: string;
    foods: FoodTypes[];
}

export interface FoodOptionsTypes {
    id: number;
    option_name: string;
    price_of_option: number;
    type_of_option: string;
}
export interface FoodTypes {
    id: number;
    image: string;
    is_discount?: boolean;
    locale?: string;
    name_food: string;
    price: number;
    value_discount?: number;
    options?: FoodOptionsTypes[];
}

export interface FoodOrderTypes {
    food: FoodTypes;
    quantity: number;
    description?: string;
    status?: string;
}
export class BillingOrder {
    id: number;
    code_order: string;
    foods: FoodOrderTypes[];
    total: number;
    totalQuantity: number;
    table?: string;
    constructor(code: string, id: number) {
        this.code_order = code;
        this.id = id;
        this.foods = new Array();
        this.total = 0;
        this.totalQuantity = 0;
    }
    addFood(foodOrder: FoodOrderTypes): void {
        const isExisted = this.foods.filter((item) => item.food.id === foodOrder.food.id);
        if (isExisted.length > 0) {
            this.foods.map((item) => {
                if (item.food.id === foodOrder.food.id) {
                    item.quantity += foodOrder.quantity;
                }
            });
        } else {
            this.foods.push(foodOrder);
        }
        this.total = this.total + foodOrder.quantity * foodOrder.food.price;
        this.totalQuantity = this.totalQuantity + foodOrder.quantity;
    }

    updateFood(foodOrder: FoodOrderTypes): void {
        this.foods.map((item) => {
            if (item.food.id === foodOrder.food.id) {
                item.food = foodOrder.food;
            }
        });
    }
}
