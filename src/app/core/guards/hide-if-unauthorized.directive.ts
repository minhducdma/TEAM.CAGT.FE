import { Directive, ElementRef, OnInit , Input } from '@angular/core';

@Directive({
    selector: '[HideIfUnauthorized]'
})
export class MyHideIfUnauthorizedDirective implements OnInit {
    @Input('HideIfUnauthorized') key: string; // Required permission passed in

    constructor(private el: ElementRef) { }

    ngOnInit() {
    }
}
