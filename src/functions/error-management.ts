export const showError = (error = "Error when connecting to the API") => {
  const channel = new BroadcastChannel("notifications");
  channel.postMessage(error);
  channel.close();
};
