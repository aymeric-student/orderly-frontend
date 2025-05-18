import { Pipe, type PipeTransform } from "@angular/core";

@Pipe({
    name: "translate",
    standalone: true,
})
export class MockTranslatePipe implements PipeTransform {
    transform(value: string): string {
        return value; // Retourne juste la clé brute sans traduction
    }
}
