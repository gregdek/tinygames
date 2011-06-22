// Tutorial 2: Connecting Levels to Each Other, Part I

// Time to build a whole bunch of levels that connect to one another,
// and move back and forth between them.  It's likely that every game
// you make will have lots of different levels, so it's good to
// understand how to move around in them.

// We'll start with the level copied over from tutorial 1.

{
	// Music...

	addAudio:[
		["map-bgm",["resources/audio/tlol-cave.mp3","resources/audio/tlol-cave.ogg"],{channel:"bgmusic",loop:true}],	
	],

	// Map graphics...

	addImage:[	
		["tiles","resources/tutorial1/basic-cave.png"],
	],

	// Tiles...

	addTiles:[
		{id:"tiles",image:"tiles",tileh:30,tilew:30,tilerow:10,gapx:0,gapy:0},	
	],

	// Set up the objects on the level...

	setObject:[

		// The intro dialogue.  We've changed the text to welcome the player
		// to the second tutorial level.

		{
			object:"dialogues",
			property:"intro",
			value:{
				font:"small", skipkey:"a", esckey:"b", who: noface,
				scenes:[
					{ speed:1, who:"noone", audio:"beep", talk:["Welcome to the","second tutorial level!"]}
				]
			}
		},

		// Same tilemap as the first tutorial.

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

				// Again, no objects yet.  Soon, promise.

				addObjects:function() {
					
				},


				// Map actions.  Again, the same as the first
				// tutorial level.

				mapActions:function() {
			
					// Get Player Object.
					var pl=gbox.getObject("player","player");

					// Get what tile the player is currently on.
					var ontile=help.getTileInMap(pl.x+pl.colx+pl.colhw,pl.y+pl.coly+pl.colhh,tilemaps.map,tilemaps._defaultblock,"map");

					// If he's on a down stairway, go to the next level.
					// A slight change from tutorial 1.  We're going to set up
					// our second level called "tutorial2-bigcave".  Notice
					// that we've changed the landing co-ordinates for the
					// Big Cave.  What happens when you change that value
					// around?

					if (ontile==3) maingame.gotoLevel({level:"tutorial2-bigcave",x:(30*15),y:(30*10),label:"The Big Cave!"});
				},

				// Always need to tell the game which tiles are solid.

				tileIsSolid:function(obj,t){ if (t==0) return true; } 
			}
		}
	]
}


// Now let's take a look at the next file: tutorial2-bigcave.  Remember that map 
// files always begin with "bundle-map-", so the filename is actually going to be
// "bundle-map-tutorial2-bigcave".
