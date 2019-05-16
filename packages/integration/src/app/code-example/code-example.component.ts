import { Component, OnInit, Input } from '@angular/core';

export interface CodeExampleItem {
    file: string;
    content: string;
}

@Component({
    selector: 'app-code-example',
    templateUrl: './code-example.component.html',
    styleUrls: ['./code-example.component.scss']
})
export class CodeExampleComponent implements OnInit {
    @Input() examples: CodeExampleItem[];

    currentExample: CodeExampleItem;

    constructor() {}

    ngOnInit(): void {
        this.currentExample = this.examples && this.examples.length > 0 ? this.examples[0] : null;
    }
}
