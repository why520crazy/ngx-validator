import { TestBed } from '@angular/core/testing';

import { NgxValidatorModule } from './module';
import { NgModule } from '@angular/core';
import { NgxValidatorLoader } from './public_api';


@NgModule({
    imports: [NgxValidatorModule]
})
class AppModuleDirectly {}

@NgModule({
    imports: [NgxValidatorModule.forRoot({})]
})
class AppModuleWithConfig {}

describe('NgxValidatorModule', () => {
    it('should be created directly import module', () => {
        TestBed.configureTestingModule({
            imports: [AppModuleDirectly]
        });
        const service: NgxValidatorLoader = TestBed.get(NgxValidatorLoader);
        expect(service).toBeTruthy();
    });

    it('should be created import module with default config ', () => {
        TestBed.configureTestingModule({
            imports: [AppModuleWithConfig]
        });
        const service: NgxValidatorLoader = TestBed.get(NgxValidatorLoader);
        expect(service).toBeTruthy();
    });
});

