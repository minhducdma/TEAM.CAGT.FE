import { FormControl, FormGroup } from '@angular/forms';

export function ValidateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
        const control = formGroup.get(field);
        if (
            typeof formGroup.get(field)?.value === 'string' ||
            formGroup.get(field)?.value instanceof String
        ) {
            control?.setValue(formGroup.get(field)?.value.trim());
        }

        if (control instanceof FormControl) {
            control.markAsTouched({onlySelf: true});
        } else if (control instanceof FormGroup) {
            ValidateAllFormFields(control);
        }
    });
}

export function CleanForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
        if (
            typeof formGroup.get(key)?.value === 'string' ||
            formGroup.get(key)?.value instanceof String
        ) {
            formGroup.get(key)?.setValue(formGroup.get(key)?.value.trim());
        }
    });
}

export function assignValues(target: any, source: any): void {
    Object.assign(target, source);
}
