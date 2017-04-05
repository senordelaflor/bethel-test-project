# bethel-test-project

This is a test project coded for Bethel. I was given a single page desktop design and was asked to bring it to life. Since I was asked to "show wat I got" I have added a few extra features that I thoght would enhance the user experience. This project has been fun. Let's dive into it: 


## Getting Started

To view locally: 
* Clone the repo and cd to the project's folder.
* Run 'npm install'.
* Run 'gulp'
* This will bring up a local server and automatically fire up the browser and open the correct localhost:port url

View it Online: 
https://senordelaflor.github.io/bethel-test-project/


## This project uses vanilla JS.

I wanted to avoid using jQuery and save us the http request and file size download. Since I was asked to only provide support for all modern browsers, vanilla JS seemed very appropiate. I have the JS divided into partials to make the code more readable. Also, there is a gulp task that concatenates the files into a single JS file (bethel.js) and wraps all the code into an anonymous function to avoid polluting the globalspace. 

It is worth mentioning that to improve page load speed, the youtube videos are being loaded asynchronously into a popup when the play button is clicked.

## This project uses Sass. 

I have broken up the styling into four folders: base, components, sections, and vendors. There are some cool things happening in the _mixin.scss file. Among them, there is a 'responsive-fullscreen-bg-img' mixin that came about from some research I did some time ago about Apple's usage of full background images. I was intrigued about how they were able to get such high quality images at smaller sizes than several other websites. There is also a Hero mixin that has a parallax option for desktop screens (which is currently enabled) using position: fixed on the ::before selector to avoid performance issues encountered with 'background-attachment: fixed'. 

## Requirements.

I was asked to come up with a mobile version of the site from the desktop design I was given. You said 'do not worry about tablet'. However, since I am an over achiever and we all know that is better to code mobile-up, I managed to come up with a fully responsive design that supports a variaty of screens including tablets. 

I was asked to support most modern browsers. I have tested the site under macOs Sierra's Chrome, Safari, and Firefox, as well as Safari for iOS, Chrome for Android, and Microsoft Edge.

## Extra Features.

I have added some scrollTo animation for when the menu links or arrow down are clicked. Moreover, I added a function that animates the numbers by counting to them. Also, I have added some basic animation for the navbar as well as a hamburger menu for the mobile version. 

## Performance.

After minification, bethel.css weighs 25kb. After minification and uglifying, bethel.js weighs 4kb. If we gzip both files, we end up with bethel.css weighing 5kb and bethel.js weighing 2kb, which is great savings in terms of bandwidth. Furthermore, the images can be lazyloaded to further improve page load speeds, as long as we are okay with not having all images available right away. 


Let me know if you have any questions,


Looking forward to hearing back from you! 


Pablo Martinez




