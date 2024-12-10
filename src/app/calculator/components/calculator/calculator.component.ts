import { ChangeDetectionStrategy, Component, computed, HostListener, inject, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CalculatorService } from '@/calculator/services/calculator.service';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [
    CalculatorButtonComponent
  ],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)'
  }

})
export class CalculatorComponent {

  private calculatorService = inject(CalculatorService);

  public calculatorButtons = viewChildren(CalculatorButtonComponent);

  public resultText = computed(() => this.calculatorService.resultText());
  public subResultText = computed(() => this.calculatorService.subResultText());
  public lastOperator = computed(() => this.calculatorService.lastOperator());

  handleClick(key: string) {
    this.calculatorService.constructNumber(key);
  }

  /*   @HostListener('document:keyup', ['$event']) */
  public handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event.key);
    
    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      'x': '*',
      '/': '÷',
      Enter: '='
    };
    
    const key = event.key;
    const keyValue = keyEquivalents[key] ?? key;
    
    this.handleClick(keyValue);

    this.calculatorButtons().forEach((btn) => {
      btn.keyboardPressedStyle(keyValue);
    })
  }
}
