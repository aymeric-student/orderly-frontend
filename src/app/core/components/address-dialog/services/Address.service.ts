import type {
    AddressApiResponse,
    AddressFeature,
} from "@/core/components/address-dialog/models/Address.model";
import { environmentDevelopment } from "@/environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Injectable, InjectionToken, inject } from "@angular/core";
import { type Observable, debounceTime, map } from "rxjs";

export const ADDRESS_SERVICE = new InjectionToken<AddressClient>("AddressService");

export interface AddressClient {
    searchAddress(query: string): Observable<AddressFeature[]>;
}

@Injectable({ providedIn: "root" })
export class AddressService {
    private readonly apiUrl = environmentDevelopment.addressApiUrl;
    private readonly http = inject(HttpClient);

    searchAddress(query: string): Observable<AddressFeature[]> {
        const params = {
            q: query,
            type: "housenumber",
            autocomplete: "1",
        };

        return this.http.get<AddressApiResponse>(this.apiUrl, { params }).pipe(
            debounceTime(200),
            map((response) => {
                return response.features || [];
            }),
        );
    }
}
