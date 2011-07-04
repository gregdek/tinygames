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
		  			{ speed:1, who:"noone", audio:"beep", talk:["Want to escape?","Push the correct blue block...","(Z for more)"]},
		  			{ speed:1, who:"noone", audio:"beep", talk:["...over the question mark.","Use the X key to push.","A mistake could be painful!"]},
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
					'xo............ox',
					'xoooooooooooooox',
					'xxxxxxxooxxxxxxx',
					'xxxxxxxooxxxxxxx'
					],[
						[30,"x"],[31,"."],[39,"o"],
						[11,"1"],[12,"2"],[13,"3"],[14,"4"],[15,"5"],
						[16,"6"],[17,"7"],[18,"8"],[19,"9"],[10,"0"],
						[34,"+"],[35,"-"],[36,"*"],[37,"="],
						[23,"?"]
					]
				),

                                addObjects:function() {

					// We are dynamically generating a problem to solve.  The
					// form of the problem, in this case, will always be:
					//
					//       xx  -- some number >= 10
					//      +yy  -- some number >= 10
					//      ---
					//       zz  -- some number between 20 and 99
					//
					// ...and then some digit of xx, yy, or zz will be missing,
					// and the player will have to fill in the missing number.

					// Step 1: Come up with the problem itself, and determine
					// values for xx, yy, and zz.
					var zz = Math.floor(Math.random()*80)+20;
					var yy = Math.floor(Math.random()*(zz-20))+10;
					var xx = zz-yy;

					// Step 2: Change the floor tiles to construct the problem.
					// We know that the tile value for a digit is that digit + 10.

					var digits = new Array;

					digits[0] = (Math.floor(xx/10)) + 10;
					digits[1] = (xx % 10) + 10;
					digits[2] = (Math.floor(yy/10)) + 10;
					digits[3] = (yy % 10) + 10;
					digits[4] = (Math.floor(zz/10)) + 10;
					digits[5] = (zz % 10) + 10;

					// Step 3: Replace one of these digits with a question mark!
					// Question mark tiles that correspond to their "hidden digits"
					// is that digit + 20 -- so add 10 more to one of these six
					// digits.  Also, set the "triggerblock" variable for this level,
					// so we know which block will clear the level.

						var switched = Math.floor(Math.random()*6);
						digits[switched] += 10;
						tilemaps.queststatus["triggerblock"] = digits[switched];

						// Step 4: Put these digit tiles on the map.

						maingame.setTileInMap(7,4,digits[0],true);  // xx1
						maingame.setTileInMap(8,4,digits[1],true);  // xx2
						maingame.setTileInMap(6,5,34,true);  // plus
						maingame.setTileInMap(7,5,digits[2],true);  // yy1
						maingame.setTileInMap(8,5,digits[3],true);  // yy2
						maingame.setTileInMap(7,6,37,true);  // equals
						maingame.setTileInMap(8,6,37,true);  // equals
						maingame.setTileInMap(7,7,digits[4],true);  // x1
						maingame.setTileInMap(8,7,digits[5],true);  // x2

						// Step 5: Add all the puzzle blocks, using a knockoff
						// of the ASCII map approach.

						var objmap=['xxxxxxxxxxxxxxxx',
							    'x..............x',
							    'x..............x',
							    'x..............x',
							    'x..............x',
							    'x..............x',
							    'x..............x',
							    'x..............x',
							    'x..............x',
							    'x..............x',
							    'x..1234567890..x',
							    'x..............x',
							    'x..............x',
							    'xxxxxxxxxxxxxxxx'];

						// Now go through and insert object for those things we recognize.
						// We keep the visual layout similar for ease of reconciling with the
						// "newmap", above, but only pull out the objects we're interested in.
						for (ymap=0; ymap<objmap.length; ymap++) {
							for (xmap=0; xmap<objmap[ymap].length; xmap++) {
								var myobjid = objmap[ymap].charAt(xmap);
								if ((myobjid>='0') && (myobjid<='9')) {
									maingame.addPuzzleblock(xmap*30,ymap*30,"digit",myobjid);
								}
							}
						}

						// Boom!  Slam the "doors" shut behind the player.  No going back!
						maingame.setTileInMap(8,13,30,true);
						maingame.setTileInMap(7,13,30,true);

						// Unset "last puzzle block touched".  More on this below.
						tilemaps.queststatus["last-pb-touched"] = '';
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

						// Now we need to figure out: "is the block the player last touched 
						// on a question mark?  And if so, is it the right one or the wrong one?"

						// There are 10 question mark tiles that look identical.  The player 
						// cannot tell the difference... but we can!

						// In maingame.addPuzzleBlock, we instruct each puzzleblock to set a 
						// global game variable, tilemaps.queststatus["last-pb-touched"],
						// with its own object ID whenever touched.  This way, we know which 
						// puzzleblock was "last touched", so we only have to check the status 
						// of a single puzzle block at a time.

						// NOTE: the value is just an ID and does not match the value of
						// the puzzleblock itself!  We need to get the "frame" value of
						// the object, which holds the "digit" that we care about.

						// We don't run this check at all if the player hasn't touched a block yet.
						if (tilemaps.queststatus["last-pb-touched"]) {
							// Which tile has the player last touched?
							var pb = gbox.getObject("walls",tilemaps.queststatus["last-pb-touched"]);
							var pbx=help.xPixelToTileX(tilemaps.map,pb.x+pb.colx+pb.colhw);
							var pby=help.yPixelToTileY(tilemaps.map,pb.y+pb.coly+pb.colhh);
							var pbontile=help.getTileInMap(pb.x+pb.colx+pb.colhw,pb.y+pb.coly+pb.colhh,tilemaps.map,tilemaps._defaultblock,"map");

							// And where is it?
							if (pbontile==tilemaps.queststatus["triggerblock"]) {

								// OK, the player has moved a puzzle block into a trigger!
								// Now we test to see if it was the right one!  And the
								// right digit is always triggerblock - 20.

								if (pb.frame == (tilemaps.queststatus["triggerblock"]-20)) {
									// Yes!  Destroy the object...
									gbox.trashObject(pb);
									// ...and set "last object touched" to false
									tilemaps.queststatus["last-pb-touched"]=false;
									// ...and add the corresponding number block, which
									// will always be (triggerblock-10).  This gives the
									// effect of the block "clicking into place".
									maingame.setTileInMap(pbx,pby,tilemaps.queststatus["triggerblock"]-10,false);
									// Now open the passageway to the next level.
									maingame.setTileInMap(7,0,31,true);
									maingame.setTileInMap(8,0,31,true);
									// And give an "attaboy".
									maingame.addQuestClear("YEAH!");
								}
								else {
									// No.  Bad things happen!
									maingame.addSmoke(pb);
									maingame.addQuestClear("Ouch!");
									gbox.trashObject(pb);
									tilemaps.queststatus["last-pb-touched"]=false;
									maingame.hud.addValue("health","value",-1); // Damage!
									if (maingame.hud.getValue("health","value")<=0) // If dead..
										pl.kill(); // Kill...
									else { // Else is just hit
										gbox.hitAudio("hurt");
										pl.accz=-5; // A little jump...
										pl.invultimer=30; // Stay invulnerable for a while...
										pl.stilltimer=10; // Stay still for a while...
									}

								}
							}
						} 

					// Exit square.  What happens when we hit it?
					// Well, in this case, it's kinda random!  9 times out of 10, they come right back
					// to start this level again.
					// But 1 time out of 10, we end the game with happiness!  (maingame.gameIsCompleted()
					// loads the credits and ends the game.
					if ((ontile==31) && (yc == 0)) {
						if (Math.floor(Math.random()*10) == 0) {
							// Well done!  Let's end the game!
							maingame.gameIsCompleted();
						}
						else {
							maingame.gotoLevel({level:"labyrinth",x:(7*30),y:(11*30),label:"The Labyrinth!"});
						}
					}
				 },
				// Solid tiles is a little more complex here.  We want to have different "solid tiles"
				// for player versus puzzle block.  We're going to use a ternary operator here:
				// (statement) ? (true clause) : (false clause)
				tileIsSolid:function(obj,t){ 
					return (obj.id == 'player'   				// if object is the player
						? (((t>=10) && (t<=19)) || (t==30)) 		// then, these tiles are solid
						: (((t>=10) && (t<=19)) || (t==30) || (t==39))  // else, these tiles are solid
					)
				}
			}
		}
	]
}
