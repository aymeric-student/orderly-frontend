import { AbstractControl, ValidationErrors } from '@angular/forms';

export function minSelectedDays(min: number) {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (!Array.isArray(value)) return { minSelectedDays: { required: min } };
        return value.length >= min ? null : { minSelectedDays: { required: min } };
    };
}
