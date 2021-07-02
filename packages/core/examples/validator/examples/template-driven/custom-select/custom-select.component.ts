import { Component, OnInit, ContentChildren, QueryList, ElementRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const CUSTOM_SELECT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomSelectComponent),
    multi: true
};

const noop = () => {};

@Component({
    selector: 'app-custom-select',
    templateUrl: './custom-select.component.html',
    styleUrls: ['./custom-select.component.scss'],
    providers: [CUSTOM_SELECT_VALUE_ACCESSOR]
})
export class CustomSelectComponent implements OnInit, ControlValueAccessor {
    selectedValue: string;

    private onTouchedCallback: () => void = noop;

    private onChangeCallback: (_: any) => void = noop;

    @ContentChildren('option') options: QueryList<ElementRef>;

    constructor() {}

    ngOnInit() {}

    writeValue(obj: any): void {
        this.selectedValue = obj;
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    setDisabledState?(isDisabled: boolean): void {}

    selectOption(option: ElementRef) {
        this.selectedValue = option.nativeElement.value;
        this.onChangeCallback(option.nativeElement.value);
    }
}
