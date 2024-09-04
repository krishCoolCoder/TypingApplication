import { Component } from '@angular/core';

@Component({
  selector: 'typer',
  templateUrl: './typer.component.html',
  styleUrls: ['./typer.component.css']
})
export class TyperComponent {
  text: string = 'Hello world!';
  inputText: string = '';
  textArray: string[] = [];

  constructor() {
    this.textArray = this.text.split('');
  }

  getCharClass(index: number): string {
    if (this.inputText[index] === undefined) {
      return '';
    }
    return this.inputText[index] === this.textArray[index] ? 'correct' : 'incorrect';
  }

  onInputChange() {
    // Additional logic can be added here if needed
  }

  isSpace(char: string): boolean {
    return char === ' ';
  }
}
