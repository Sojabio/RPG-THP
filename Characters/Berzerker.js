import Character from './Character.js';

class Berzerker extends Character {
  constructor(hp = 8, dmg = 40, mana = 0, name = "Draven", status = "playing"){
    super(hp, dmg, mana, name, status);
    this.specialFeatureStatus = false;
  }

  specialAttack  = () => {
    this.specialAttackName = "Rage";
    this.specialAttackHp = - 1;
    this.specialAttackDmg = this.dmg + 1;
    this.specialAttackMana = 0;
    this.specialFeatureStatus = true;
  }


  specialFeature = () => {
    if (this.specialFeatureStatus === true){
      this.dmg += 1;
      this.hp -= 1;
    }
  }
}

export default Berzerker;
