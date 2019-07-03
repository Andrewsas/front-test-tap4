import { Component } from '@angular/core';

@Component({
    selector: 'app-footer-cmp',
    templateUrl: 'footer.component.html',
    styles: [`.copyright {
                width: 100vw;
                margin-right: 10px !important;
                }`]
})

export class FooterComponent {
    test: Date = new Date();
}
