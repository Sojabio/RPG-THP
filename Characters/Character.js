class Character {

  constructor (hp, dmg, mana, name, status) {
    this.hp = hp;
    this.dmg = dmg;
    this.mana = mana;
    this.name = name;
    this.status = status;
  }

  takeDamage = (dmg) => {
    if (this.constructor.name === "Assassin" && this.specialFeatureStatus === "activated") {
      console.log(`${this.name} n'a pas été touché grâce à sa protection`);
    } else if (this.constructor.name === "Fighter" && this.specialFeatureStatus === "activated") {
      this.hp = this.hp - (dmg - 2);
    } else {
      this.hp = this.hp - dmg;
      if (this.hp > 0) {
        console.log(`${this.name} a reçu ${dmg} points de dégât. Il lui reste ${this.hp} hp et ${this.mana} points de mana.`);
      } else {
        this.isOut(dmg);
      }
    }
  }

    changeHp = (hp) => {
      this.hp = this.hp + hp;
    }

    changeMana = (mana) => {
      this.mana = this.mana + mana;
    }


    killVictim = (victim) => {
      if(victim.hp <= 0) {
        this.mana = this.mana + 20;
      }
    }

    isOut = (dmg) => {
      console.log(` ${this.name} a reçu ${dmg} points de dégât. Tu lui as donné un coup mortel !`);
      this.status = "loser";
    }

    specialFeature = () => {
    }
}

export default Character;
