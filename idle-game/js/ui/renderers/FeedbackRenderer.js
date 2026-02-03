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
  }
};
