import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-control-calc',
  template:`
    <div class="left"
        (panstart)="downOnLeft.emit()"
        (panend)  ="upOnLeft.emit()"
        (touchstart)="downOnLeft.emit()"
        (touchend)="upOnLeft.emit()">
      GO LEFT
    </div>
    
    <div class="middle"
        (down)="downOnMiddle.emit()"
        (mouseup)  ="upOnMiddle.emit()"
        (touchstart)="downOnMiddle.emit()"
        (touchend)="upOnMiddle.emit()">
      SHOOT !
    </div>
    
    <div class="right"
        (down)="downOnRight.emit()"
        (mouseup)  ="upOnRight.emit()"
        (touchstart)="downOnRight.emit()"
        (touchend)="upOnRight.emit()">
      GO RIGHT
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

  constructor() { }

  ngOnInit() {
  }

  test() {
    console.log('wesh')
  }

}
