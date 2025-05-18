import { RestaurantSetupComponent } from '@/core/features/setupRestaurant/RestaurantSetup.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DATE_SERVICE } from '@/core/services/DateFnsService.service';
import { MockDateService } from '../../../../../mocks/MockDateService';
import { i18nProviders } from '@/lib/i18n/i18n.providers';

describe('RestaurantSetupComponent', () => {
  let component: RestaurantSetupComponent;
  let fixture: ComponentFixture<RestaurantSetupComponent>;

  const mockDialogRef = {
    afterClosed: () => of(true),
  } as MatDialogRef<any>;

  const mockDialog = {
    open: jasmine.createSpy('open').and.returnValue(mockDialogRef),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantSetupComponent],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: DATE_SERVICE, useClass: MockDateService },
        ...i18nProviders,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should open confirmation dialog on handleFinalSubmit', () => {
    component.handleFinalSubmit();
    expect(mockDialog.open).toHaveBeenCalled();
  });

  it('should create a valid employee group form', () => {
    const group = component.createEmployeeGroup();

    expect(group).toBeTruthy();
    expect(group.contains('name')).toBeTrue();
    expect(group.contains('role')).toBeTrue();
    expect(group.contains('photo')).toBeTrue();
    expect(group.contains('email')).toBeTrue();
    expect(group.contains('phone')).toBeTrue();
    expect(group.contains('schedule')).toBeTrue();

    group.get('name')?.setValue('');
    expect(group.get('name')?.valid).toBeFalse();

    group.get('email')?.setValue('not-an-email');
    expect(group.get('email')?.valid).toBeFalse();

    group.get('phone')?.setValue('123456789');
    expect(group.get('phone')?.valid).toBeFalse();

    group.get('schedule')?.setValue([]);
    expect(group.get('schedule')?.valid).toBeFalse();
  });
});
