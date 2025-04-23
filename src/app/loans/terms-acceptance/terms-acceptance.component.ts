import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-terms-acceptance',
  templateUrl: './terms-acceptance.component.html',
  styleUrls: ['./terms-acceptance.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TermsAcceptanceComponent),
      multi: true,
    },
  ],
})
export class TermsAcceptanceComponent implements ControlValueAccessor {
  isChecked: boolean = false;

  private onChange = (value: boolean) => {};
  private onTouched = () => {};

  writeValue(value: boolean): void {
    this.isChecked = value;
    this.onChange(this.isChecked);  // ✅ Notify the parent form when value changes
  }
  

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isChecked = isDisabled;
  }
  
  toggleAcceptance(): void {
    this.isChecked = !this.isChecked;
    this.onChange(this.isChecked);
    this.onTouched();
  }
}
