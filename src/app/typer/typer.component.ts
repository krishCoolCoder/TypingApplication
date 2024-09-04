import { Component, HostListener} from '@angular/core';

@Component({
  selector: 'typer',
  templateUrl: './typer.component.html',
  styleUrls: ['./typer.component.css']
})
export class TyperComponent {
  // text: string = 'Hello world!';
  text: string = 'apple banana orange grape lemon lime peach pear mango cherry plum apricot kiwi melon berry fig date papaya pomegranate coconut watermelon strawberry blueberry raspberry blackberry toast bread butter cheese milk cream coffee tea juice soda water soup salad rice pasta noodles burger pizza taco steak chicken fish egg bacon ham sausage hotdog sandwich cookie cake pie donut muffin candy chocolate ice cream yogurt cereal oats pancake waffle syrup honey jam jelly nut almond walnut cashew pecan sesame poppy sugar salt pepper garlic onion ginger basil thyme mint parsley rosemary dill chili curry sauce ketchup mustard mayo vinegar olive canola sunflower butter margarine tart brownie cupcake parfait fruit vegetable meat poultry seafood crab lobster scallop mussel shrimp clams oysters tuna trout salmon cod haddock snapper mackerel sardine anchovy anchovy herring squid octopus eel mussel oyster clam crawfish lobster crab shrimp fish anchovy mackerel trout salmon tuna cod haddock snapper sardine clam mussel squid octopus eel eel anchovy squid octopus mussel clam oyster shrimp lobster crab';
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

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    const key = event.key;

    if (key === 'Backspace') {
      this.inputText = this.inputText.slice(0, -1);
    } else if (key.length === 1) { // Only process printable characters
      this.inputText += key;
    }
  }

  isSpace(char: string): boolean {
    return char === ' ';
  }
}
