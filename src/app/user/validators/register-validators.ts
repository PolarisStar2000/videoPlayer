import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class RegisterValidators {
    static match(controlName: string, mathcingControlName: string): ValidatorFn {
        return (group: AbstractControl): ValidationErrors | null => {
            const control = group.get(controlName);
            const matchingControl = group.get(mathcingControlName);

            if (!control || !matchingControl) {
                console.error("Form controls can not be found in the form group.");
                return { controlNotFound: false };
            }

            const error = control.value === matchingControl.value ?
                null : { noMatch: true }
            matchingControl.setErrors(error);
            return error;
        }
    }
}
