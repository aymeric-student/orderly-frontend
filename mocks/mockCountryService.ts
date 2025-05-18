import type { CountriesClient } from "@/core/components/address-dialog/services/CountryFlag.service";
import { of } from "rxjs";

export const mockCountryService: CountriesClient = {
    getCountries: () => of([]),
};
