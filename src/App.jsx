import "./App.css";

function App() {
  // const colour = "red";

  // async function startReading() {
  //   const [tab] = await chrome.tabs.query({ active: true });
  //   chrome.scripting.executeScript({
  //     target: { tabId: tab.id },
  //     args: [colour],
  //     func: () => {
  //       const text = window.getSelection().toString();
  //       alert(text);
  //     },
  //   });
  // }

  return (
    <>
      <h1>Webpage Audio Reader</h1>
      <div>
        Experience effortless webpage narration with our Chrome extension!
        Transform text on any webpage into an engaging audio experience, perfect
        for auditory learners. Listen to content in a natural flow, making
        learning and absorbing information more accessible and enjoyable.
      </div>
      <div className="card">
        To start reading, select text of  choice and right click on the screen, then click on Webpage Reader - Start reading
      </div>
    </>
  );
}

export default App;
