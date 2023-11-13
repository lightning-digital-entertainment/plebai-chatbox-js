// <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"/></svg>

import "./style.css";
import styles from "./plebai.module.css";
import { Conversation } from "plebai-sdk";

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

const plebAiConf = {
  chatTitle: "Alby GPT",
  agentKey: "e301925b25ea966e27711d1fc7de65183752dfc2f5830505964d485228f8182d",
};

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
submitButton.innerText = "Send";
submitButton.onclick = () => {
  const prompt = input.value;
  if (prompt.length < 1) {
    return;
  }
  conv.sendPrompt(prompt);
  input.value = "";
};
textContainer.appendChild(submitButton);

chatContainer.appendChild(topBar);
chatContainer.appendChild(chatInner);
chatContainer.appendChild(textContainer);

document.body.appendChild(chatContainer);

const chatButton = document.createElement("button");
chatButton.className = styles["plebai-chat-button"];
chatButton.innerHTML =
  '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#ffffff}</style><path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"/></svg>';
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
