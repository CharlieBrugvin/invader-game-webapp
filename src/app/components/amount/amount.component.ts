import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
@Component({
  selector: "app-amount",
  template: `
  <div [ngClass]="{'increment': true,
                   'isIncrementing': isIncrementing}">
    {{ incrementText }}
  </div>
  <div [ngClass]="{
      'amount': true,
      'isIncrementing': isIncrementing
      }">
    {{ amount }}
  </div>
  `,
  styleUrls: ["./amount.component.scss"]
})
export class AmountComponent implements OnInit {
  @Input() amount: number;

  isIncrementing = false;
  incrementText: string;

  constructor() {}

  ngOnInit() {
  }

  ngOnChanges(simpleChanges: SimpleChanges) {

    console.log(simpleChanges)

    if(simpleChanges.amount && !simpleChanges.amount.firstChange) {
      this.isIncrementing = true;
      const increment = simpleChanges.amount.currentValue - simpleChanges.amount.previousValue;

      this.incrementText = (increment > 0 ? '+' : '-') + Math.abs(increment) ;
      
      setTimeout( () => {
        this.isIncrementing = false;
      }, 1000);
    }
  }
}
