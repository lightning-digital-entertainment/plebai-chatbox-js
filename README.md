<a name="readme-top"></a>
<br />

<div align="center">
  <a href="https://github.com/lightning-digital-entertainment/plebai-chatbox-js">
    <img src="https://plebhy.com/favicon.jpg" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">PlebAI Chatbox</h3>

  <p align="center">
    Integrate a PlebAI agent chatbox into your own web project.
    <br />
    <br />
    <a href="https://github.com/lightning-digital-entertainment/plebai-chatbox-js/issues">Report Bug</a>
    ·
    <a href="https://github.com/lightning-digital-entertainment/plebai-chatbox-js/issues">Request Feature</a>
  </p>
</div>

## About The Project

![Product Name Screen Shot](https://image.nostr.build/ea22822d763913380d84b5a9be58e79fd74eed45bdd13ce16d5acc9dd873d76a.png)

With PlebAI Chatbox it is incredibly simple to include a chat with one of the many [PlebAI agents](https://chat.plebai.com) into any web page.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

Integrating the chatbox in your website is really easy. Simply add the lines below into the `<head>` section of any page that you want the chatbox to show up on.

```html
<script>
  var plebAiConf = {
    agentKey: "<agent key in hex>",
    chatTitle: "<your title>",
    primaryColor: "<colorcode in hex",
    secondaryColor: "<colorcode in hex",
  };
</script>
<script src="https://main--glittery-druid-ea3006.netlify.app/plebai.js"></script>
<link
  rel="stylesheet"
  href="https://main--glittery-druid-ea3006.netlify.app/styles.css"
/>
```

### Adjusting the config object

The first `<script>` tag in the snippet above is used to pass a configuration object to chatbox. It holds the following four properties:

1. agentKey: The public key of the agent that chatbox will connect to.
2. chatTitle: The title that will be displayed at the top of chatbox.
3. primaryColor: The primary color of the chatbox component (topbar and submit button background).
4. secondaryColor: The secondary color of the chatbox component (response background)
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Lightning Digital Entertainment - [@lde_lightning](https://twitter.com/lde_lightning)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
