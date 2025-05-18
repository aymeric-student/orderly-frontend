import type { AddressClient } from "@/core/components/address-dialog/services/Address.service";
import { of } from "rxjs";

export const mockAddressService: AddressClient = {
    searchAddress: (_query: string) => of([]),
};
