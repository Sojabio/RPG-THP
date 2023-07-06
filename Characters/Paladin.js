import Character from './Character.js';

class Paladin extends Character {
  constructor(hp = 16, dmg = 30, mana = 160, name = "Ulder", status = "playing" ){
    super(hp, dmg, mana, name, status);
  }

  specialAttack  = () => {
    if(this.mana > 0) {
      this.specialAttackName = "Healing Lighting";
      this.specialAttackDmg = 4;
      this.specialAttackHp =  5;
      this.specialAttackMana = -40;
    }
  }
}

export default Paladin;
