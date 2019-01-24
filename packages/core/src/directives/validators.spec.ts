import { fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { FormControl, FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Component, Input, DebugElement } from '@angular/core';
import { NgxUniqueCheckDirective, MinValidatorDirective, MaxValidatorDirective } from './validators';
import { By } from '@angular/platform-browser';

describe('validator Directives', () => {
    describe('minValidatorDirective', () => {
        @Component({
            template: `
                <input name="number" [(ngModel)]="value" [ngxMin]="min" />
            `
        })
        class TestComponent {
            @Input() value;

            @Input() min;
        }

        let fixture: ComponentFixture<TestComponent>;
        let context: TestComponent;
        let nativeElement: HTMLElement;
        let directive;
        let input;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule],
                declarations: [TestComponent, MinValidatorDirective]
            });
            fixture = TestBed.createComponent(TestComponent);
            context = fixture.componentInstance;
            nativeElement = fixture.nativeElement;

            const directives = fixture.debugElement.queryAll(By.directive(MinValidatorDirective));
            directive = directives.map(
                (d: DebugElement) => d.injector.get(MinValidatorDirective) as MinValidatorDirective
            )[0];

            input = nativeElement.querySelector('input') as HTMLElement;
        });

        it('should be defined on the test component', () => {
            expect(directive).not.toBeUndefined();
        });

        it('should valid on an empty string', fakeAsync(() => {
            context.value = '';
            context.min = 2;
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(input.classList).toContain('ng-valid');
        }));

        it('should valid on null', fakeAsync(() => {
            context.value = null;
            context.min = 2;
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(input.classList).toContain('ng-valid');
        }));

        it('should valid on undefined', fakeAsync(() => {
            context.value = undefined;
            context.min = 2;
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(input.classList).toContain('ng-valid');
        }));

        it('should valid on NaN after parsing', fakeAsync(() => {
            context.value = 'a';
            context.min = 2;
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(input.classList).toContain('ng-valid');
        }));

        it('should invalid on small values', fakeAsync(() => {
            context.value = 1;
            context.min = 2;
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(input.classList).toContain('ng-invalid');
        }));

        it('should invalid on small values converted from strings', fakeAsync(() => {
            context.value = '1';
            context.min = 2;
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(input.classList).toContain('ng-invalid');
        }));

        it('should valid on big values', fakeAsync(() => {
            context.value = 3;
            context.min = 2;
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(input.classList).toContain('ng-valid');
        }));

        it('should valid on equal values', fakeAsync(() => {
            context.value = 2;
            context.min = 2;
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(input.classList).toContain('ng-valid');
        }));

        it('should valid on equal values when value is string', fakeAsync(() => {
            context.value = '2';
            context.min = 2;
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(input.classList).toContain('ng-valid');
        }));

        it('should invalid as expected when min value is a string', fakeAsync(() => {
            context.value = 1;
            context.min = '2';
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(input.classList).toContain('ng-invalid');
        }));

        it('should valid if min value is undefined', fakeAsync(() => {
            context.value = 3;
            context.min = undefined;
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(input.classList).toContain('ng-valid');
        }));

        it('should valid if min value is null', fakeAsync(() => {
            context.value = 3;
            context.min = null;
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(input.classList).toContain('ng-valid');
        }));

        it('should invalid on small values when min value is float values', fakeAsync(() => {
            context.value = 2;
            context.min = 2.1;
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(input.classList).toContain('ng-invalid');
        }));

        it('should valid on big values when min value is float values', fakeAsync(() => {
            context.value = 2.2;
            context.min = 2.1;
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(input.classList).toContain('ng-valid');
        }));

        it('should valid on equal values when min value is float values', fakeAsync(() => {
            context.value = 2.1;
            context.min = 2.1;
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(input.classList).toContain('ng-valid');
        }));
    });

    describe('maxValidatorDirective', () => {
        @Component({
            template: `
                <input name="number" [(ngModel)]="value" [ngxMax]="max" />
            `
        })
        class TestComponent {
            @Input() value;

            @Input() max;
        }

        let fixture: ComponentFixture<TestComponent>;
        let context: TestComponent;
        let nativeElement: HTMLElement;
        let directive;
        let input;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule],
                declarations: [TestComponent, MaxValidatorDirective]
            });
            fixture = TestBed.createComponent(TestComponent);
            context = fixture.componentInstance;
            nativeElement = fixture.nativeElement;

            const directives = fixture.debugElement.queryAll(By.directive(MaxValidatorDirective));
            directive = directives.map(
                (d: DebugElement) => d.injector.get(MaxValidatorDirective) as MaxValidatorDirective
            )[0];

            input = nativeElement.querySelector('input') as HTMLElement;
        });

        it('should be defined on the test component', () => {
            expect(directive).not.toBeUndefined();
        });

        it('should valid on an empty string', fakeAsync(() => {
            context.value = '';
            context.max = 2;
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(input.classList).toContain('ng-valid');
        }));

        it('should valid on null', fakeAsync(() => {
            context.value = null;
            context.max = 2;
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(input.classList).toContain('ng-valid');
        }));

        it('should valid on undefined', fakeAsync(() => {
            context.value = undefined;
            context.max = 2;
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(input.classList).toContain('ng-valid');
        }));

        it('should valid on NaN after parsing', fakeAsync(() => {
            context.value = 'a';
            context.max = 2;
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(input.classList).toContain('ng-valid');
        }));

        it('should invalid on big values', fakeAsync(() => {
            context.value = 3;
            context.max = 2;
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(input.classList).toContain('ng-invalid');
        }));

        it('should invalid on big values converted from strings', fakeAsync(() => {
            context.value = '3';
            context.max = 2;
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(input.classList).toContain('ng-invalid');
        }));

        it('should valid on small values', fakeAsync(() => {
            context.value = 1;
            context.max = 2;
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(input.classList).toContain('ng-valid');
        }));

        it('should valid on equal values', fakeAsync(() => {
            context.value = 2;
            context.max = 2;
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(input.classList).toContain('ng-valid');
        }));

        it('should valid on equal values when value is string', fakeAsync(() => {
            context.value = '2';
            context.max = 2;
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(input.classList).toContain('ng-valid');
        }));

        it('should invalid as expected when max value is a string', fakeAsync(() => {
            context.value = 3;
            context.max = '2';
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(input.classList).toContain('ng-invalid');
        }));

        it('should valid if min value is undefined', fakeAsync(() => {
            context.value = 3;
            context.max = undefined;
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(input.classList).toContain('ng-valid');
        }));

        it('should valid if min value is null', fakeAsync(() => {
            context.value = 3;
            context.max = null;
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(input.classList).toContain('ng-valid');
        }));

        it('should invalid on big values when max value is float values', fakeAsync(() => {
            context.value = 3;
            context.max = 2.1;
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(input.classList).toContain('ng-invalid');
        }));

        it('should valid on big values when min value is float values', fakeAsync(() => {
            context.value = 2;
            context.max = 2.1;
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(input.classList).toContain('ng-valid');
        }));

        it('should valid on equal values when min value is float values', fakeAsync(() => {
            context.value = 2.1;
            context.max = 2.1;
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(input.classList).toContain('ng-valid');
        }));
    });

    describe('ngxUniqueCheckDirective', () => {
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
});
