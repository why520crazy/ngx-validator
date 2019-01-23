import { fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { FormControl, FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Component, Input, DebugElement } from '@angular/core';
import { NgxUniqueCheckDirective } from './form-unique-check.directive';
import { By } from '@angular/platform-browser';

@Component({
    template: `
        <input name="email" [(ngModel)]="email" [ngxUniqueCheck]="uniqueCheck" />
    `
})
class TestComponent {
    @Input() email;

    uniqueCheck = value => {
        return value === 'not unique' ? of(true) : of(false);
    }
}

const uniqueCheck = value => {
    return value ? of(true) : of(false);
};

describe('ngxUniqueCheck', () => {
    let fixture: ComponentFixture<TestComponent>;
    let context: TestComponent;
    let nativeElement: HTMLElement;
    let directive;
    let input;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [TestComponent, NgxUniqueCheckDirective]
        });
        fixture = TestBed.createComponent(TestComponent);
        context = fixture.componentInstance;
        nativeElement = fixture.nativeElement;

        const directives = fixture.debugElement.queryAll(By.directive(NgxUniqueCheckDirective));
        directive = directives.map(
            (d: DebugElement) => d.injector.get(NgxUniqueCheckDirective) as NgxUniqueCheckDirective
        )[0];

        input = nativeElement.querySelector('input') as HTMLElement;
    });

    it('should be defined on the test component', () => {
        expect(directive).not.toBeUndefined();
    });

    it('should valid on an empty string', fakeAsync(() => {
        context.email = '';
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        expect(input.classList).toContain('ng-valid');
    }));

    it('should valid on null', fakeAsync(() => {
        context.email = '';
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        expect(input.classList).toContain('ng-valid');
    }));

    it('should invalid on not unique value', fakeAsync(() => {
        context.email = 'not unique';
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        expect(input.classList).toContain('ng-invalid');
    }));

    it('should valid on unique value', fakeAsync(() => {
        context.email = 'unique';
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        expect(input.classList).toContain('ng-valid');
    }));

    // it('should run validator with the initial value', fakeAsync(() => {
    //     const ngxUniqueCheckDirective = new NgxUniqueCheckDirective();
    //     ngxUniqueCheckDirective.ngxUniqueCheck = uniqueCheck;
    //     const control = new FormControl('false', {
    //         asyncValidators: [ngxUniqueCheckDirective.validate.bind(ngxUniqueCheckDirective)],
    //         updateOn: 'change'
    //     });
    //     tick();
    //     expect(control.valid).toEqual(false);
    // }));
});
