import { Directive, ElementRef, Output, OnInit, HostBinding, HostListener, Optional, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxFormValidatorDirective } from './form-validator.directive';

@Directive({
    selector: '[ngxFormSubmit],[ngx-form-submit]'
})
export class NgxFormSubmitDirective implements OnInit {

    @Output() ngxFormSubmit = new EventEmitter();

    constructor(
        private validatorDirective: NgxFormValidatorDirective
    ) {
    }

    ngOnInit(): void {
        this.validatorDirective.onSubmitSuccess = ($event: any) => {
            this.ngxFormSubmit.emit($event);
        };
    }

    @HostListener('click', ['$event'])
    onSubmit($event: any) {
        this.validatorDirective.submit($event);
    }
}
