import { Component, HostListener} from '@angular/core';

@Component({
  selector: 'typer',
  templateUrl: './typer.component.html',
  styleUrls: ['./typer.component.css']
})
export class TyperComponent {
  // text: string = 'Hello world!';
  text: string = `the and is in on at by with for from to of a an as be do have it if he she they we you I me him her them us our your my mine this that these those what which who whom where when why`;
  // text: string = `the and is in on`;
  // text: string = `The quick brown fox jumped over the lazy dogs.`;
  lines: string[] = [];
  currentLineIndex: number = 0;
  inputText: string = '';
  totalKeystroke : number = 0;
  allKeystrokes : any[]= [];
  correctKeystroke : number = 0;
  wrongKeystroke : number = 0;
  index : any = 0;
  grossWPM : any ;
  netWPM : any ;
  accuracy : any;
  showPopUp : boolean = false;
  timerStarted : boolean = false;
  typingStarted : boolean = false;
  timingData : any= 1;

  constructor() {
    this.lines = this.text.split(' '); // Split text into words for display
  }
  ngOnInit (){
//     setTimeout(()=>{
//       const inputCharacters = this.allKeystrokes.map(item => item.keyValue).join('');
//       let correctCount = 0;
// let incorrectCount = 0;

// // Compare characters
// for (let i = 0; i < inputCharacters.length; i++) {
//     if (inputCharacters[i] === this.text[i]) {
//         correctCount++;
//     } else {
//         incorrectCount++;
//     }
// }
// // calculating the Gross wpm : 
// let grossWpm = this.totalKeystroke/ 5;
// let netWpm = correctCount / 5;
// let accuracy = (netWpm * 100) / grossWpm;
// this.grossWPM = grossWpm;
// this.netWPM = netWpm;
// this.accuracy = accuracy;
// this.showPopUp = true;

//       // alert("Times up. \n Gross WPM : "+ grossWpm + " \n Net WPM : "+netWpm+" \n Accuracy : "+accuracy)
//       // console.log("Times up. TotalKeystroke : "+ this.totalKeystroke + " Correct keystroke : " + correctCount + " Wrong keystroke : "+ (this.wrongKeystroke + incorrectCount)  +" and the Gross WPM is this : " + grossWpm, " and the netWpm is this : ", netWpm, " and the accuracy is this : ", accuracy )
//     }, 10000)
  }

  getDisplayedLine(): string[] {
    // Display 10 words per line for example
    const currentLine = this.lines.slice(this.currentLineIndex, this.currentLineIndex + 10);
    return currentLine.join(' ').split(''); // Convert line into array of characters
  }

  getNextLine(): string[] {
    // Display the next set of 10 words for preview
    const nextLine = this.lines.slice(this.currentLineIndex + 10, this.currentLineIndex + 20);
    return nextLine.join(' ').split(''); // Convert line into array of characters
  }

  getCharClass(index: number): string {
    if (this.inputText[index] === undefined) {
      return '';
    }
    // console.log("The index in getCharClass is this : ", index)
      this.index = index;
    return this.inputText[index] === this.getDisplayedLine()[index] ? 'correct' : 'incorrect';
  }
  // getIndex(index:any) {
  //   console.log("The index is this : ", index)
  // }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    const key = event.key;
    if ( /^[a-zA-Z0-9 ]$/.test(key) ) {
      this.totalKeystroke++;
      if ( this.typingStarted == false ) {
        this.startTimer(this.timingData);
      }
    }
    if (key === 'Backspace') {
      // this.wrongKeystroke++;
      this.allKeystrokes.pop()
      this.totalKeystroke--;
      this.inputText = this.inputText.slice(0, -1);
    } else if (key.length === 1) { // Only process printable characters
      if ( /^[a-zA-Z0-9 ]$/.test(key) ) {
        this.allKeystrokes.push(
          {
            index : this.totalKeystroke-1,
            keyValue : key
          }
        )
      }
      this.inputText += key;
    }
    let inputText = this.inputText.length;
    let displayedLine = this.getDisplayedLine();
    // Move to the next line if inputText matches or exceeds the length of the displayed line
    if (inputText >= displayedLine.length) {
      this.currentLineIndex += 10; // Move to the next set of text
      this.inputText = '';
    }
  }

  isSpace(char: string): boolean {
    return char === ' ';
  }

  closePopup () : void {
    this.showPopUp = false;
  }

  startTimer(time: any) : void {
    setTimeout(()=>{
      const inputCharacters = this.allKeystrokes.map(item => item.keyValue).join('');
      let correctCount = 0;
let incorrectCount = 0;

// Compare characters
for (let i = 0; i < inputCharacters.length; i++) {
    if (inputCharacters[i] === this.text[i]) {
        correctCount++;
    } else {
        incorrectCount++;
    }
}
// calculating the Gross wpm : 
let grossWpm = this.totalKeystroke/ 5;
let netWpm = correctCount / 5;
let accuracy = (netWpm * 100) / grossWpm;
this.grossWPM = grossWpm;
this.netWPM = netWpm;
this.accuracy = accuracy;
this.showPopUp = true;
    }, time*1000)
  }

  resetTyping(): void {
    this.currentLineIndex = 0;
    this.inputText = '';
    // this.correctKeyStroke = 0;
    this.correctKeystroke = 0;
    this.wrongKeystroke = 0;
    this.timerStarted = false;
    // window.location.reload();
    this.getDisplayedLine(); // Reset the displayed line
    this.getNextLine(); // Reset the next line preview
    this.typingStarted = false
    // this.startTimer(30); // Restart the 30-second timer
  }

  setTyping (input: any) {
    this.timingData = input;
  }
}
