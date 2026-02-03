export const LogsRenderer = {
  lastLogTime: 0,

  render: (state, elements) => {
    if (!state.logs || state.logs.length === 0) return;
    const latest = state.logs[0];
    if (latest.time <= LogsRenderer.lastLogTime) return; // No new logs

    const container = elements.logsList;
    container.innerHTML = "";

    state.logs.forEach((log) => {
      const div = document.createElement("div");
      div.className = "log-entry";
      const time = new Date(log.time).toLocaleTimeString();
      div.textContent = `[${time}] ${log.message}`;
      container.appendChild(div);
    });

    LogsRenderer.lastLogTime = latest.time;
  }
};
