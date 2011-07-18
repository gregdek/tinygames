{
	// Map graphics.  Note that we're using a new tileset here!  This tileset has lots of numbers,
	// for players to walk over.  We'll get to that in the gameplay, below.

        addImage:[
                //["tiles","resources/academy/gfx-puzzle8.png"],
                ["tiles","resources/academy/town_tiles2.png"],
        ],

	// Tiles...

	addTiles:[
		{id:"tiles",image:"tiles",tileh:32,tilew:32,tilerow:10,gapx:0,gapy:0},	
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
				// 00000000001111111111222
				// 01234567890123456789012
				  '.......................', // 00
				  '..........^............', // 01
				  '..[                 ]..', // 02
				  '..[                 ]..', // 03
				  '...[               ]...', // 04
				  '....[             ]....', // 05
				  '.........[ ]...........', // 06
				  '.........[ ].^.........', // 07
				  '......[       ]........', // 08
				  '.....^[       ]^.......', // 09
				  '...[             ].....', // 10
				  '...[  T      T     ]...', // 11
				  '.[       T      ][ ]^..', // 12
				  '.[ ][           ][    .', // 13
				  '.[ ].....[ ].....[    .', // 14
				  '.[ .^...^[ ]........[ ]', // 15
				  '.[    ][   ].......^[ ]', // 16
				  '[     ][  ].....      ]', // 17
				  '.[    ][ ]....^[ ][   ]', // 18
				  '.[ ][ ][ ]..[    ].....', // 19
				  '.[ ][ ][  ^.[    ]...^.', // 20
				// ...thru 20 rows, and then
				// a temp row for now to close
				  '.......................'
					],[
						//[30,"."],[31," "],
						//[34,"+"],[36,"^"]
						[0,"."],	// walls
						[1,"^"],	// cave
						[7,"+"],	// pathway
						[5,"]"],	// wall, left flush
						[6,"["],	// wall, right flush
						[10," "], 	// grass
						[11,"T"], 	// tree
					]
				),

                                addObjects:function() {

					// objmap is simply an overlay of the
					// ascii map above.  We're going to 
					// use it to place objects, and ignore
					// everything else.

					var objmap=[
				// 00000000001111111111222
				// 01234567890123456789012
				  '.......................', // 00
				  '..........^............', // 01
				  '..[                 ]..', // 02
				  '..[                 ]..', // 03
				  '...[               ]...', // 04
				  '....[             ]....', // 05
				  '.........[a]...........', // 06
				  '.........[ ].^.........', // 07
				  '......[       ]........', // 08
				  '.....^[       ]^.......', // 09
				  '...[             ].....', // 10
				  '...[  T      T     ]...', // 11
				  '.[       T      ][b]^..', // 12
				  '.[ ][           ][    .', // 13
				  '.[c].....[d].....[    .', // 14
				  '.[ ]^...^[ ]........[e]', // 15
				  '.[    ][   ].......^[ ]', // 16
				  '[     ][  ].....      ]', // 17
				  '.[    ][ ]....^[f][   ]', // 18
				  '.[.][g][h]..[    ].....', // 19
				  '.[x][ ][ ]^.[    ]...^.', // 20
				// ...thru 20 rows, and then
				// a temp row for now to close
				  '.......................'
					];

                                        // Now go through and insert objects. We keep the visual layout 
					// similar for ease of reconciling with the "newmap", above, but only pull 
					// out the objects we're interested in.
                                        for (ymap=0; ymap<objmap.length; ymap++) {
                                                for (xmap=0; xmap<objmap[ymap].length; xmap++) {
                                                        var myobjid = objmap[ymap].charAt(xmap);
							if (myobjid == 'a') {
								// must complete Addition 1
								maingame.addMinidoor(xmap*32,ymap*32,"tiles",2,"bronze boots of addition");
							}
							if (myobjid == 'b') {
								// must complete Subtraction 1
								maingame.addMinidoor(xmap*32,ymap*32,"tiles",2,"bronze gauntlets of subtraction");
							}
							if (myobjid == 'c') {
								// must complete Addition 2
								maingame.addMinidoor(xmap*32,ymap*32,"tiles",2,"silver boots of addition");
							}
							if (myobjid == 'd') {
								// must complete Multiplication 0.5
								maingame.addMinidoor(xmap*32,ymap*32,"tiles",2,"tin helm of multiplication");
							}
							if (myobjid == 'e') {
								// must complete Subtraction 2
								maingame.addMinidoor(xmap*32,ymap*32,"tiles",2,"silver gauntlets of subtraction");
							}
							if (myobjid == 'f') {
								// must complete Subtraction 3
								maingame.addMinidoor(xmap*32,ymap*32,"tiles",2,"gold gauntlets of subtraction");
							}
							if (myobjid == 'g') {
								// must complete Addition 3
								maingame.addMinidoor(xmap*32,ymap*32,"tiles",2,"gold boots of addition");
							}
							if (myobjid == 'h') {
								// must complete Multiplication 1
								maingame.addMinidoor(xmap*32,ymap*32,"tiles",2,"bronze helm of multiplication");
							}
							if (myobjid == 'x') {
								// must complete Subtraction 2
								maingame.addMinidoor(xmap*32,ymap*32,"tiles",2,"MYSTERY QUEST");
							}
                                                }
                                        }


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
                                        var xc=help.xPixelToTileX(tilemaps.map,pl.x+pl.colx+pl.colhw);
                                        var yc=help.yPixelToTileY(tilemaps.map,pl.y+pl.coly+pl.colhh);

					// Get the ID of the tile the player is on
					var ontile=help.getTileInMap(pl.x+pl.colx+pl.colhw,pl.y+pl.coly+pl.colhh,tilemaps.map,tilemaps._defaultblock,"map");

					// Various triggers on the level.

					// quest a: bronze boots of addition
					if ((!tilemaps.queststatus["bronze boots of addition"]) && (xc==10) && (yc==1)) {
						tilemaps.queststatus["bronze boots of addition"] = true;
						maingame.addQuestClear("bronze boots of addition received!");
					}
					// quest b: bronze gauntlets of subtraction
					if ((!tilemaps.queststatus["bronze gauntlets of subtraction"]) && (xc==13) && (yc==7)) {
						tilemaps.queststatus["bronze gauntlets of subtraction"] = true;
						maingame.addQuestClear("bronze gauntlets of subtraction received!");
					}
					// quest c: silver boots of addition
					if ((!tilemaps.queststatus["silver boots of addition"]) && (xc==5) && (yc==9)) {
						tilemaps.queststatus["silver boots of addition"] = true;
						maingame.addQuestClear("silver boots of addition received!");
					}
					// quest d: tin helm of multiplication
					if ((!tilemaps.queststatus["tin helm of multiplication"]) && (xc==15) && (yc==9)) {
						tilemaps.queststatus["tin helm of multiplication"] = true;
						maingame.addQuestClear("tin helm of multiplication received!");
					}
					// quest e: silver gauntlets of subtraction
					if ((!tilemaps.queststatus["silver gauntlets of subtraction"]) && (xc==20) && (yc==12)) {
						tilemaps.queststatus["silver gauntlets of subtraction"] = true;
						maingame.addQuestClear("silver gauntlets of subtraction received!");
					}
					// quest f: gold gauntlets of subtraction
					if ((!tilemaps.queststatus["gold gauntlets of subtraction"]) && (xc==19) && (yc==16)) {
						tilemaps.queststatus["gold gauntlets of subtraction"] = true;
						maingame.addQuestClear("gold gauntlets of subtraction received!");
					}
					// quest g: gold boots of addition
					if ((!tilemaps.queststatus["gold boots of addition"]) && (xc==4) && (yc==15)) {
						tilemaps.queststatus["gold boots of addition"] = true;
						maingame.addQuestClear("gold boots of addition received!");
					}
					// quest h: bronze helm of multiplication
					if ((!tilemaps.queststatus["bronze helm of multiplication"]) && (xc==8) && (yc==15)) {
						tilemaps.queststatus["bronze helm of multiplication"] = true;
						maingame.addQuestClear("bronze helm of multiplication received!");
					}

					// If you've talked to the old man, and the doors to the next level haven't been 
					// opened already... open them now!
					//if ((tilemaps.queststatus["oldmanstory"]) && (!tilemaps.queststatus["doortriggered"])) {
					//	maingame.setTileInMap(7,0,31,true);
					//	maingame.setTileInMap(8,0,31,true);
					//	tilemaps.queststatus["doortriggered"] = true;
					//}

					// Is the player standing on the door?  Take them to the next level!
					if ((yc==0) && ((xc==7)||(xc==8))) {
						maingame.gotoLevel({level:"labyrinth",x:(7*30),y:(11*30),label:"The Labyrinth!"});
					}
				},

				tileIsSolid:function(obj,t){ 
						return ((t!=1) && (t!=7) && (t!=10));
				}
			}
		}
	]
}
