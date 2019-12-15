import { Component, OnInit, OnDestroy, ViewChild, HostBinding } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

@Component({
    selector: 'app-address-control',
    templateUrl: './address-control.component.html'
})
export class AppAddressControlComponent implements OnInit, OnDestroy {
    @HostBinding(`class.form-group`) isFormGroup = true;

    @HostBinding(`class.d-block`) isDBlock = true;

    address: string;

    @ViewChild('addressControl', { static: true }) addressControl: NgModel;

    constructor(private ngForm: NgForm) {}

    ngOnInit(): void {
        this.ngForm.addControl(this.addressControl);
    }

    ngOnDestroy() {
        this.ngForm.removeControl(this.addressControl);
    }
}
