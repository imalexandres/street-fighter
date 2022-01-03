import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {

    const playerOne = {
      ...firstFighter,
      maxHealth: firstFighter.health,
      isAttacked: false,
      isInBlock: false,
      isCriticalHitAllowed: true,
      position: 'left'
    }

    const playerTwo = {
      ...secondFighter,
      maxHealth: secondFighter.health,
      isAttacked: false,
      isInBlock: false,
      isCriticalHitAllowed: true,
      position: 'right'
    }
    let pressed = new Set();

    window.addEventListener('keydown', event => {
      pressed.add(event.code);
      switch (event.code) {
        case controls.PlayerOneAttack:
          if (validateAttack(playerOne, playerTwo)) {
            playerOne.isAttacked = true;
            playerTwo.health -= getDamage(playerOne, playerTwo);
          }
          break;

        case controls.PlayerTwoAttack:
          if (validateAttack(playerTwo, playerOne)) {
            playerTwo.isAttacked = true;
            playerOne.health -= getDamage(playerTwo, playerOne);
          }
          break;

        case controls.PlayerOneBlock:
          playerOne.isInBlock = true;
          break;

        case controls.PlayerTwoBlock:
          playerTwo.isInBlock = true;
          break;
      }

      if (controls.PlayerOneCriticalHitCombination.every(code => pressed.has(code))){
        if (playerOne.isCriticalHitAllowed) {
          playerTwo.health -= getCriticalHit(playerOne);
          playerOne.isCriticalHitAllowed = false;
          setTimeout(function () {
            playerOne.isCriticalHitAllowed = true;
          }, 10000);
        }
      }

      if (controls.PlayerTwoCriticalHitCombination.every(code => pressed.has(code))){
        if (playerTwo.isCriticalHitAllowed) {
          playerOne.health -= getCriticalHit(playerTwo);
          playerTwo.isCriticalHitAllowed = false;
          setTimeout(function () {
            playerTwo.isCriticalHitAllowed = true;
          }, 10000);
        }
      }

      changeHealthBar(playerOne.position, playerOne.health, playerOne.maxHealth);
      changeHealthBar(playerTwo.position, playerTwo.health, playerTwo.maxHealth);

      if (playerOne.health <= 0) {
        resolve(secondFighter);
      }
      if (playerTwo.health <= 0) {
        resolve(firstFighter);
      }
    })

    window.addEventListener('keyup', event => {
      pressed.delete(event.code);
      switch (event.code) {
        case controls.PlayerOneAttack:
          playerOne.isAttacked = false;
          break;

        case controls.PlayerTwoAttack:
          playerTwo.isAttacked = false;
          break;

        case controls.PlayerOneBlock:
          playerOne.isInBlock = false;
          break;

        case controls.PlayerTwoBlock:
          playerTwo.isInBlock = false;
          break;
      }
    })

  });
}

function validateAttack(attacker, defender) {
  return !attacker.isAttacked && !attacker.isInBlock && !defender.isInBlock;
}

function changeHealthBar(indicatorPosition, playerHp, maxPlayerHp) {
  const healthIndicator = document.getElementById(`${indicatorPosition}-fighter-indicator`);
  const hpSecondFighterRemains = playerHp < 0 ? 0 : (playerHp / maxPlayerHp) * 100;
  healthIndicator.style.width = `${hpSecondFighterRemains}%`;
}

export function getDamage(attacker, defender) {
  const damageRaw = getHitPower(attacker) - getBlockPower(defender);
  return damageRaw > 0 ? damageRaw : 0;
}

export function getCriticalHit(fighter) {
  return 2 * fighter.attack;
}
export function getHitPower(fighter) {
  const criticalHitChance = Math.random() + 1;
  return fighter.attack * criticalHitChance;
}

export function getBlockPower(fighter) {

  const dodgeChance = Math.random() + 1;
  return fighter.defense * dodgeChance;
}
