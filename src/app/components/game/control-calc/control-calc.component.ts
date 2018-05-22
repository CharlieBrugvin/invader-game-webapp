import { Component, OnInit, EventEmitter, Output, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-control-calc',
  template:`
    <div class="left"

        (mousedown)="onDownOnLeft()"
        (mouseup)  ="onUpOnLeft()"

        (touchstart)="onDownOnLeft()"
        (touchend)="onUpOnLeft()">

      <div class="left-btn" [ngClass]="{'pressed': leftPressed}">
        <i class="fas fa-arrow-circle-left"></i>
      </div>

    </div>
    
    <div class="middle"
        (mousedown)="onDownOnMiddle()"
        (mouseup)  ="onUpOnMiddle()"

        (touchstart)="onDownOnMiddle()"
        (touchend)="onUpOnMiddle()">

        <div class="shoot-btn" [ngClass]="{'pressed': middlePressed}">
          <i class="fas fa-crosshairs"></i>
        </div>

    </div>
    
    <div class="right"

        (mousedown)="onDownOnRight()"
        (mouseup)  ="onUpOnRight()"

        (touchstart)="onDownOnRight()"
        (touchend)="onUpOnRight()">

      <div class="right-btn" [ngClass]="{'pressed': rightPressed}">
        <i class="fas fa-arrow-circle-right"></i>
      </div>

    </div>
  `,
  styleUrls: ['./control-calc.component.scss']
})
export class ControlCalcComponent  {

  @Output() downOnLeft: EventEmitter<null> = new EventEmitter();
  @Output() upOnLeft: EventEmitter<null> = new EventEmitter();

  @Output() downOnMiddle: EventEmitter<null> = new EventEmitter();
  @Output() upOnMiddle: EventEmitter<null> = new EventEmitter();

  @Output() downOnRight: EventEmitter<null> = new EventEmitter();
  @Output() upOnRight: EventEmitter<null> = new EventEmitter();

  rightPressed: boolean = false;
  leftPressed: boolean = false;
  middlePressed: boolean = false;
  

  // we also emit if the user uses keys
  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    switch(event.code) { 
      case 'ArrowLeft': {
        this.downOnLeft.emit();
        this.leftPressed = true;
        break; 
      } 
      case 'ArrowRight': { 
        this.downOnRight.emit();
        this.rightPressed = true;
        break; 
      }
      case 'ArrowUp': {
        this.downOnMiddle.emit();
        this.middlePressed = true;
        break; 
      } 
      case 'Space': {
        this.downOnMiddle.emit();
        this.middlePressed = true;
        break; 
      } 
   } 
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    switch(event.code) { 
      case 'ArrowLeft': {
        this.upOnLeft.emit();
        this.leftPressed = false;
        break; 
      } 
      case 'ArrowRight': { 
        this.upOnRight.emit();
        this.rightPressed = false;
        break; 
      }
      case 'ArrowUp': {
        this.upOnMiddle.emit();
        this.middlePressed = false;
        break; 
      } 
      case 'Space': {
        this.upOnMiddle.emit();
        this.middlePressed = false;
        break; 
      } 
   }
  }

  constructor(private element: ElementRef) {
  }

  onDownOnLeft() {
    this.downOnLeft.emit();
    this.leftPressed = true;

  }

  onUpOnLeft() {
    this.upOnLeft.emit();
    this.leftPressed = false;
  }

  onDownOnMiddle() {
    this.downOnMiddle.emit();
    this.middlePressed = true;
  }

  onUpOnMiddle() {
    this.upOnMiddle.emit();
    this.middlePressed = false;
    
  }

  onDownOnRight() {
    this.downOnRight.emit();
    this.rightPressed = true;
  }
  
  onUpOnRight() {
    this.upOnRight.emit();
    this.rightPressed = false;
    
  }

}
