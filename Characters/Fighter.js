import Character from './Character.js';

class Fighter extends Character {
  constructor(hp = 12, dmg = 40, mana = 40, name = "Grace", status = "playing" ){
    super(hp, dmg, mana, name, status);
    this.specialFeatureStatus = "deactivated";
  }

  specialAttack  = () => {
    if(this.mana > 0){
      this.specialAttackName = "Dark Vision";
      this.specialAttackDmg = 5;
      this.specialAttackMana = -20;
      this.specialAttackHp = 0;
      this.specialFeatureStatus = "processing";
    }
  }
}

export default Fighter;
