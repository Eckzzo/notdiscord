<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/eckzzo/notdiscord">
    <img src="https://d3f6swrke4k8ej.cloudfront.net/notdiscordlogo.webp" alt="Logo">
  </a>

  <h3 align="center">NotDiscord</h3>

  <p align="center">
    NotDiscord is a Discord clone made with React!
    <br />
    <br />
    <a href="https://github.com/eckzzo/notdiscord">View Demo (Soon)</a>
    ·
    <a href="https://github.com/eckzzo/notdiscord/issues">Report Bug</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://github.com/eckzzo/notdiscord)

SoonTM

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

[![Next][next.js]][next-url]
[![React][react.js]][react-url]
[![Node][node.js]][node-url]
[![GraphQL][graphql]][graphql-url]
[![MongoDB][mongodb]][mongodb-url]
[![Koa][koa]][koa-url]

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- Node.js
  ```sh
  https://nodejs.org/en/download/
  ```
- yarn
  ```sh
  npm install yarn -g
  ```
- MongoDB
  ```sh
  https://www.mongodb.com/docs/manual/installation/
  ```

## Installation

Clone the repo

```sh
git clone https://github.com/eckzzo/notdiscord.git
```

### Server

1. Install packages
   ```sh
   yarn install
   ```
2. Copy the .env.example
   ```sh
   yarn copy-env
   ```
3. Fill the .env file
   ```sh
   PORT=
   JWT_SECRET=
   MONGO_URI=
   ```
4. Start the server
   ```sh
   yarn dev
   ```

### Web

**This package is dependant on the server**

1. Install packages
   ```sh
   yarn install
   ```
2. Copy the .env.example
   ```sh
   yarn copy-env
   ```
3. Fill the .env file _(You can leave the other options empty, in case you want to try out the image api feel free to contact me!)_
   ```sh
   NEXT_PUBLIC_GRAPHQL_ENDPOINT=
   ```
   
4. Get the GraphQL Schema from the server. **The server must be running before you run this command**
   ```sh
   yarn get-schema YOUR_GRAPHQL_ENDPOINT
   ```
5. Generate relay types
   ```sh
   yarn relay
   ```
6. Start!
   ```sh
   yarn dev
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Eckzzo#8147 (discord) - ivan.levenhagen@outlook.com

Project Link: [https://github.com/eckzzo/notdiscord](https://github.com/eckzzo/notdiscord)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Radix](https://www.radix-ui.com)
- [Stitches](https://stitches.dev)
- [Tailwind](https://tailwindcss.com)
- [README Template](https://github.com/othneildrew/Best-README-Template)
- [jantimon](https://github.com/jantimon) for the [NextJS Relay](https://github.com/jantimon/next-relay-demo) implementation demo!
- [sibelius](https://github.com/sibelius) for the amazing [Relay Workshop!](https://github.com/sibelius/relay-workshop)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[product-screenshot]: https://d3f6swrke4k8ej.cloudfront.net/app.webp
[next.js]: https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[next-url]: https://nextjs.org/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[node.js]: https://img.shields.io/badge/NodeJS-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[node-url]: https://nodejs.org/
[graphql]: https://img.shields.io/badge/Graphql-E10098?style=for-the-badge&logo=graphql&logoColor=white
[graphql-url]: https://graphql.org/
[mongodb]: https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white
[mongodb-url]: https://mongodb.com
[koa]: https://img.shields.io/badge/Koa-F9F9F9?style=for-the-badge&logo=koa&logoColor=33333D
[koa-url]: https://koajs.com
