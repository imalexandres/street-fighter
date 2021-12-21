import { createFighterImage } from "../fighterPreview";
import { showModal } from "./modal";

export function showWinnerModal(fighter) {
  const winner = {
    title: `${fighter.name} win`,
    bodyElement: createFighterImage(fighter),
    onClose: () => location.reload()
  };
  showModal(winner);
}
