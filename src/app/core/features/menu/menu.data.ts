export const menu = [
    {
        name: "Entrées",
        icon: "restaurant",
        items: [
            {
                id: "1",
                name: "Salade César",
                description:
                    "Notre interprétation du grand classique, préparée avec des ingrédients frais et une sauce maison onctueuse.",
                ingredients: ["Laitue romaine", "Parmesan", "Croûtons", "Sauce César"],
                price: 8.5,
                bestseller: true,
            },
            {
                id: "2",
                name: "Soupe à l'oignon",
                description:
                    "Une soupe traditionnelle française mijotée pendant des heures pour un goût intense et réconfortant.",
                ingredients: ["Oignons caramélisés", "Bouillon de boeuf", "Gruyère", "Pain grillé"],
                price: 7.5,
                vegetarian: true,
                new: true,
            },
            {
                id: "3",
                name: "Tartare de Saumon",
                description:
                    "Un tartare rafraîchissant préparé avec du saumon frais de première qualité et des herbes aromatiques.",
                ingredients: ["Saumon frais", "Avocat", "Citron vert", "Herbes fraîches"],
                price: 12.9,
                glutenFree: true,
            },
        ],
    },
    {
        name: "Plats",
        icon: "lunch_dining",
        items: [
            {
                id: "4",
                name: "Steak Frites",
                description:
                    "Une entrecôte de bœuf tendre et juteuse, accompagnée de nos frites maison croustillantes.",
                ingredients: ["Entrecôte", "Frites maison", "Sauce béarnaise", "Légumes de saison"],
                price: 24.9,
                bestseller: true,
            },
            {
                id: "5",
                name: "Saumon grillé",
                description:
                    "Filet de saumon grillé à la perfection, servi avec une sauce au citron légère et rafraîchissante.",
                ingredients: ["Saumon frais", "Riz basmati", "Sauce citron", "Légumes vapeur"],
                price: 22.5,
                glutenFree: true,
            },
            {
                id: "6",
                name: "Curry de légumes",
                description:
                    "Un curry végétalien savoureux et épicé, préparé avec des légumes de saison et du lait de coco.",
                ingredients: ["Légumes de saison", "Lait de coco", "Curry maison", "Riz jasmin"],
                price: 18.9,
                vegetarian: true,
                vegan: true,
                spicy: true,
                new: true,
            },
        ],
    },
    {
        name: "Desserts",
        icon: "cake",
        items: [
            {
                id: "8",
                name: "Crème brûlée",
                description:
                    "Une crème onctueuse à la vanille, recouverte d'une fine couche de caramel croustillant.",
                ingredients: ["Crème fraîche", "Vanille bourbon", "Sucre caramélisé"],
                price: 7.9,
                bestseller: true,
                glutenFree: true,
            },
            {
                id: "9",
                name: "Tarte Tatin",
                description:
                    "Notre version de ce classique français avec des pommes caramélisées et une pâte feuilletée croustillante.",
                ingredients: ["Pommes caramélisées", "Pâte feuilletée", "Crème fraîche"],
                price: 8.5,
                new: true,
            },
            {
                id: "10",
                name: "Moelleux au chocolat",
                description:
                    "Un gâteau au chocolat au cœur coulant, servi avec une boule de glace à la vanille.",
                ingredients: ["Chocolat noir", "Glace vanille", "Fruits rouges"],
                price: 9.5,
            },
        ],
    },
    {
        name: "Cocktails",
        icon: "local_bar",
        items: [
            {
                id: "11",
                name: "Mojito",
                description:
                    "Le cocktail cubain par excellence, préparé avec du rhum blanc de qualité et de la menthe fraîche.",
                ingredients: ["Rhum blanc", "Menthe fraîche", "Citron vert", "Sucre de canne"],
                price: 9.5,
                bestseller: true,
            },
            {
                id: "12",
                name: "Margarita",
                description:
                    "Un cocktail mexicain classique avec le parfait équilibre entre la tequila et le citron vert.",
                ingredients: ["Tequila", "Triple sec", "Jus de citron vert", "Sel"],
                price: 10.5,
            },
            {
                id: "13",
                name: "Bloody Mary",
                description:
                    "Notre version épicée du célèbre cocktail, parfait pour le brunch ou l'apéritif.",
                ingredients: ["Vodka", "Jus de tomate", "Épices", "Céleri"],
                price: 11.5,
                spicy: true,
                new: true,
            },
        ],
    },
];
