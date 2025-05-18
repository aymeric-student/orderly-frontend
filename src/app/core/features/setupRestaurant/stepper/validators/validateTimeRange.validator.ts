import { DATE_SERVICE } from "@/core/services/DateFnsService.service";
import { inject } from "@angular/core";
import type { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

interface TimeRangeErrors extends ValidationErrors {
    invalidTimeRange?: boolean;
    minOpeningDuration?: boolean;
}

export function validateTimeRange(): ValidatorFn {
    const dateService = inject(DATE_SERVICE);

    return (group: AbstractControl): ValidationErrors | null => {
        const openingTime = group.get("openingTime")?.value;
        const closingTime = group.get("closingTime")?.value;

        if (!openingTime || !closingTime) return null;

        const openDate = dateService.parse(openingTime, "HH:mm");
        const closeDate = dateService.parse(closingTime, "HH:mm");

        if (Number.isNaN(openDate.getTime()) || Number.isNaN(closeDate.getTime())) return null;

        let adjustedClose = closeDate;
        const isNightTime = closeDate < openDate && closeDate.getHours() < 6;

        if (isNightTime) {
            adjustedClose = dateService.addDays(closeDate, 1);
        }

        const duration = Math.round((adjustedClose.getTime() - openDate.getTime()) / (1000 * 60));
        const errors: TimeRangeErrors = {};

        if (closeDate < openDate && !isNightTime) {
            errors.invalidTimeRange = true;
        }

        if (duration < 30) {
            errors.minOpeningDuration = true;
        }

        return Object.keys(errors).length ? errors : null;
    };
}
