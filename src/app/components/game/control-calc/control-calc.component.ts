import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-control-calc',
  template:`
    <div class="left"
        (mousedown)="mouseDownOnLeft.emit()"
        (mouseup)  ="mouseUpOnLeft.emit()">
      GO LEFT
    </div>
    
    <div class="middle"
        (mousedown)="mouseDownOnMiddle.emit()"
        (mouseup)  ="mouseUpOnMiddle.emit()">
      SHOOT !
    </div>
    
    <div class="right"
        (mousedown)="mouseDownOnRight.emit()"
        (mouseup)  ="mouseUpOnRight.emit()">
      GO RIGHT
    </div>
  `,
  styleUrls: ['./control-calc.component.scss']
})
export class ControlCalcComponent implements OnInit {

  @Output() mouseDownOnLeft: EventEmitter<null> = new EventEmitter();
  @Output() mouseUpOnLeft: EventEmitter<null> = new EventEmitter();

  @Output() mouseDownOnMiddle: EventEmitter<null> = new EventEmitter();
  @Output() mouseUpOnMiddle: EventEmitter<null> = new EventEmitter();

  @Output() mouseDownOnRight: EventEmitter<null> = new EventEmitter();
  @Output() mouseUpOnRight: EventEmitter<null> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
