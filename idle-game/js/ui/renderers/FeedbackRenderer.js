export const FeedbackRenderer = {
  render: (state, elements) => {
    if (state.riskPenaltyTime > 0) {
      elements.penaltyOverlay.classList.remove("hidden");
    } else {
      elements.penaltyOverlay.classList.add("hidden");
    }
  },

  showPenalty: (elements) => {
    if (elements.penaltyOverlay) elements.penaltyOverlay.classList.remove("hidden");
  },

  showRankUp: (elements, rankData) => {
    if (elements.rankOverlay) {
        if (elements.rankMsg) elements.rankMsg.textContent = `Você agora é ${rankData.name}.`;
        if (elements.rankBonus) elements.rankBonus.textContent = `+${Math.round(rankData.bonus * 100)}% Bônus Global`;
        elements.rankOverlay.classList.remove("hidden");
    }
  },

  hideRankUp: (elements) => {
    if (elements.rankOverlay) elements.rankOverlay.classList.add("hidden");
  }
};
