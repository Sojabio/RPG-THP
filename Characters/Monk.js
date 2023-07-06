import Character from './Character.js';

class Monk extends Character {
  constructor(hp = 8, dmg = 20, mana = 200, name = "Moana", status = "playing" ){
    super(hp, dmg, mana, name, status);
  }

  specialAttack  = () => {
    if(this.mana > 0) {
      this.specialAttackName = "Heal";
      this.specialAttackHp =  8;
      this.specialAttackMana = -25;
      this.specialAttackDmg = 0;
    }
  }
}

export default Monk;
