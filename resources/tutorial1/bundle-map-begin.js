// Tutorial 1: The Most Basic Level

// We're going to start with the code for a very basic game level -- the most basic, in fact.
// No monsters, no other players, no nothing.  Just to get a feel for how the code works.

// Some of these commands can be pretty complicated, so we will describe each line as we go
// along.  Don't worry if you don't understand everything perfectly; as you start to play 
// with the code, it will all start to make more sense.  

{
	// First, we define the music that plays in the level.  The only detail to notice now:
	// the music comes from audio files, and those files live in the "resources/audio" directory.
	// If you go open those files in your browser, you should hear music playing.

	addAudio:[
		["map-bgm",["resources/audio/tlol-cave.mp3","resources/audio/tlol-cave.ogg"],{channel:"bgmusic",loop:true}],	
	],

	// Next, we select the image that we will use to build our level from.  If you open
	// the file "resources/tutorial/basic-cave.png" in your browser, you will see a little
	// image that looks like a simple grid.  These little images, called tiles, are the 
	// squares that we will use to build our level's map.

	addImage:[	
		["tiles","resources/tutorial1/basic-cave.png"],
	],

	// Now we tell our program how to cut that image up into tiles.  First, we tell our
	// program how high (tileh) and wide (tilew) each tile is, in pixels.  Next, we tell
	// our program how many tiles are in each row (tilerow). 

	// Sometimes tile makers break up the tiles by putting gaps between them, so in these
	// cases you would specify the sizes of those gaps with gapx and gapy.  In our tiles,
	// we don't have any gaps; they run right up against each other.

	// Our image is a very basic tileset, with only one row of five tiles, 30 pixels high
	// and 30 pixels wide.

	addTiles:[
		{id:"tiles",image:"tiles",tileh:30,tilew:30,tilerow:10,gapx:0,gapy:0},	
	],

	// Now that we've described the pieces we need to build our level, let's build
	// the level itself!

	setObject:[

		// There are a lot of different object types that we will use in our
		// levels.  Here, we will go through the *very* basics.

		// A "dialogue" is a text box that pops up on the screen to tell the
		// player something.  In this case, there's a special kind of dialogue
		// called "intro" that plays when the level starts.

		// We'll talk more about dialogues later.

		{
			object:"dialogues",
			property:"intro",
			value:{
				font:"small", skipkey:"a", esckey:"b", who: noface,
				scenes:[
					{ speed:1, who:"noone", audio:"beep", talk:["Welcome to the","first tutorial level!"]}
				]
			}
		},

		// The "tilemap" is just what the name says: a map, made up of tiles.  
		// Above, when we cut up the tiles, each tile was assigned a numerical
		// value.  Look at the tile image.  The first tile is a wall, and it's 
		// given the value of 0.  The second tile is a floor tile, and it's given
		// the value of 1.  The third tile is an up staircase and has a value of 2.
		// The fourth tile is a down staircase and has a value of 3.  The fifth
		// tile is a little box on a floor, and it has a value of 4.

		// The map below lays out a grid of these tile values.  The technical
		// term for this grid is an "array", but we'll get more into that later.

		{
			object:"tilemaps",
			property:"map",
			value:{
				tileset:"tiles",
				map:[
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
					[ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
					[ 0, 1, 0, 1, 1, 1, 1, 0, 1, 0 ],
					[ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
					[ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
					[ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
					[ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
					[ 0, 1, 0, 1, 1, 1, 1, 3, 1, 0 ],
					[ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ] 
				],

				// Now that we've defined the shape of the map,
				// we can add behaviors to the map -- or, in other
				// words, what happens when our player wanders
				// around the map.

				// We're not adding any objects to the map yet.
				// Don't worry; that will come soon.

				addObjects:function() {
					
				},


				// "mapActions" are actions that happen when
				// certain things happen on the map.  In this case,
				// we will add one very simple action: when the player
				// touches the down stairs tile, we go downstairs 
				// to the next level!

				mapActions:function() {
			
					// These two lines get data about our player.
					// We don't need to know the details yet.
		
					var pl=gbox.getObject("player","player");
					var ontile=help.getTileInMap(pl.x+pl.colx+pl.colhw,pl.y+pl.coly+pl.colhh,tilemaps.map,tilemaps._defaultblock,"map");

					// This next line is also complicated, but
					// we need to understand it.

					// Basically it says, "if our player is on 
					// a tile of type 4, go to another level.  
					// There are a few variables to understand
					// here:

					// "level", which points to another map file.
					// Map files start with "bundle-map-" and end
					// with ".js" because they're javascript files.
					// So "tutorial1-downstairs" below actually 
					// refers to a file called 
					// "bundle-map-tutorial1-downstairs.js". 

					// "x" and "y" are the coordinates on the next map
					// where the player will start.  Notice, the x-
					// and y- coordinates are expressed in pixels, not
					// squares: x is 210, and y is 90. 

					// "label" is what we call the next level.  When
					// you change screens, this is what you'll see
					// while the screens are changing.

					if (ontile==3) maingame.gotoLevel({level:"tutorial1-downstairs",x:(30*7),y:(30*3),label:"Tutorial Downstairs"});
				},

				// One last thing: we want some of our tiles to be solid --
				// walls, for example.  But the program doesn't know which
				// tiles are solid unless we tell it which tiles are solid.
				// The game logic knows that if a tile is solid, our player
				// can't walk on it.  

				// In the following function, we are saying that "a tile
				// is solid if its value is 0."  You'll need something 
				// like this on every level -- unless you want your player
				// to be able to walk through walls!

				tileIsSolid:function(obj,t){ if (t==0) return true; } 
			}
		}
	]
}


// That's it!  That's what a basic level looks like. 

// EXERCISES
//
// 1. You will notice immediately that when you go down the stairs, nothing
//    happens.  Why?  Because the level doesn't exist yet!  You'll have to 
//    create that level for yourself!  Make a copy of this level and call it
//    "bundle-map-tutorial1.js".  That level is downstairs, right?  So be 
//    sure to put an upstairs on that level that comes back to this level!
//
// 2. Our level's tilemap is a rectangle.  Does it have to be?  What would
//    it look like if there were more tiles in one row, or less in another?
//    Play with it and find out!
//
// 3. When we made our stairs to the next level, we expressed the coordinates
//    as 30*7 and 30*3, not 210 and 90.  Why might we want to do that?


