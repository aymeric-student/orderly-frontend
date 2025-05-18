import type { AddressFeature } from "@/core/components/address-dialog/models/Address.model";
import type { CountryFlag } from "@/core/components/address-dialog/models/Country.model";
import { ADDRESS_SERVICE } from "@/core/components/address-dialog/services/Address.service";
import { COUNTRY_SERVICE } from "@/core/components/address-dialog/services/CountryFlag.service";
import type { Address } from "@/core/models/Menu";
import { NgForOf, NgIf, NgOptimizedImage } from "@angular/common";
import { Component, type OnInit, inject } from "@angular/core";
import { FormBuilder, type FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelect, MatSelectTrigger } from "@angular/material/select";
import { TranslateModule, TranslatePipe } from "@ngx-translate/core";
import { startWith, switchMap } from "rxjs";

export interface AddressSelected {
    street: string;
    city: string;
    zip: string;
    country: string;
}
@Component({
    standalone: true,
    selector: "app-address-dialog",
    templateUrl: "./AddressForm.component.html",
    styleUrls: ["./AddressForm.component.scss"],
    imports: [
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIcon,
        TranslatePipe,
        MatAutocompleteTrigger,
        MatAutocomplete,
        MatOption,
        NgForOf,
        MatSelect,
        MatSelectTrigger,
        NgIf,
        NgOptimizedImage,
        TranslateModule,
    ],
})
export class AddressDialogComponent implements OnInit {
    dialogRef = inject(MatDialogRef<AddressDialogComponent>);
    data = inject(MAT_DIALOG_DATA, { optional: true }) as Address | null;
    fb = inject(FormBuilder);
    countryFlags: CountryFlag[] = [];
    selectedCountry: CountryFlag | null = null;
    suggestions: Address[] = [];
    addressForm: FormGroup = this.fb.group({
        street: ["", Validators.required],
        city: ["", Validators.required],
        zip: ["", Validators.required],
        country: ["", Validators.required],
    });
    private readonly addressService = inject(ADDRESS_SERVICE);
    private readonly countryService = inject(COUNTRY_SERVICE);

    ngOnInit(): void {
        this.initFormWithData();
        this.loadCountries();
        this.initStreetAutocomplete();
    }

    submit() {
        if (this.addressForm.valid) {
            this.dialogRef.close(this.addressForm.value);
        }
    }

    cancel() {
        this.dialogRef.close();
    }

    getFlag(countryName: string): string | null {
        const match = this.countryFlags.find((c) => c.name === countryName);
        return match?.flag || null;
    }

    onAddressSelected(selected: AddressSelected): void {
        this.selectedCountry = {
            name: "France",
            code: "FR",
        };

        this.addressForm.patchValue({
            street: selected.street,
            city: selected.city,
            zip: selected.zip,
            country: this.selectedCountry?.name || "France",
        });
    }

    private initFormWithData(): void {
        if (this.data) {
            this.addressForm.patchValue(this.data);
        }
    }

    private loadCountries(): void {
        this.countryService.getCountries().subscribe((res) => {
            this.countryFlags = res.sort((a, b) => a.name.localeCompare(b.name));

            if (this.data?.country) {
                this.selectedCountry =
                    this.countryFlags.find((c) => c.name === this.data?.country) || null;
            }
        });
    }

    private initStreetAutocomplete(): void {
        const streetControl = this.addressForm.get("street");
        if (!streetControl) return;

        streetControl.valueChanges
            .pipe(
                startWith(""),
                switchMap((value) =>
                    typeof value === "string" && value.length >= 3
                        ? this.addressService.searchAddress(value)
                        : [],
                ),
            )
            .subscribe((res: AddressFeature[]) => {
                this.suggestions = res.map(this.mapToAddress);
            });
    }

    private mapToAddress(feature: AddressFeature): Address {
        return {
            street: feature.properties.name,
            city: feature.properties.city,
            zip: feature.properties.postcode,
            country: "France",
        };
    }
}
