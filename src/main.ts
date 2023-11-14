import styles from "./plebai.module.css";
import { Conversation } from "plebai-sdk";

declare var plebAiConf: {
  agentKey: string;
  chatTitle: string;
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

  document.body.appendChild(chatContainer);

  const chatButton = document.createElement("button");
  chatButton.className = styles["plebai-chat-button"];
  chatButton.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#808080}</style><path d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z"/></svg>';
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
