import { GeneralInfoFormComponent } from '@/core/features/setupRestaurant/stepper/components/generalInfoForm/GeneralInfoForm.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { i18nProviders } from '@/lib/i18n/i18n.providers';
import { CdkStepper } from '@angular/cdk/stepper';
import { AddressDialogComponent } from '@/core/components/address-dialog/AddressForm.component';
import { Address } from '@/core/models/Menu';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

const mockDialogRef = {
  afterClosed: jasmine.createSpy('afterClosed').and.returnValue({
    subscribe: (callback: (result: Address) => void) =>
      callback({ street: '123 Test St' } as Address),
  }),
};

const mockMatDialog = {
  open: jasmine.createSpy('open').and.returnValue(mockDialogRef),
};

describe('GeneralInfoFormComponent', () => {
  let component: GeneralInfoFormComponent;
  let fixture: ComponentFixture<GeneralInfoFormComponent>;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralInfoFormComponent, ReactiveFormsModule],
      providers: [
        ...i18nProviders,
        { provide: CdkStepper, useValue: {} },
        { provide: MatDialog, useValue: mockMatDialog },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralInfoFormComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);

    component.formGroup = fb.group({
      phone: [''],
      address: [''],
    });
  });
  it('should mounted component', () => {
    expect(component).toBeTruthy();
  });

  it('should open the address dialog and set the result', () => {
    component.openAddressDialog();

    expect(mockMatDialog.open).toHaveBeenCalledWith(AddressDialogComponent, {
      data: undefined,
    });

    expect(component.formGroup.get('address')?.value).toEqual({
      street: '123 Test St',
    } as Address);

    expect(component.address).toEqual({ street: '123 Test St' } as Address);
  });

  it('should ignore non-digit characters and format properly', () => {
    component.formGroup.get('phone')?.setValue('01-23.45 67/89');
    component.formatPhoneNumber();
    expect(component.formGroup.get('phone')?.value).toBe('01 23 45 67 89');
  });
});
