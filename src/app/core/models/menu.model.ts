export interface MenuItem {
    name: string;
    description: string;
    ingredients: string[];
    price: number;
    image?: string;
    spicy?: boolean;
    vegetarian?: boolean;
    bestseller?: boolean;
    new?: boolean;
    glutenFree?: boolean;
    vegan?: boolean;
}

export interface MenuSection {
    name: string;
    icon: string;
    items: MenuItem[];
}
