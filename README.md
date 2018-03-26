CliffHanger: A JavaScript Board Game
===

Index
---

1. [**Introduction**](https://anirudhpal.github.io/CliffHangerDefective/#introduction)

2. [**System Requirements**](https://anirudhpal.github.io/CliffHangerDefective/#system-requirements)

3. [**Setup**](https://anirudhpal.github.io/CliffHangerDefective/#setup)

    * [*Using our Hosting Service*](https://anirudhpal.github.io/CliffHangerDefective/#using-our-hosting-service)
    * [*Using your Hosting Service*](https://anirudhpal.github.io/CliffHangerDefective/#using-your-hosting-service)
    * [*Running Locally*](https://anirudhpal.github.io/CliffHangerDefective/#running-locally)

4. [**How to Play**](https://anirudhpal.github.io/CliffHangerDefective/#how-to-play)

    * [*Controls*](https://anirudhpal.github.io/CliffHangerDefective/#controls)
    * [*Gameplay*](https://anirudhpal.github.io/CliffHangerDefective/#gameplay)

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

*Step 2: Enter URL localhost:2200/game.html. If you are not running the browser on the same machine as the server replace localhost with the IP or Hostname of the server. Also use the appropriate port number.*

![This is how it should look.](https://github.com/AnirudhPal/CliffHangerDefective/blob/master/img/2_1.png?raw=true)

### Running Locally

In this option you basically open the HTML file in your browser. This is recommended for functional testing if you don't have access to Internet or are having connectivity issues.

*Step 1: Open Terminal*

*Step 2: Git Clone*

```bash
git clone https://github.com/AnirudhPal/CliffHangerDefective.git
```

*Step 3: Open File game.html with Browser*

![This is how it should look.](https://github.com/AnirudhPal/CliffHangerDefective/blob/master/img/3_1.PNG?raw=true)

### Additional Help

To provided Additional aid to the tester we have included *gamev.html* and *gamevv.html* which are the same as *game.html* but produces more comprehensive console output. This part shows you how to use console on Chrome.

*Step 1: Open Google Chrome*

*Step 2: Use Shortcut Ctrl + Shift + I*

*Step 3: Select Console Tab*

*Step 4: Enter URL*

![This is how it should look.](https://github.com/AnirudhPal/CliffHangerDefective/blob/master/img/4_1.png?raw=true)

How to Play
---

CliffHanger is a 4-player game where the sole survivor in the end is the winner. Each player has 15 seconds to play their turn. A turn counts if a player moves. Attacking or using special items after moving is allowed but not required.

A player cannot end their turn without moving first. Each player has 100 HP (health points) to start with. Each attack or special item injures players differently.

Players can also use potions to heal or gain HP. A player dies if they get pushed off the stage, or lose all of their health points.

Each player can only have 6 offensive and 6 defensive items. Players can only use the item on top of their items queue. 10 items are dropped at the beginning of the game. A new item is dropped after every full turn. The outer layer of tiles is dropped after a certain number of turns to make the stage smaller for more action!

### Controls

Keyboard Input | Action
--- | ---
*W,A,S,D* | Up, left, down, right (respectively)
*P* | Choose offensive item
*L* | Choose defensive item
*B* | Choose basic attack
*E* | End turn (after moving)
*Spacebar* | Use potion, select teleport or trap locations

### Gameplay

*Before Moving.*

![](https://github.com/AnirudhPal/CliffHangerDefective/blob/master/img/5_1.png?raw=true)

*After Pressing D (This could also be used to show what a basic attack looks like).*

![](https://github.com/AnirudhPal/CliffHangerDefective/blob/master/img/5_2.png?raw=true)

![](https://github.com/AnirudhPal/CliffHangerDefective/blob/master/img/5_3.png?raw=true)

*Area of Effect Attack Spaces. Select W, A, S, D to Attack all Red Spaces.*

*Before selecting Move Again.*

![](https://github.com/AnirudhPal/CliffHangerDefective/blob/master/img/5_4.png?raw=true)

![](https://github.com/AnirudhPal/CliffHangerDefective/blob/master/img/5_5.png?raw=true)

*After Using Move Again.*

*After Selecting a Trap Item.*

![](https://github.com/AnirudhPal/CliffHangerDefective/blob/master/img/5_6.png?raw=true)

![](https://github.com/AnirudhPal/CliffHangerDefective/blob/master/img/5_7.png?raw=true)

*After Moving Selection to Desired Block.*

*After Selecting a Ranged, Basic Attack.*

![](https://github.com/AnirudhPal/CliffHangerDefective/blob/master/img/5_8.png?raw=true)

*After Selecting a Teleport Item.*

![](https://github.com/AnirudhPal/CliffHangerDefective/blob/master/img/5_9.png?raw=true)

*After Moving Selection to Desired Block.*

![](https://github.com/AnirudhPal/CliffHangerDefective/blob/master/img/5_10.png?raw=true)

*After Pressing Spacebar to Move to Selected Space.*

![](https://github.com/AnirudhPal/CliffHangerDefective/blob/master/img/5_11.png?raw=true)

*After Selecting to use a Potion.*

![](https://github.com/AnirudhPal/CliffHangerDefective/blob/master/img/5_12.png?raw=true)


*Health before using Potion.*

*After using a Minor Potion (10 HP Healing).*

![](https://github.com/AnirudhPal/CliffHangerDefective/blob/master/img/5_13.png?raw=true)

![](https://github.com/AnirudhPal/CliffHangerDefective/blob/master/img/5_14.png?raw=true)

![](https://github.com/AnirudhPal/CliffHangerDefective/blob/master/img/5_15.png?raw=true)

*Before using Push Attack.*

*After Pushing to the Left with A.*

![](https://github.com/AnirudhPal/CliffHangerDefective/blob/master/img/5_16.png?raw=true)
