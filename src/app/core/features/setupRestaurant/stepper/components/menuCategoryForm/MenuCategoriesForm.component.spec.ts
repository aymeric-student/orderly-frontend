import { MenuCategoriesFormComponent } from '@/core/features/setupRestaurant/stepper/components/menuCategoryForm/MenuCategoriesForm.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { i18nProviders } from '@/lib/i18n/i18n.providers';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CdkStepper } from '@angular/cdk/stepper';

describe('MenuCategoriesFormComponent', () => {
  let component: MenuCategoriesFormComponent;
  let fixture: ComponentFixture<MenuCategoriesFormComponent>;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuCategoriesFormComponent, ReactiveFormsModule],
      providers: [...i18nProviders, { provide: CdkStepper, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuCategoriesFormComponent);
    fb = TestBed.inject(FormBuilder);
    component = fixture.componentInstance;

    component.itemForm = fb.group({
      categories: fb.array([
        fb.group({
          name: ['Entrées', Validators.required],
          icon: ['restaurant_menu', Validators.required],
          items: fb.array([
            fb.group({
              name: ['Salade César', Validators.required],
              price: [12.5, [Validators.required, Validators.min(0)]],
              description: ['Salade, poulet, parmesan, croûtons'],
              ingredients: [['Salade', 'Poulet', 'Parmesan', 'Croûtons']],
              vegetarian: [false],
              vegan: [false],
              glutenFree: [false],
              spicy: [false],
            }),
            fb.group({
              name: ['Soupe du jour', Validators.required],
              price: [8, [Validators.required, Validators.min(0)]],
              description: ['Soupe de légumes de saison'],
              ingredients: [['Légumes']],
              vegetarian: [true],
              vegan: [true],
              glutenFree: [true],
              spicy: [false],
            }),
          ]),
        }),
        fb.group({
          name: ['Plats', Validators.required],
          icon: ['restaurant_menu', Validators.required],
          items: fb.array([
            fb.group({
              name: ['Steak frites', Validators.required],
              price: [18, [Validators.required, Validators.min(0)]],
              description: ['Steak grillé, frites maison'],
              ingredients: [['Steak', 'Frites']],
              vegetarian: [false],
              vegan: [false],
              glutenFree: [true],
              spicy: [false],
            }),
          ]),
        }),
      ]),
    });

    fixture.detectChanges();
  });

  it('should mount the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create a category form group with expected structure and default values', () => {
    const category = component.createCategory();

    expect(category).toBeTruthy();

    expect(category.contains('name')).toBeTrue();
    expect(category.contains('icon')).toBeTrue();
    expect(category.contains('items')).toBeTrue();

    expect(category.get('name')?.value).toBe('');
    expect(category.get('icon')?.value).toBe('restaurant_menu');

    const items = category.get('items');
    expect((items as FormArray).length).toBe(0);
  });

  it('should add a new category with one item', () => {
    component.itemForm = fb.group({
      categories: fb.array([]),
    });

    fixture.detectChanges();

    component.addCategory();

    const categories = component.categories;

    expect(categories.length).toBe(1);

    const category = categories.at(0) as FormGroup;
    expect(category.get('name')?.value).toBe('');
    expect(category.get('icon')?.value).toBe('restaurant_menu');

    const items = category.get('items') as FormArray;
    expect(items.length).toBe(1);

    const item = items.at(0) as FormGroup;
    expect(item.get('name')?.value).toBe('');
    expect(item.get('price')?.value).toBe(0);
  });

  it('should remove the category at the specified index', () => {
    component.itemForm = fb.group({
      categories: fb.array([
        component.createCategory(),
        component.createCategory(),
      ]),
    });

    fixture.detectChanges();

    const categories = component.categories;
    expect(categories.length).toBe(2);

    component.removeCategory(0);

    expect(categories.length).toBe(1);
  });

  it('should return the items FormArray for the given category index', () => {
    // Arrange: crée une catégorie avec 2 items mockés
    const mockCategory = fb.group({
      name: ['Entrées'],
      icon: ['restaurant_menu'],
      items: fb.array([
        fb.group({
          name: ['Item 1'],
          price: [10],
          description: ['Description 1'],
          ingredients: [[]],
          vegetarian: [false],
          vegan: [false],
          glutenFree: [false],
          spicy: [false],
        }),
        fb.group({
          name: ['Item 2'],
          price: [15],
          description: ['Description 2'],
          ingredients: [[]],
          vegetarian: [false],
          vegan: [false],
          glutenFree: [false],
          spicy: [false],
        }),
      ]),
    });

    component.itemForm = fb.group({
      categories: fb.array([mockCategory]),
    });

    fixture.detectChanges();

    // Act: on récupère les items de la 1ère catégorie
    const items = component.categoryItems(0);

    // Assert: on vérifie que c'est bien un FormArray et qu'il a 2 items
    expect(items instanceof FormArray).toBeTrue();
    expect(items.length).toBe(2);

    // Vérifie le contenu du premier item
    const firstItem = items.at(0) as FormGroup;
    expect(firstItem.get('name')?.value).toBe('Item 1');
  });

  it('should return the FormArray of items from the specified category', () => {
    component.itemForm = fb.group({
      categories: fb.array([
        fb.group({
          name: ['Plats'],
          icon: ['restaurant_menu'],
          items: fb.array([
            fb.group({
              name: ['Burger'],
              price: [12],
              description: ['Burger maison'],
              ingredients: [[]],
              vegetarian: [false],
              vegan: [false],
              glutenFree: [false],
              spicy: [false],
            }),
          ]),
        }),
      ]),
    });

    fixture.detectChanges();

    const items = component.categoryItems(0);

    expect(items instanceof FormArray).toBeTrue();
    expect(items.length).toBe(1);

    const firstItem = items.at(0) as FormGroup;
    expect(firstItem.get('name')?.value).toBe('Burger');
  });

  it('should remove the item at the specified index from the given category', () => {
    component.itemForm = fb.group({
      categories: fb.array([
        fb.group({
          name: ['Plats'],
          icon: ['restaurant_menu'],
          items: fb.array([component.createItem(), component.createItem()]),
        }),
      ]),
    });

    fixture.detectChanges();

    component.removeItem(0, 0);

    const items = component.categoryItems(0);
    expect(items.length).toBe(1);
  });

  it('should create an item form group with default values and expected structure', () => {
    // Act
    const item = component.createItem();

    // Assert
    expect(item).toBeTruthy();
    expect(item instanceof FormGroup).toBeTrue();
    expect(item.get('name')?.value).toBe('');
    expect(item.get('price')?.value).toBe(0);
    expect(item.get('description')?.value).toBe('');
    expect(item.get('ingredients')?.value).toEqual([]);
    expect(item.get('vegetarian')?.value).toBeFalse();
    expect(item.get('vegan')?.value).toBeFalse();
    expect(item.get('glutenFree')?.value).toBeFalse();
    expect(item.get('spicy')?.value).toBeFalse();
  });

  it('should add a new item to the specified category', () => {
    // Arrange : une catégorie avec aucun item initialement
    component.itemForm = fb.group({
      categories: fb.array([
        fb.group({
          name: ['Plats'],
          icon: ['restaurant_menu'],
          items: fb.array([]),
        }),
      ]),
    });

    fixture.detectChanges();

    // Act : ajout d'un item à la catégorie 0
    component.addItem(0);

    // Assert
    const items = component.categoryItems(0);
    expect(items.length).toBe(1);

    const newItem = items.at(0) as FormGroup;
    expect(newItem.get('name')?.value).toBe('');
    expect(newItem.get('price')?.value).toBe(0);
  });
});
