import { Component, forwardRef, Input, OnInit, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-cagt-edit-content',
    templateUrl: './cagt-edit-content.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => CagtEditContentComponent),
        },
    ]
})
export class CagtEditContentComponent implements OnInit {
    @Input() isDisabled = false;

    value: string;
    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {}

    ngOnInit(): void {}

    onChange(value) {}

    onTouched() {}

    writeValue(value): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

}
