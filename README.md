# Homework 2: Tab <!-- omit in toc -->

- [Background](#background)
- [Overview](#overview)
- [Requirements](#requirements)
  - [Background Image](#background-image)
  - [Current Time](#current-time)
  - [Greeting](#greeting)
  - [Menu \& Extra Functionality](#menu--extra-functionality)
  - [Design](#design)
- [Submission](#submission)

## Background
<hr>

One of the most common ways users interact with HTML, CSS, and JavaScript while browsing is not only through webpages, but also extensions--small packaged software that can modify the behavior or experience of a user's browser.

In this assignment, we will be creating an extension for Chrome that modifies the new tab page. By default, Chrome's new tab contains a simple page with a search bar and some frequently visited websites, however, in this assignment we will be overriding the default new tab with a custom page designed by you!

<div style="break-after:page"></div>

## Overview

<hr>

Firstly, if you are not using Chrome, please do so for this assignment. Though the extension should run on any Chromium-based browser, we will only be testing/grading your extension on **Chrome**. Also, if you are currently using any extensions that alter Chrome's default new tab, you must disable them to ensure your extension works correctly.

Though they may seem complex at first, extensions are relatively simple to begin working on and deploying. Start by [cloning the GitHub repository](https://www.github.com/krizh-p/CS395-HW2-Tab) that contains the starter code for you.

You can do this by either downloading the .Zip file from GitHub and extracting it normally or using the command below in a terminal:

    git clone https://github.com/krizh-p/CS395-HW2-Tab

Once you download/clone the starter code from my repository, create a new repository on GitHub for yourself; you should _push_ your code iteratively as you develop the extension.

Opening the folder you downloaded from GitHub will display multiple files and folders.

<hr>

Let's go through the files you see.

Begin by opening `manifest.json`. The `manifest.json` file is the only file that every extension must contain; this file contains metadata the extension gives Chrome to help explain/list the permissions the extension requires as well as other functionalities such as background scripts and content scripts (which we will not be using here).

Opening this file you will see a JSON-formatted file containing useful information regarding the extension.

- Inside the file, you should edit the following keys:
  - `author` - with your name
  - `name` - give your extension a unique name
  - `icon` - this is optional to edit, but feel free to edit the random icon I've provided.
  - `description` and `version` - this is optional to edit, but feel free to utilize them.
  
Finally, take a look at the following key:

    "chrome_url_overrides": {
        "newtab": "newtab.html"
        }

Here we are informing Chrome that we will be overriding Chrome's default new tab (`"newtab"`) with the path to our page, `"newtab.html"` (which is located in the same directory as this manifest.json). Now, whenever you open a new tab, Chrome will load `newtab.html`--this will be the file containing your HTML.

Note the other folders located in the GitHub repo: `assets`, `css`, and `js`. You must place all assets such as `.png` or `.jpeg` files in the `/assets/` subdirectory, and all .css and .js files in their respective folders.

<hr>

Lastly, let's go over how you can add this extension to Chrome so that when you begin work, you can test the extension in real time. First, open up Chrome, and head to settings:

![Open settings](image.png)

![Extenstion Settings](image-1.png)

![Load unpacked](image-2.png)

After clicking "Load unpacked," in the File Explorer popup, select the folder that contains your extension files.

![Selct folder](image-3.png)

You should now see your extension loaded into Chrome

![Extenstion loaded](image-5.png)

`This page is very important because if your extension has errors, they will be displayed here, next to the "Details" button!`

<div style="break-after:page"></div>

## Requirements

<hr>

The extension should contain the following features:

### Background Image

- When a new tab is opened, the page's background should be set to a randomized image. 
  - For your convenience, the following link will return a random image: `https://source.unsplash.com/random/1920x1080/?modern`.
    - This uses the Unsplash API link; you can replace the GET parameter value `modern` with another keyword to the type of image you want to be returned (ie. landscapes, clouds, city).

### Current Time

- On top of the background image, the center of the new tab page should display the current time (HOUR : MINUTE) in a large, easily visible font.

- While the user hovers their mouse over the current time, the time should expand to also display seconds (HOUR : MINUTE : SECONDS).

### Greeting
  
- Below the current time, in slightly smaller text, show a greeting, such as "Hello, (name)". You may keep a placeholder name for the first time the extension is opened.

- Users should be able to modify their name by double-clicking on their name--the "(name)" part should become editable and the user should be able to add input.
  - This text should be saved and persist when the user opens a new tab. _([Hint: Chrome storage documentation](https://developer.chrome.com/docs/extensions/reference/storage/)_.)

### Menu & Extra Functionality

- Somewhere on your screen, add a menu button that implements **two** of the following three choices; feel free to be more creative with these extra functions and play around/experiment with different CSS/HTML/JS.
  - #### Random Quote
    - The bottom of the screen should contain a centered, randomized quote.
    - You can utilize the Quotable API at this URL to obtain a random quote: `https://api.quotable.io/random`.
      - APIs, **application programming interfaces**, are a way for different applications to interact with each other.
      - The Quotable API returns an `Object` when you visit the URL linked above; this means we can parse the `Object`'s values via the `fetch()` function in JavaScript. [View this link for an example of implementing a fetch() request.](https://developer.mozilla.org/en-US/docs/Web/API/fetch#examples)
  - #### Pomodoro Timer
    - Implement a Pomodoro timer feature that allows users to set focused work intervals and short breaks
    - Display the countdown timer prominently on the screen.
    - Include buttons for starting, pausing, and resetting the timer.
  - #### Sticky Notes
    - Provide the option for users to create and manage sticky notes.
    - Allow users to add, edit, and delete sticky notes with personalized content.
    - Sticky notes should be movable and resizable on the screen.

### Design

The design of the new tab should prioritize accessibility, usability, and aesthetic appeal. Ensure that the font and color choices are visually pleasing and easy to read. Your new tab should have intuitive interactions the extension should work seamlessly on Google Chrome's new tab page after installation. You should maintain a cohesive design across all your elements.
  - Your page must utilize **responsive design,** via either a flexbox or a grid.

Please feel free to add creative choices that reflect you!

<div style="break-after:page"></div>

## Submission

Lastly, add a `README.md` file to your project that briefly outlines your work on the portfolio; you must also link/cite any external resources you used for guidance (JavaScript documentation, YouTube tutorial, etc.) in this file.

<hr>

Submit a Zip file in the following format to Blackboard by September 12th before class:

``LASTNAME-CS395-HW2-Tab.zip``

The zip file should contain a folder with the same name as the zip file, and the folder inside should contain all code. For example `LASTNAME-CS395-HW2-Tab.zip --> LASTNAME-CS395-HW2-Tab --> (files or folders pertaining to code, such as newtab.html, /js/ )`.

Please email us if you have any questions or need an extension. Late Submissions won't be accepted without prior approval.
