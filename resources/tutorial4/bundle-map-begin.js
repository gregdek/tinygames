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
					'xo.....13.....ox',
					'xo....+22.....ox',
					'xo.....==.....ox',
					'xo.....?5.....ox',
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

					// Now add objects using a similar ASCII map approach.
					// map for adding objects in almost exactly the same way!
					var objmap=['xxxxxxxxxxxxxxxx',
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

					// In game-tutorial3.html, we set the puzzleblock object to set a
					// global game variable, tilemaps.queststatus["last-pb-touched"],
					// to be set every time a puzzleblock is touched.  This way, we
					// know which puzzleblock to check the status of, and we don't have
					// to go through every possible puzzleblock id.

					// NOTE: the value is just an ID and does not match the value of
					// the puzzleblock itself!  We need to get the "frame" value of
					// the object, which holds the "digit" that we care about.

					// We don't want to check if the player hasn't touched an object yet.

					if (tilemaps.queststatus["last-pb-touched"]) {
						var pb = gbox.getObject("walls",tilemaps.queststatus["last-pb-touched"]);
                                	        var pbx=help.xPixelToTileX(tilemaps.map,pb.x+pb.colx+pb.colhw);
                                        	var pby=help.yPixelToTileY(tilemaps.map,pb.y+pb.coly+pb.colhh);
						var pbontile=help.getTileInMap(pb.x+pb.colx+pb.colhw,pb.y+pb.coly+pb.colhh,tilemaps.map,tilemaps._defaultblock,"map");
						if (pbontile==23) {
							// OK, the player has moved a puzzle block into place!
							// Now we test to see if it was the right one!  Which,
							// in this case, is "3".
							if (pb.frame == 3) {
								// Yes!  Destroy the object...
								gbox.trashObject(pb);
								// ...and set "last object touched" to false
								tilemaps.queststatus["last-pb-touched"]=false;
								// ...and add tile 13 here, which is the
								// wall tile for the number 3.
								maingame.setTileInMap(pbx,pby,13,false);
								maingame.gameIsCompleted();
							}
							else {
								// No.  Bad things happen!
								maingame.addSmoke(pb);
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

					// Sample code for how we might leave the cave.
					// if ((ontile==1) && (xc>14)) maingame.gotoLevel({level:"generic-000",x:60,y:60,introdialogue:true,label:"Unclaimed Cave"});
				 },
				// Solid tiles is a little more complex here.  We want to have different "solid tiles"
				// for player versus puzzle block.  We're going to use a ternary operator here:
				// (statement) ? (true clause) : (false clause)
				// So -- ret
				tileIsSolid:function(obj,t){ 
					return (obj.id == 'player'   				// if object is the player
						? (((t>=10) && (t<=19)) || (t==30)) 		// then, these tiles are solid
						: (((t>=10) && (t<=19)) || (t==30) || (t==39))  // else, these tiles are solid
					)
					// return (((t>=10) && (t<=19)) || (t==30)) 
				}
			}
		}
	]
}
