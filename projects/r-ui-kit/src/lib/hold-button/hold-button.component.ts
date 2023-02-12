import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'hold-button',
  templateUrl: './hold-button.html',
  styleUrls: ['./hold-button.scss'],
})
export class HoldButtonComponent implements OnInit {
  @ViewChild('holdButtonWrapper') holdButtonWrapper: any;
  @Input() labels = {
    REGULAR: 'Click',
    HOLD: 'Hold to confirm',
    CONFIRMED: 'Confirmed',
  };
  @Input() confirmationTime: number = 1000;
  @Input() transition: number = 1;
  @Output() onConfirm: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  button: any;
  progressBar: any;
  holding: boolean = false;
  animationId: any;
  timeOnMouseDown: number = 0;
  percentage = 0;
  elapsedTime = 0;
  state: 'REGULAR' | 'CONFIRMED' | 'HOLD' = 'REGULAR';

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.handleEvents();
  }

  handleEvents() {
    this.button = this.holdButtonWrapper.nativeElement;
    this.progressBar = this.button.querySelector('.progress-bar');

    if (!this.button || !this.progressBar) {
      return;
    }

    fromEvent(this.button, 'mousedown').subscribe(() => {
      this.state = 'HOLD';
      this.timeOnMouseDown = Date.now();
      this.animationId = requestAnimationFrame(
        this.progressAnimation.bind(this)
      );
    });

    fromEvent(this.button, 'mouseup').subscribe(() => {
      this.percentage = 0;
      this.state = 'REGULAR';
      this.cancelAnimation();
    });
  }

  cancelAnimation() {
    this.progressBar.style.transition = this.transition + 's';
    cancelAnimationFrame(this.animationId);
    this.holding = false;
    this.progressBar.style.padding = '0';
  }

  confirmed() {
    this.state = 'CONFIRMED';
    this.onConfirm.emit(true);
    this.cancelAnimation();
  }

  progressAnimation() {
    this.progressBar.style.transition = 'none';
    this.progressBar.style.padding = '10px';

    const progressionTime = Date.now();
    this.elapsedTime = progressionTime - this.timeOnMouseDown;
    this.percentage = Math.round(
      (100 * this.elapsedTime) / this.confirmationTime
    );
    if (this.percentage > 100) {
      this.confirmed();
      return;
    }
    this.animationId = requestAnimationFrame(this.progressAnimation.bind(this));
  }
}
