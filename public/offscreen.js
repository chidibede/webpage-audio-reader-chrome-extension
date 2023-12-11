/* global chrome */
// Listen for messages from the extension
const AWS_FILE_SERVICES_URL =
  "https://0p18ctd8q2.execute-api.eu-west-1.amazonaws.com/production";
const AWS_MIDDLEWARE_URL =
  "https://hnezdvsemdsehiwikqefnnr7zy0usfut.lambda-url.eu-west-1.on.aws/";

const generateSpeaker = (language) => {
  const speakers = {
    "es-ES": "Sergio",
    "fr-FR": "Lea",
    "ar-AE": "Hala",
    "pt-BR": "Thiago",
    "de-DE": "Daniel",
    "cmn-CN": "Zhiyu",
    "en-GB": "Brian",
  };

  return speakers[language];
};

chrome.runtime.onMessage.addListener((message) => {
  if (message.target === "offscreen") {
    handleSelectedText(message.data);
  }
});

async function handleSelectedText(text) {
  await textToSpeech(text);
}

async function convertTextToSpeech(text, language) {
  const speaker = generateSpeaker(language);
  const ssmlText = "<speak><prosody rate='100%'>" + text + "</prosody></speak>";
  try {
    const params = {
      OutputFormat: "mp3",
      Text: ssmlText,
      VoiceId: speaker,
      SampleRate: "22050",
      LanguageCode: language,
      TextType: "ssml",
      Engine: "neural",
    };

    const res = await fetch(
      `${AWS_MIDDLEWARE_URL}/api/analyze`,
      requestOptions
    );

    const message = await res.json();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...message.data,
        // Add any other headers if required by your API
      },
      body: JSON.stringify(params),
    };

    const response = await fetch(
      `${AWS_FILE_SERVICES_URL}/api/speech`,
      requestOptions
    );
    const results = await response.json();
    return results.data;
  } catch (error) {
    console.log(error);
  }
}

const playAudio = (audioStream) => {
  const uInt8Array = new Uint8Array(audioStream);
  const arrayBuffer = uInt8Array.buffer;
  const blob = new Blob([arrayBuffer]);
  const url = URL.createObjectURL(blob);

  const elementId = "audioElement" + new Date().valueOf().toString();
  const audioElement = document.createElement("audio");
  audioElement.setAttribute("id", elementId);
  document.body.appendChild(audioElement);
  audioElement.src = url;
  audioElement.play();
};

async function textToSpeech(text) {
  const { AudioStream } = await convertTextToSpeech(text, "en-GB");
  playAudio(AudioStream.data);
}
