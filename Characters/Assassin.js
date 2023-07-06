import Character from './Character.js';
class Assassin extends Character {
  constructor(hp = 6, dmg = 60, mana = 20, name = "Carl", status = "playing" ){
    super(hp, dmg, mana, name, status);
    this.specialFeatureStatus = "deactivated";
  }

  specialAttack  = (selectedVictim) => {
    if(this.mana > 0){
      this.specialAttackName = "Shadow hit";
      this.specialAttackDmg = 7;// inflige 7 dmg et si adversaire pas mort, reçoit aussi 7 dmg.
      this.specialAttackMana = - 20;
      this.specialFeatureStatus = "processing";
      if (selectedVictim.hp > 0){
        this.specialAttackHp = - 7;
      } else {
        this.specialAttackHp = 0;
      }
    }
  }
}

export default Assassin;
