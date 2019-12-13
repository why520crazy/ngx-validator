import { Component, OnInit, ViewChild, HostBinding } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

@Component({
    selector: 'app-inner-control',
    templateUrl: './inner-control.component.html'
})
export class AppInnerControlComponent implements OnInit {
    @HostBinding(`class.form-group`) isFormGroup = true;

    @HostBinding(`class.d-block`) isDBlock = true;

    address: string;

    @ViewChild('addressControl', { static: true }) addressControl: NgModel;

    constructor(private ngForm: NgForm) {}

    ngOnInit(): void {
        this.ngForm.addControl(this.addressControl);
    }
}
