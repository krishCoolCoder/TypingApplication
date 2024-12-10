import { Component, HostListener} from '@angular/core';
import { first } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'typer',
  templateUrl: './typer.component.html',
  styleUrls: ['./typer.component.css']
})
export class TyperComponent {
  // text: string = 'Hello world!';
  // text: string = `the and is in on at by with for from to of a an as be do have it if he she they we you I me him her them us our your my mine this that these those what which who whom where when why`;
  // text: string = `the and is in on`;
  // text: string = `The quick brown fox jumped over the lazy dogs.`;
  text : string = "a an the I you he she it we they me him her us them mine yours his hers ours theirs and or but because although since while though yet so in on at with by for about under over through between before after across is are was were have has had do does did say go make take see come give find think get tell run keep put write read type watch sit eat drink play jump sleep stand walk talk shout whisper laugh cry run sing dance swim draw paint cut build drive fly ride cook clean fix pack open close break repair start stop begin end search look see hear feel touch hold grab push pull love hate like dislike enjoy prefer want need try choose wish decide plan dream hope create destroy change grow learn teach share help give receive ask answer say explain question solve count write draw print type smile frown laugh cry whisper shout sing hum jump skip hop run walk stand sit crawl climb push pull carry lift drop throw catch hold wave point clap stamp kick punch hit hug kiss pat pet pull push arrive leave enter exit move stay follow lead guide direct follow show hide save spend borrow lend buy sell pay give take hold keep find lose break fix organize divide multiply subtract add share take meet greet ask answer question think understand forget remember read write print draw talk listen speak hear see look watch feel touch taste smell hold carry push pull lift drop throw catch hit hug kick punch dance sing hum shout whisper run walk drive fly swim jump sit stand crawl kneel bend stretch lift drop wave point touch grab pull pat shake laugh cry smile frown blush hide show enter exit begin end stay leave arrive go come ask answer learn teach buy sell give take pass fail build break search find lose remember forget start stop create destroy plan prepare hope dream think believe wish decide choose help lead follow save spend borrow lend agree disagree win lose catch miss throw kick bounce hit break fix repair move stay push pull shake twist bend stretch organize clean wash dry cook bake fry boil freeze melt grow shrink rise fall run walk jog sprint jump hop skip dance sing hum swim drive fly ride follow lead climb crawl kneel sit stand watch listen speak hear smell taste feel touch think believe know understand forget remember ask answer explain show hide find lose take give love hate like dislike enjoy prefer want need create destroy help save share open close cut build break fix repair"
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

  countdown: number = 60; // Initial countdown value

  constructor(private location: Location) {
  }
  ngOnInit (){
    this.timingData = 60;
    this.text = this.randomizeString(this.text);
    this.lines = this.text.split(' '); // Split text into words for display
    // this.startCountdown();
  }

  startCountdown(): void {
    const timer = setInterval(() => {
      this.countdown -= 1;
      if (this.countdown <= 0) {
        clearInterval(timer); // Stop the countdown
      }
    }, 1000); // Decrease the countdown every 1000 ms (1 second)
  }

  randomizeString(text: string) {
    // Split the string into an array of words
    const wordsArray = text.split(' ');
    
    // Function to shuffle the array using the Fisher-Yates algorithm
    for (let i = wordsArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wordsArray[i], wordsArray[j]] = [wordsArray[j], wordsArray[i]]; // Swap elements
    }
  
    // Join the shuffled array back into a single string
    return wordsArray.join(' ');
  }

  getDisplayedLine(): string[] {
    // Display 10 words per line for example
    const currentLine = this.lines.slice(this.currentLineIndex, this.currentLineIndex + 10);
    // console.log("The first line is this : ", currentLine.join(' ').split(''))
    let firstLine = currentLine.join(' ').split('');
    firstLine.push(" ")
    return firstLine; // Convert line into array of characters
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
        this.typingStarted = true;
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
    this.startCountdown();
    setTimeout(()=>{
      let inputCharacters = this.allKeystrokes.map(item => item.keyValue).join('');
      console.log("The inputCharacter is this : ", inputCharacters, " and all key strokes is this : ", this.allKeystrokes)
      let correctCount = 0;
let incorrectCount = 0;
// this.typingStarted == false

// Compare characters
for (let i = 0; i < inputCharacters.length; i++) {
    if (inputCharacters[i] === this.text[i]) {
        correctCount++;
    } else {
        incorrectCount++;
    }
}
// calculating the Gross wpm : 
// let grossWpm = (this.totalKeystroke/ 5)/time;
let grossWpm = (this.totalKeystroke / 5) /(time/60);
let netWpm = (correctCount / 5)/(time/60);
let accuracy = (correctCount / this.totalKeystroke) * 100;
console.log("The correct keys are : ", correctCount, " and total keys are : ", this.totalKeystroke)
this.grossWPM = Math.round(grossWpm);
this.netWPM = Math.round(netWpm);
this.accuracy = Math.round(accuracy);
this.showPopUp = true;
grossWpm = 0;
netWpm = 0;
accuracy = 0;
inputCharacters = "";
correctCount = 0;
incorrectCount = 0;
this.totalKeystroke = 0;
this.allKeystrokes = [];
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
    this.typingStarted = false;
    this.totalKeystroke = 0;
    this.grossWPM = 0;
    this.netWPM = 0;
    this.accuracy = 0;
    this.allKeystrokes = [];
    // this.startTimer(30); // Restart the 30-second timer
    window.location.reload();
  }

  setTyping (input: any) {
    // this.resetTyping();
    this.timingData = input;
    this.countdown = input;

    // this.currentLineIndex = 0;
    // this.inputText = '';
    // // this.correctKeyStroke = 0;
    // this.correctKeystroke = 0;
    // this.wrongKeystroke = 0;
    // this.timerStarted = false;
    // // window.location.reload();
    // this.getDisplayedLine(); // Reset the displayed line
    // this.getNextLine(); // Reset the next line preview
    // this.totalKeystroke = 0;
    // this.grossWPM = 0;
    // this.netWPM = 0;
    // this.accuracy = 0;
    // this.allKeystrokes = [];
  }
}
