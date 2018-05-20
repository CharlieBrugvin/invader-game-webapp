import { Component, OnInit, EventEmitter, Output, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-control-calc',
  template:`
    <div class="left"
        (mousedown)="downOnLeft.emit()"
        (mouseup)  ="upOnLeft.emit()"

        (touchstart)="downOnLeft.emit()"
        (touchend)="upOnLeft.emit()"
        
        (keydown)="onKeyDown('left')"
        >
      <span>
        LEFT
      </span>
    </div>
    
    <div class="middle"
        (mousedown)="downOnMiddle.emit()"
        (mouseup)  ="upOnMiddle.emit()"
        (touchstart)="downOnMiddle.emit()"
        (touchend)="upOnMiddle.emit()">
        <span>
          SHOOT !
        </span>
    </div>
    
    <div class="right"
        (mousedown)="downOnRight.emit()"
        (mouseup)  ="upOnRight.emit()"
        (touchstart)="downOnRight.emit()"
        (touchend)="upOnRight.emit()">
      <span>
        RIGHT
      </span>
    </div>
  `,
  styleUrls: ['./control-calc.component.scss']
})
export class ControlCalcComponent implements OnInit {

  @Output() downOnLeft: EventEmitter<null> = new EventEmitter();
  @Output() upOnLeft: EventEmitter<null> = new EventEmitter();

  @Output() downOnMiddle: EventEmitter<null> = new EventEmitter();
  @Output() upOnMiddle: EventEmitter<null> = new EventEmitter();

  @Output() downOnRight: EventEmitter<null> = new EventEmitter();
  @Output() upOnRight: EventEmitter<null> = new EventEmitter();

  // we also emit if the user uses keys
  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    switch(event.code) { 
      case 'ArrowLeft': {
        this.downOnLeft.emit();
        break; 
      } 
      case 'ArrowRight': { 
        this.downOnRight.emit();
        break; 
      }
      case 'ArrowUp': {
        this.downOnMiddle.emit();
        break; 
      } 
      case 'Space': {
        this.downOnMiddle.emit();
        break; 
      } 
   } 
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    switch(event.code) { 
      case 'ArrowLeft': {
        this.upOnLeft.emit();
        break; 
      } 
      case 'ArrowRight': { 
        this.upOnRight.emit();
        break; 
      }
      case 'ArrowUp': {
        this.upOnMiddle.emit();
        break; 
      } 
      case 'Space': {
        this.upOnMiddle.emit();
        break; 
      } 
   }
  }

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
  }
}
