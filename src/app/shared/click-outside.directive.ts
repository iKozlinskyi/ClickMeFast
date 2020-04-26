import {Directive, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

  constructor(private elRef: ElementRef) { }

  @Output('appClickOutside') callbackEmitter = new EventEmitter();

  @HostListener('document:click', ['$event.target'])
  public onClick(targetEl) {
    const clickedInside = this.elRef.nativeElement.contains(targetEl);
    if (!clickedInside) {
      this.callbackEmitter.emit();
    }
  }
}
