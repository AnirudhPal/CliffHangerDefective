CliffHanger: A JavaScript Board Game
===

Index
---

Introduction
---

Our project is an online 3D board game. It is built using HTML, CSS and JavaScript. Apart from the built-in functions provided by these languages, we used a graphics library called ThreeJS. Here is a link to the library documentation: [ThreeJS Website](https://threejs.org/). The game runs locally on the client side and is thus a static website.

System Requirements
---

The system requirements outlines the **suggested** configurations. You might find that the applications runs in more configurations than the one's stated below. There are three options for testing the server. They are described in detail in the [setup]() section.

1. Using our hosting service
    * For client:
        * Computer system bought in the last 7 years.
        * Chrome, Firefox, Safari, Edge or any browser with HTML5 and WebGL support.
        * Will run on iOS and Android browser (not recommended/not designed for that purpose).

2. Using your hosting service
    * For server:
        * POSIX compliant system.
        * Should have Python2 installed.
    * For client:
        * Same as client in option 1.

3. Running locally
    * For client:
        * Same as client in option 1 (only tested for macOS and Windows 10).

Setup
---

This section is an instructional for setting up the application. If you don't use the same OS as the one used in the instructional; please extrapolate the instructions to your specific operating system and browser of choice.

### Using our Hosting Service

In this option we take care of running the server and you can access the website on a link that we provide. This is recommended for functional testing.

*Step 1: Open a Browser*

*Step 2: Enter URL* [*https://anirudhpal.github.io/CliffHangerDefective/game.html*](https://anirudhpal.github.io/CliffHangerDefective/game.html)

![This is how it should look.](https://github.com/AnirudhPal/CliffHangerDefective/blob/master/img/1_1.png?raw=true)

### Using your Hosting Service

In this option you run a Python2 server on a POSIX system and use any client browser to access the application. The server that we provide is not secure and is a very basic implementation. We recommend sandboxing the server if you are going to use our server. Also, errors in the server that we provided **should not be considered a defect** as the server is not part of the project and is only provided as aid for testing. You can also use your own server implementation like the one from CS252 Lab 6 - Socket Programming. It needs to have support for HTML, JS and STL files. This is recommended for higher order testing.

**Server**

*Step 1: Open Terminal*

*Step 2: Git Clone*

```bash
git clone https://github.com/AnirudhPal/CliffHangerDefective.git
```

*Step 3: Run Server. Replace 2200 with the port number of your choosing.*

```bash
python server.py 2200
```

**Client**

*Step 1: Open a Browser*

*Step 2: Enter URL localhost:2200/game.html. If you are not running the browser on the same machine as the server replace localhost with the IP or Hostname of the server.*

![This is how it should look.](https://github.com/AnirudhPal/CliffHangerDefective/blob/master/img/2_1.png?raw=true)

### Running Locally

In this option you basically open the HTML file in your browser. This is recommended for functional testing if you don't have access to Internet or are having connectivity issues.

*Step 1: Open Terminal*

*Step 2: Git Clone*

```bash
git clone https://github.com/AnirudhPal/CliffHangerDefective.git
```

*Step 3: Open File game.html with Browser*

![This is how it should look.](PUT URL)

### Additional Help

To provided Additional aid to the tester we have included *gamev.html* and *gamevv.html* which are the same as *game.html* but produces more comprehensive console output. This part shows you how to use console on Chrome.

*Step 1: Open Google Chrome*

*Step 2: Use Shortcut Ctrl + Shift + I*

*Step 3: Select Console Tab*

*Step 4: Enter URL*

![This is how it should look.](PUT URL)

How to Play
---
