import Assassin from "./Characters/Assassin.js";
import Paladin from "./Characters/Paladin.js";
import Berzerker from "./Characters/Berzerker.js";
import Monk from "./Characters/Monk.js";
import Fighter from "./Characters/Fighter.js";

class Game {
  constructor(){
    this.turnLeft = 10;
    this.turnCount = 1;
    this.status = true;

    this.fighter = new Fighter();
    this.paladin = new Paladin();
    this.monk = new Monk();
    this.berzerker = new Berzerker();
    this.assassin = new Assassin();

    this.characters = [this.fighter, this.paladin, this.monk, this.berzerker, this.assassin];

  }


  aliveCharacters() {
    const characters = this.characters;
    return characters.filter((character) => character.status === "playing");
  }

  startTurn = () => {
    console.log(" ******************* ");
    console.log(`C'est parti pour le tour n° ${this.turnCount}`);
    const characters = this.aliveCharacters();
    this.findVictims(characters);
    this.changePlayerStatus();
    this.showStatistics();
    this.askForNewTurn();
  }



  findVictims = (characters) => {
    characters.forEach((character) => {
      let victims = characters.filter((victim) => victim.name !== character.name && victim.status == "playing");
      if (character.status === "playing") {
        this.chooseVictim(character, victims);
      }
    });
  }


  chooseVictim = (character, victims) => {
    const validVictimNames = victims.map(victim => victim.name);
    let selectedVictim = null;

    console.log(`C'est à ${character.name} (${character.constructor.name}) d'attaquer. Il lui reste ${character.hp} hp.`);

    while (!selectedVictim) {
      const askForVictim = prompt(`Bonjour ${character.name} ! Il te reste ${character.hp} hp. Qui souhaites-tu attaquer ? Voici la liste des victimes : ${validVictimNames.join(", ")}`);
      selectedVictim = victims.find(victim => victim.name === askForVictim);

      if (!selectedVictim) {
        console.log("Nom de victime invalide. Veuillez entrer un nom de victime valide.");
      }
    }

    this.calculatesAttack(selectedVictim, character);
  }



  calculatesAttack = (selectedVictim, character) => {
    let validAttack = false;

    while (validAttack === false){
      const askForAttack = prompt(`Tu as choisi ${selectedVictim.name} qui a ${selectedVictim.hp} points de vie. Quelle type d'attaque souhaites-tu effectuer ? ( 1: attaque normale 2: attaque spéciale)`);

      // cas de l'attaque normale
      if (askForAttack === "1"){
        console.log("1");
        validAttack = true;
        character.specialFeature();
        selectedVictim.takeDamage(character.dmg);
        character.killVictim(selectedVictim);

      // cas de l'attaque spéciale
      } else if (askForAttack === "2"){
        console.log("2");
        validAttack = true;
        character.specialAttack(selectedVictim);
        selectedVictim.takeDamage(character.specialAttackDmg);
        character.changeMana(character.specialAttackMana);
        character.changeHp(character.specialAttackHp);

      // cas d'une attaque non valide
      } else {
        validAttack = false;
      }

      // évaluation des résultats de l'attaque
      this.changeGameStatus();
    }
  }

  askForNewTurn = () => {
    if (this.status === true) {
      const question = confirm("Souhaites-tu poursuivre la partie ?");
      if (question === true) {
        this.skipTurn();
      } else {
        this.endGame();
      }
    }
  }

  skipTurn = () => {
    while (this.status === true) {
      this.turnCount++;
      this.startTurn();
    }
  }

  changePlayerStatus(){
    let specialCharacters = this.aliveCharacters().filter((specialCharacter) => specialCharacter.constructor.name === "Assassin" || specialCharacter.constructor.name === "Fighter");
    specialCharacters.forEach((specialCharacter) => {
      if (specialCharacter.specialFeatureStatus === "processing" ) {
        specialCharacter.specialFeatureStatus = "activated";
      } else if (specialCharacter.specialFeatureStatus === "activated" ) {
        specialCharacter.specialFeatureStatus = "deactivated";
      }
    });
  }

  changeGameStatus = () => {
    let count = this.characters.reduce(
      (count, character) => count + (character.status === "loser" ? 1 : 0),
      0);
    let winner = this.characters.filter(character => {
      return character.status === "playing";
    });
    if (count === 4 ){
      this.endGame();
      console.log(`${winner.map(winner => winner.name).join(", ")} remporte la partie`);
    } else if (this.turnCount > 9) {
      this.endGame();
      console.log(`${winner.map(winner => winner.name).join(", ")} remporte la partie`);
    }
  };

  endGame = () => {
    console.log(" ***************** ");
    console.log("La partie est terminée");
    this.status = false;
  }

  showStatistics = () => {
    const characters = this.characters;
    const Fighter = characters.find((specialCharacter) => specialCharacter.constructor.name === "Fighter");
    const Assassin = characters.find((specialCharacter) => specialCharacter.constructor.name === "Assassin");
    characters.forEach((character) => {
      if(character.hp <= 0){
        console.log(`${character.name} n'est plus de ce monde.`)
      } else if (character.name !== Fighter.name && character.name != Assassin.name){
        console.log(`${character.name} est toujours en vie. Il lui reste ${character.hp} hp et ${character.mana} points de mana.`)
      } else {
        console.log(`${character.name} est toujours en vie. Il lui reste ${character.hp} hp et ${character.mana} points de mana. Son statut spécial est ${character.specialFeatureStatus}`)
      }
    });
  }
}

const game = new Game();
game.startTurn();
game.skipTurn();
