import styles from "./plebai.module.css";
import { Conversation } from "plebai-sdk";

declare var plebAiConf: {
  agentKey: string;
  chatTitle: string;
  primaryColor: string;
  secondaryColor: string;
  buttonColor:string;
};

export function createMessageDiv(
  message: string,
  sender: "user" | "agent",
): HTMLDivElement {
  const container = document.createElement("div");
  container.className =
    sender === "user"
      ? styles["plebai-chat-usermessage"]
      : styles["plebai-chat-agentmessage"];
  const paragraph = document.createElement("p");
  paragraph.innerText = message;
  if (plebAiConf.secondaryColor && sender === "agent") {
    container.style.backgroundColor = plebAiConf.secondaryColor;
  }
  container.appendChild(paragraph);
  return container;
}

function setUp() {
  const chatContainer = document.createElement("div");
  chatContainer.className = styles["plebai-chat-container"];
  const topBar = document.createElement("div");
  topBar.className = styles["plebai-chat-topbar"];
  const topBarTitle = document.createElement("p");
  topBarTitle.innerText = plebAiConf.chatTitle;
  topBar.appendChild(topBarTitle);

  const closeButton = document.createElement("button");
  closeButton.className = styles["plebai-chat-close"];
  closeButton.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>';
  closeButton.onclick = () => {
    chatContainer.style.visibility = "hidden";
    chatButton.style.visibility = "visible";
  };
  topBar.appendChild(closeButton);

  const chatInner = document.createElement("div");
  chatInner.className = styles["plebai-chat-inner"];

  const textContainer = document.createElement("div");
  textContainer.className = styles["plebai-chat-textcontainer"];

  const input = document.createElement("textarea");
  input.className = styles["plebai-chat-input"];
  input.onkeydown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (input.value.length < 1) {
        return;
      }
      conv.sendPrompt(input.value);
      input.value = "";
    }
  };
  textContainer.appendChild(input);

  const submitButton = document.createElement("button");
  submitButton.className = styles["plebai-chat-submit"];
  submitButton.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#000000}</style><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>';
  submitButton.onclick = () => {
    const prompt = input.value;
    if (prompt.length < 1) {
      return;
    }
    conv.sendPrompt(prompt);
    input.value = "";
  };
  textContainer.appendChild(submitButton);

  const poweredBy = document.createElement("p");
  poweredBy.className = styles["plebai-chat-poweredby"];
  poweredBy.innerHTML =
    'Powered by <a href="https://plebai.com" target="_blank">plebai.com</a>';

  chatContainer.appendChild(topBar);
  chatContainer.appendChild(chatInner);
  chatContainer.appendChild(textContainer);
  chatContainer.appendChild(poweredBy);

  if (plebAiConf.primaryColor) {
    topBar.style.backgroundColor = plebAiConf.primaryColor;
    submitButton.style.backgroundColor = plebAiConf.primaryColor;
  }

  document.body.appendChild(chatContainer);

  const chatButton = document.createElement("button");
  chatButton.className = styles["plebai-chat-button"];
  if (plebAiConf.buttonColor) chatButton.style.backgroundColor = plebAiConf.buttonColor;
  chatButton.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M284.046,224.8a34.114,34.114,0,1,0,34.317,34.113A34.217,34.217,0,0,0,284.046,224.8Zm-110.45,0a34.114,34.114,0,1,0,34.317,34.113A34.217,34.217,0,0,0,173.6,224.8Zm220.923,0a34.114,34.114,0,1,0,34.317,34.113A34.215,34.215,0,0,0,394.519,224.8Zm153.807-55.319c-15.535-24.172-37.31-45.57-64.681-63.618-52.886-34.817-122.374-54-195.666-54a405.975,405.975,0,0,0-72.032,6.357,238.524,238.524,0,0,0-49.51-36.588C99.684-11.7,40.859.711,11.135,11.421A14.291,14.291,0,0,0,5.58,34.782C26.542,56.458,61.222,99.3,52.7,138.252c-33.142,33.9-51.112,74.776-51.112,117.337,0,43.372,17.97,84.248,51.112,118.148,8.526,38.956-26.154,81.816-47.116,103.491a14.284,14.284,0,0,0,5.555,23.34c29.724,10.709,88.549,23.147,155.324-10.2a238.679,238.679,0,0,0,49.51-36.589A405.972,405.972,0,0,0,288,460.14c73.313,0,142.8-19.159,195.667-53.975,27.371-18.049,49.145-39.426,64.679-63.619,17.309-26.923,26.07-55.916,26.07-86.125C574.394,225.4,565.634,196.43,548.326,169.485ZM284.987,409.9a345.65,345.65,0,0,1-89.446-11.5l-20.129,19.393a184.366,184.366,0,0,1-37.138,27.585,145.767,145.767,0,0,1-52.522,14.87c.983-1.771,1.881-3.563,2.842-5.356q30.258-55.68,16.325-100.078c-32.992-25.962-52.778-59.2-52.778-95.4,0-83.1,104.254-150.469,232.846-150.469s232.867,67.373,232.867,150.469C517.854,342.525,413.6,409.9,284.987,409.9Z"/></svg>';
  chatButton.onclick = () => {
    chatContainer.style.visibility = "visible";
    chatButton.style.visibility = "hidden";
  };

  document.body.appendChild(chatButton);

  const conv = new Conversation(
    plebAiConf.agentKey,
    [
      "wss://relay.current.fyi",
      "wss://nostr-pub.wellorder.net",
      "wss://nostr.mom",
      "wss://nostr21.com",
      "wss://nos.lol",
    ],
    {
      secretKeyMethod: "throwaway",
      useWebLn: false,
      providerHost: "https://plebai.com",
    },
  );

  conv.sub(
    (e, m) => {
      if (e.pubkey === plebAiConf.agentKey) {
        const message = createMessageDiv(m, "agent");
        chatInner.appendChild(message);
      } else {
        const message = createMessageDiv(m, "user");
        chatInner.appendChild(message);
      }
      chatInner.scrollTo(0, chatInner.scrollHeight);
    },
    () => {},
  );
}
if (document.readyState === "complete") {
  setUp();
} else {
  document.addEventListener("DOMContentLoaded", setUp);
}
