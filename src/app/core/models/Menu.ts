export interface Address {
    street: string;
    city: string;
    zip: string;
    country: string;
}

export interface MenuItem {
    id?: string;
    name: string;
    description: string;
    ingredients: string[];
    price: number;
    vegetarian?: boolean;
    vegan?: boolean;
    glutenFree?: boolean;
    spicy?: boolean;
    bestseller?: boolean;
    new?: boolean;
}

export interface Category {
    name: string;
    items: MenuItem[];
}
