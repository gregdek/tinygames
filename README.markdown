Mongo/Akihbara
==============

This is gregdek's fork of Akihabara.  It's unlikely that I'll touch most of the code, but the hope is to add lots of game/resource code, and it's just simpler to fork on github than to figure out how to maintain a separate repo for games only.  :)

The files that are essential to Mongo:

./game-mongo.html	The main program file, and how the game is invoked.  
			You can just "git clone" the repo and open this file
			in your browser, and things should Just Work (tm).

./akihabara/		The game libraries.

./resources/audio/	Where shared audio resources live.

./resources/mongo/	Home of all the levels and resources for Mongo.  
			Where All The Action Happens.

(KesieV's Original Readme follows.)
			
******************************************

Akihabara
=========

Akihabara is a set of libraries, tools and presets to create pixelated indie-style 8/16-bit era games in Javascript that runs in your browser without any Flash plugin, making use of a small small small subset of the HTML5 features, that are actually available on many modern browsers.

Notes for developers
--------------------

* For maximum compatibility make sure that you're using the ["name"] for when setting object properties with reserved names like "goto" and "data" (Discovered during patching for Wii)
* Also do not use the comma after the last element of an array or a property of an object. Still work on many browsers but is broken for Opera Wii. (and probably IE, when will be supported)
* For making sure that your sub-scripts are loaded, try to add an "alert" at the end. Opera for Wii silently fail when there are syntax errors like the one explained before.
* Opera Wii wants that canvas have to be blitted at least once before being used - or fails with a browser crash! The built-in gbox.createCanvas was already fixed. Is a good thing to use that method for spawning canvas.

AkibaKa
-------

Thought as a flexible and simple Akihabara resource editor, AkibaKa has been committed partially uncompleted due to lack of time. Iit should be functional enough but I hope that I'll start working on it again or (better) that someone will pick up the code and give it a spin! :)

Todo
----

* Some way for updating the JSDoc automatically. (Darren and Darius wrapped up tutorials and docs! - BTW some scripts for generating docs form sources are needed)
* Better embeddability keeping playability on mobile
* Solve randomly blinking sprites on Wii (?)
* ON AkibaKa: add addImage and addTiles only when used!

Improvement
-----------

* Audio compatibility *Work in progress*

Nice to have
----
* Networking
