/* global chrome */

async function sendSelectedTextToContent(text) {
  await createOffscreen();
  await chrome.runtime.sendMessage({ target: "offscreen", data: text });
}

// Create the offscreen document if it doesn't already exist
async function createOffscreen() {
  if (await chrome.offscreen.hasDocument()) return;
  await chrome.offscreen.createDocument({
    url: "offscreen.html",
    reasons: ["AUDIO_PLAYBACK"],
    justification: "testing", // details for using the API
  });
}

const contextMenus = {
  id: "webpage-audio",
  title: "Webpage Audio - Start reading",
  contexts: ["selection"],
};

chrome.contextMenus.create(contextMenus);

chrome.contextMenus.onClicked.addListener(async function (info) {
  await sendSelectedTextToContent(info.selectionText);
});
