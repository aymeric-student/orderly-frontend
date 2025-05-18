import {
  AddressDialogComponent,
  type AddressSelected,
} from '@/core/components/address-dialog/AddressForm.component';
import { ADDRESS_SERVICE } from '@/core/components/address-dialog/services/Address.service';
import { COUNTRY_SERVICE } from '@/core/components/address-dialog/services/CountryFlag.service';
import { i18nProviders } from '@/lib/i18n/i18n.providers';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {
  type ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { MockTranslatePipe } from '../../../../../mocks/MockTranslatePipe.pipe';
import { mockAddressService } from '../../../../../mocks/mockAddressService';
import { mockCountryService } from '../../../../../mocks/mockCountryService';
import { Address } from '@/core/models/Menu';
import { AddressFeature } from '@/core/components/address-dialog/models/Address.model';

const mockDialogRef = {
  close: jasmine.createSpy('close'),
};

describe('AddressFormComponent', () => {
  let component: AddressDialogComponent;
  let fixture: ComponentFixture<AddressDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressDialogComponent, MockTranslatePipe],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: null },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: ADDRESS_SERVICE, useValue: mockAddressService },
        { provide: COUNTRY_SERVICE, useValue: mockCountryService },
        provideHttpClient(),
        provideHttpClientTesting(),
        ...i18nProviders,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddressDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call initFormWithData, loadCountries, and initStreetAutocomplete on ngOnInit', () => {
    const initFormSpy = spyOn<any>(
      component,
      'initFormWithData',
    ).and.callThrough();
    const loadCountriesSpy = spyOn<any>(
      component,
      'loadCountries',
    ).and.callThrough();
    const initStreetSpy = spyOn<any>(
      component,
      'initStreetAutocomplete',
    ).and.callThrough();

    component.ngOnInit();

    expect(initFormSpy).toHaveBeenCalled();
    expect(loadCountriesSpy).toHaveBeenCalled();
    expect(initStreetSpy).toHaveBeenCalled();
  });

  it('should submit form well ! ', () => {
    component.addressForm.setValue({
      street: '123 Rue',
      city: 'Paris',
      zip: '75000',
      country: 'France',
    });

    component.submit();

    expect(mockDialogRef.close).toHaveBeenCalledWith({
      street: '123 Rue',
      city: 'Paris',
      zip: '75000',
      country: 'France',
    });
  });

  it('should close dialog without data on cancel', () => {
    component.cancel();

    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should patch form and set selectedCountry to France when address is selected', () => {
    const selected: AddressSelected = {
      street: '456 Avenue',
      city: 'Lyon',
      zip: '69000',
      country: 'France',
    };

    component.onAddressSelected(selected);

    expect(component.selectedCountry).toEqual({
      name: 'France',
      code: 'FR',
    });

    expect(component.addressForm.value).toEqual({
      street: '456 Avenue',
      city: 'Lyon',
      zip: '69000',
      country: 'France',
    });
  });

  it('should not set selectedCountry if data.country does not exist in the list', () => {
    component['data'] = { country: 'Unknown' } as Address;

    spyOn(mockCountryService, 'getCountries').and.returnValue(
      of([
        { name: 'France', code: 'FR', flag: '🇫' },
        { name: 'Germany', code: 'DE', flag: '🇩' },
      ]),
    );

    component['loadCountries']();

    expect(component.selectedCountry).toBeNull();
  });

  it('should load suggestions when street input has more than 3 characters', fakeAsync(() => {
    const mockFeatures: AddressFeature[] = [
      {
        properties: { name: '123 Rue', city: 'Paris', postcode: '75000' },
      } as any,
    ];

    spyOn(mockAddressService, 'searchAddress').and.returnValue(
      of(mockFeatures),
    );

    const streetControl = component.addressForm.get('street');
    streetControl?.setValue('123 Rue');

    tick();

    expect(component.suggestions).toEqual([
      {
        street: '123 Rue',
        city: 'Paris',
        zip: '75000',
        country: 'France',
      },
    ]);
  }));
});
