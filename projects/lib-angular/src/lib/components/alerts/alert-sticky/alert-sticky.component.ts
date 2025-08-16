import { NgClass } from '@angular/common';
import { Component, computed, EventEmitter, input, Output, signal, SimpleChanges } from '@angular/core';

@Component({
  selector: 'lib-alert-sticky',
  imports: [NgClass],
  templateUrl: './alert-sticky.component.html',
  styleUrl: './alert-sticky.component.scss'
})
export class AlertStickyComponent {

  isVisible = input<boolean>(false);
  alertClass = input<string>('alert-blue');
  dismissAfterSeconds = input<number | null>(null);

  @Output() closed = new EventEmitter<void>();

  private dismissTimer: any;
  private isAnimationRunning = signal(false);

  public animationDuration = computed(() => `${this.dismissAfterSeconds()}s`);
  public isProgressBarVisible = computed(() => this.dismissAfterSeconds() ?? 0 > 0);
  public animationState = computed(() => this.isAnimationRunning());

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isVisible'] && this.isVisible()) {
      this.startDismissTimer();
    }
  }

  ngOnDestroy(): void {
    this.clearDismissTimer();
  }
  startDismissTimer(): void {
    this.clearDismissTimer();
    const dismissTime = this.dismissAfterSeconds();

    if (dismissTime && dismissTime > 0) {
      this.isAnimationRunning.set(false);
      setTimeout(() => {
        this.isAnimationRunning.set(true);
        this.dismissTimer = setTimeout(() => {
          this.closeAlert();
        }, dismissTime * 1000);
      }, 10);
    }
  }

  private clearDismissTimer(): void {
    clearTimeout(this.dismissTimer);
    this.isAnimationRunning.set(false);
  }

  closeAlert(): void {
    this.clearDismissTimer();
    this.closed.emit();
  }

  onMouseEnter(): void {
    if (this.isProgressBarVisible()) {
      this.clearDismissTimer();
    }
  }

  onMouseLeave(): void {
    if (this.isProgressBarVisible()) {
      this.startDismissTimer();
    }
  }

}
