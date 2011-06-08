// Tutorial 2: Connecting Levels to Each Other, part II

// Now we want to build a *big* level, and we're going to show you how to connect
// to lots of other levels.
//
// Let's set up all the regular stuff.

{
	// Music.  (Do you know what an .ogg file is?  What would happen if you replaced these .mp3 and
        // .ogg files with something else?

	addAudio:[
		["map-bgm",["resources/audio/tlol-cave.mp3","resources/audio/tlol-cave.ogg"],{channel:"bgmusic",loop:true}],	
	],

	// Tileset image...

	addImage:[	
		["tiles","resources/tutorial1/basic-cave.png"],
	],

	// Tiles...

	addTiles:[
		{id:"tiles",image:"tiles",tileh:30,tilew:30,tilerow:10,gapx:0,gapy:0},	
	],

	// Set up the objects on the level...

	setObject:[

		// The intro dialogue.  

		{
			object:"dialogues",
			property:"intro",
			value:{
				font:"small", skipkey:"a", esckey:"b", who: noface,
				scenes:[
					{ speed:1, who:"noone", audio:"beep", talk:["Welcome to the","big cave!"]}
				]
			}
		},

		// And now let's have a much bigger map!  And I mean, *way* bigger.  With lots
		// of twisty passages.
		//
		// 0 = Wall
		// 1 = Passageway
		// 2 = Stairs Up
		// 3 = Stairs Down

		{
			object:"tilemaps",
			property:"map",
			value:{
				tileset:"tiles",
				map:[
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
					[ 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0 ],
					[ 3, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0 ],
					[ 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0 ],
					[ 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0 ],
					[ 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0 ],
					[ 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
					[ 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
					[ 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
					[ 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
					[ 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
					[ 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0 ],
					[ 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 ],
					[ 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0 ],
					[ 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0 ],
					[ 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0 ],
					[ 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0 ],
					[ 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0 ],
					[ 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0 ],
				],

				// Again, no objects yet.  Soon, promise.

				addObjects:function() {
					
				},


				// Map actions.  We're going to add a few more.

				mapActions:function() {
			
					// Get Player Object.
					var pl=gbox.getObject("player","player");

					// Get what tile the player is currently on.
					var ontile=help.getTileInMap(pl.x+pl.colx+pl.colhw,pl.y+pl.coly+pl.colhh,tilemaps.map,tilemaps._defaultblock,"map");

					// Now we've got actions for both upstairs and downstairs.  

					// First, if we're standing on the upstairs tile, send us back to the beginning
					// map, right next to the down stairs.

					if (ontile==2) maingame.gotoLevel({level:"begin",x:(30*6),y:(30*7),label:"Back upstairs."});

					if (ontile==3) {

						// Now, what if we're standing on a downstairs tile?  Here's the thing: on this level
						// there's *lots* of downstairs tiles!  How do you know which one you're standing on?
						// Here's how:

						var xc=help.xPixelToTileX(tilemaps.map,pl.x+pl.colx+pl.colhw);
                                        	var yc=help.yPixelToTileY(tilemaps.map,pl.y+pl.coly+pl.colhh);

						// These are function calls.  We're calling functions called
						// xPixelToTileX and yPixelToTileY.  They both take the pixels that
						// the player is currently standing on, and convert that to which
						// tile those pixels are in.

						// So now we decide where we're sending our adventurer based 
						// on both the tile (tile 3, steps down) and the X-Y coordinates
						// of the tile.

						// The && means "and", by the way.  It's called the "and operator.

						if ((xc==0) && (yc==5)) maingame.gotoLevel({level:"begin",x:(30*6), y:(30*7), label:"Downstairs 1"});
						if ((xc==9) &&(yc==0)) maingame.gotoLevel({level:"begin",x:(30*6), y:(30*7), label:"Downstairs 2"});
						if ((xc==18) && (yc==0)) maingame.gotoLevel({level:"begin",x:(30*6), y:(30*7), label:"Downstairs 3"});
						if ((xc==2) && (yc==21)) maingame.gotoLevel({level:"begin",x:(30*6), y:(30*7), label:"Downstairs 4"});
						if ((xc==2) && (yc==21)) maingame.gotoLevel({level:"begin",x:(30*6), y:(30*7), label:"Downstairs 4"});
						if ((xc==10) && (yc==21)) maingame.gotoLevel({level:"begin",x:(30*6), y:(30*7), label:"Downstairs 5"});
						if ((xc==24) && (yc==21)) maingame.gotoLevel({level:"begin",x:(30*6), y:(30*7), label:"Downstairs 6"});

						// Hm, isn't it interesting that all of these exits go to the same
						// place... back upstairs?  Of course they do -- we've still only 
						// got two levels!  You can call them whatever you want by giving
						// them new labels ("now you're going to Downstairs 5!") but what
						// really matters is the value for the variable "level" -- which, 
						// for all of these cases, is still "begin".

						// But now that you know how to make levels and connect them to each
						// other, feel free to make lots of maps!

					}

				},

				// Always need to tell the game which tiles are solid.

				tileIsSolid:function(obj,t){ if (t==0) return true; } 
			}
		}
	]
}


// Now you know how to connect levels.  When you're ready for the next tutorial, we'll get
// to the good stuff: placing objects on these levels!

