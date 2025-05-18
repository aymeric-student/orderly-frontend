import type {
    CountryFlag,
    RestCountry,
} from "@/core/components/address-dialog/models/Country.model";
import { environmentDevelopment } from "@/environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Injectable, InjectionToken, inject } from "@angular/core";
import { type Observable, map } from "rxjs";

export const COUNTRY_SERVICE = new InjectionToken<CountriesClient>("CountryService");

export interface CountriesClient {
    getCountries(): Observable<CountryFlag[]>;
}

@Injectable({ providedIn: "root" })
export class CountryService {
    private readonly restCountryApiUrl = environmentDevelopment.countryRestApiUrl;
    private readonly httpClient = inject(HttpClient);

    getCountries(): Observable<CountryFlag[]> {
        return this.httpClient.get<RestCountry[]>(this.restCountryApiUrl).pipe(
            map((countries: RestCountry[]) =>
                countries.map((country: RestCountry) => ({
                    name: country.name.common,
                    code: country.cca2,
                    flag: country.flags?.emoji ?? country.flags?.png ?? "",
                })),
            ),
        );
    }
}
