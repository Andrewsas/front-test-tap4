import { Component } from '@angular/core';

@Component({
  selector: 'app-spiner',
  template: '<mat-spinner class="spiner"></mat-spinner>',
  styles: [`.spiner{
                position: absolute;
                top: calc(50vh - 60px);
                left: calc(50vw - 60px);
                stroke: red !important;
            }`
  ]
})
export class SpinerComponent {

  constructor() { }


}
