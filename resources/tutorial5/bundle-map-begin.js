{
	// Map graphics.  Note that we're using a new tileset here!  This tileset has lots of numbers,
	// for players to walk over.  We'll get to that in the gameplay, below.

        addImage:[
                ["tiles","resources/tutorial3/gfx-puzzle8.png"],
        ],

	// Tiles...

	addTiles:[
		{id:"tiles",image:"tiles",tileh:30,tilew:30,tilerow:10,gapx:0,gapy:0},	
	],

	setObject:[
		// Dialogues on this map
		{
			object:"dialogues",
			property:"intro",
			value:{ font:"smalltut", skipkey:"a", esckey:"b", who: noface,
		  		scenes:[
		  			{ speed:1, who:"noone", audio:"beep", talk:["You should go talk...","to that old man..."]}
		  		]
		  	}
		},{

                        object:"dialogues", 
                        property:"oldman", 	// associates this dialogue to an Npc, defined below in addNpc()
                        value:{
                                // font:"small", skipkey:"a", esckey:"b", who: noface,
                                font:"small", skipkey:"a", who: noface,
                                scenes:[
                                        { speed:1, who:"noone", audio:"beep", talk:["What up...","player?"]},
                                        { speed:1, who:"noone", audio:"beep", talk:["You're in my house now."]},
                                        { speed:1, who:"noone", audio:"beep", talk:["And if you want to get out..."]},
                                        { speed:1, who:"noone", audio:"beep", talk:["You'd better solve some math problems."]},
                                        { speed:1, who:"noone", audio:"beep", talk:["PUSH THOSE BLUE BLOCKS AROUND."]}
                                ]
                        }
		
		// Map data and actions
		},{

                        object:"tilemaps",
                        property:"map",
                        value:{
                                tileset:"tiles",
				// Oh, look!  There's a very helpful "asciiArtToMap" function in
				// help.js that I rewrote by hand because I failed to read the
				// documentation.  Clever me!  So here's the map done the *right* way.
				//
				// Also: note the "o" around the border of the room.  This is a 
				// special tile that the player can walk into, but the puzzle block
				// cannot be pushed into.  This prevents the case of "user pushes
				// block against the wall and can't move it away from wall."
				// Details of how this works can be found in the function 
				// tileIsSolid, below.

				map:help.asciiArtToMap([
					'xxxxxxxxxxxxxxxx',
					'xoooooooooooooox',
					'xo............ox',
					'xo............ox',
					'xo............ox',
					'xo............ox',
					'xo............ox',
					'xo............ox',
					'xo............ox',
					'xo............ox',
					'xoooooooooooooox',
					'xxxxxxxxxxxxxxxx'
					],[
						[30,"x"],[31,"."],[39,"o"],
						[11,"1"],[12,"2"],[13,"3"],[14,"4"],[15,"5"],
						[16,"6"],[17,"7"],[18,"8"],[19,"9"],[10,"0"],
						[34,"+"],[35,"-"],[36,"*"],[37,"="],
						[23,"?"]
					]
				),

                                addObjects:function() {

					// The Old Man! 
					// Here we have the call "AddNpc."  The params:
					//   * xcoord and ycoord.  Pixel, not tile.
					//   * frame for NPCs.  In this case, frame 2 for "old man standing".
					//   * dialogue to activate when touched.  Defined above.
					//   * quest variable to set once you've talked to him once.
					//     if this value is "null", there's no quest associated.
					//   * frame for talking animation.  In this case, frames 2 and 3,
					//     alternating between "old man standing" and "old man with
					//     mouth open."
					//   * And then I don't know what that last variable is.  Read the
					//     code in maingame to find out!
 					maingame.addNpc(160,120,[2],"oldman","oldmanstory",[2,3],false);

					// Set "door triggered" to false when the level starts.
					tilemaps.queststatus["doortriggered"] = false;

				},

				// Now we define our "mapActions".  This function is called continually
				// as part of the game loop, and conditions here are constantly being
				// checked.  This is where all "game triggers" happen.  Is a player on
				// a certain tile?  Did the player bump into a particular NPC?  And so
				// on.

				mapActions:function() {

					// Get the player object to work with
					var pl=gbox.getObject("player","player");

					// Get the player's current x and y coords on the map
                                        var xc=help.xPixelToTileX(tilemaps.map,pl.x+pl.colx+pl.colhw);
                                        var yc=help.yPixelToTileY(tilemaps.map,pl.y+pl.coly+pl.colhh);

					// Get the ID of the tile the player is on
					var ontile=help.getTileInMap(pl.x+pl.colx+pl.colhw,pl.y+pl.coly+pl.colhh,tilemaps.map,tilemaps._defaultblock,"map");

					// If you've talked to the old man, and the doors to the next level haven't been 
					// opened already... open them now!
					if ((tilemaps.queststatus["oldmanstory"]) && (!tilemaps.queststatus["doortriggered"])) {
						maingame.setTileInMap(7,0,31,true);
						maingame.setTileInMap(8,0,31,true);
						tilemaps.queststatus["doortriggered"] = true;
					}

					// Is the player standing on the door?  Take them to the next level!
					if ((yc==0) && ((xc==7)||(xc==8))) {
						maingame.gotoLevel({level:"labyrinth",x:(7*30),y:(11*30),label:"The Labyrinth!"});
					}
				 },
				// Solid tiles is a little more complex here.  We want to have different "solid tiles"
				// for player versus puzzle block.  We're going to use a ternary operator here:
				// (statement) ? (true clause) : (false clause)
				// So -- ret
				tileIsSolid:function(obj,t){ 
						return (((t>=10) && (t<=19)) || (t==30));
				}
			}
		}
	]
}
