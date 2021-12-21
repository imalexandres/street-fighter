import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  if(fighter)
  {
    const image = createFighterImage(fighter);
    const info = createFighterInfo(fighter);
    fighterElement.append(image, info);
  }
  // todo: show fighter info (image, name, health, etc.)


  return fighterElement;

}

function createFighterInfo(fighter){

  const infoElement = createElement({
    tagName: 'div',
    className: `fighter-preview__info`
  });

  const name = createElement({tagName: 'span'});
  name.innerHTML = `<b>${fighter.name}</b>`;

  const health = createElement({tagName: 'span'});
  health.innerHTML = `Health: ${fighter.health}`;

  const attack = createElement({tagName: 'span'});
  attack.innerHTML = `Attack: ${fighter.attack}`;

  const defense = createElement({tagName: 'span'});
  defense.innerHTML = `Defense: ${fighter.defense}`;

  infoElement.append(name, health, attack, defense);
  return infoElement;
}
export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    title: name,
    alt: name 
  };
  return createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });
}
