import { createElement } from '../helpers/domHelper';
import { createFightersSelector } from './fighterSelector';

export function createFighters(fighters) {
  const selectFighter = createFightersSelector();
  const container = createElement({ tagName: 'div', className: 'fighters___root' });
  const preview = createElement({ tagName: 'div', className: 'preview-container___root' });
  const fightersList = createElement({ tagName: 'div', className: 'fighters___list' });
  const fighterElements = fighters.map((fighter) => createFighter(fighter, selectFighter));

  fightersList.append(...fighterElements);
  container.append(preview, fightersList);

  return container;
}

function createFighter(fighter, selectFighter) {
  const fighterElement = createElement({ tagName: 'div', className: 'fighters___fighter' });
  const imageElement = createImage(fighter);
  const onClick = (event) => selectFighter(event, fighter._id);

  fighterElement.append(imageElement);
  fighterElement.addEventListener('click', onClick, false);

  return fighterElement;
}

function createImage(fighter) {
  const { source, name } = fighter;
  const attributes = {
    src: source,
    title: name,
    alt: name
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter___fighter-image',
    attributes
  });

  return imgElement;
}

export function changeHealthbarWidth({ initialHealth, health }, position) {
  const initialWidth = document.getElementById('left-fighter-indicator').offsetWidth;
  const healthbar = document.getElementById(`${position}-fighter-indicator`);
  const newHealthbar = (initialWidth * health) / initialHealth;
  const healthbarWidth = newHealthbar >= 0 ? newHealthbar : 0;
  healthbar.style.width = `${healthbarWidth}px`;
}

export function toggleShield(position) {
  const shield = document.getElementById(`${position}-shield`);
  shield.style.visibility = shield.style.visibility === 'visible' ? 'hidden' : 'visible';
}

export function showAttack(position, attack) {
  const attackView = document.getElementById(`${position}-${attack}`);
  attackView.classList.add(`arena___${position}-${attack}-show`);
  setTimeout(() => {
    attackView.classList.remove(`arena___${position}-${attack}-show`);
  }, 200);
}
