// Starting over with a dramatically simplified version of the map from scratch, with docs.

{
 	// Map BGM
	addAudio:[
		["map-bgm",[audioserver+"tlol-cave.mp3",audioserver+"tlol-cave.ogg"],{channel:"bgmusic",loop:true}],	
	],
	// Map graphics
	addImage:[	
		["tiles","resources/mongo/gfx-puzzle7.png"],
	],
	// Map Tileset
	addTiles:[
		{id:"tiles",image:"tiles",tileh:30,tilew:30,tilerow:10,gapx:0,gapy:0},	
	],
	setObject:[
		// First, set dialogues for NPC(s).
		{
                        object:"dialogues",
                        property:"intro",
                        value:{ font:"smalltut", skipkey:"a", esckey:"b", who: noface,
                        // value:{ font:"smalltut", skipkey:"a", who: noface,
                                scenes:[
                                        { speed:1, who:"noone", audio:"beep", talk:["Want to escape to the level above?"]},
                                        { speed:1, who:"noone", audio:"beep", talk:["Walk over only those numbers","that are divisible by 3!"]},
                                        { speed:1, who:"noone", audio:"beep", talk:["Then go to the red button","to make your escape!"]}
                                ]
                        }
                },

                {
                        object:"dialogues", 
                        property:"wife", 	// associates this dialogue to an Npc, defined below in addNpc()
                        value:{
                                // font:"small", skipkey:"a", esckey:"b", who: noface,
                                font:"small", skipkey:"a", who: noface,
                                scenes:[
                                        { speed:1, who:"noone", audio:"beep", talk:["Is a number divisible by 3?"]},
                                        { speed:1, who:"noone", audio:"beep", talk:["Here's a neat trick!"]},
                                        { speed:1, who:"noone", audio:"beep", talk:["Add the digits together.","Do you get 3, 6, or 9?"]},
                                        { speed:1, who:"noone", audio:"beep", talk:["18?"]},
                                        { speed:1, who:"noone", audio:"beep", talk:["1+8 = 9, so yes!"]},
                                        { speed:1, who:"noone", audio:"beep", talk:["52?"]},
                                        { speed:1, who:"noone", audio:"beep", talk:["5+2 = 7, so no!"]},
                                ]
                        }
                },

		// Map data and actions
		{
			object:"tilemaps",
			property:"map",
			value:{
				tileset:"tiles",
				map: [
					//     < 100 : passable number
					// 100 - 199 : impassable number
					//       200 : rock wall, impassable
					//       201 : bare floor, passable
					//       202 : trigger, passable
					[ 200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200 ],
					[ 200,201,201,201,201,201,201,201,201,201,201,201,201,201,201,200 ],
					[ 200,201,201,201,201,201,201,201,201,201,201,201,201,201,201,200 ],
					[ 200,201,  3,201,  4,201,  5,201,  6,201,  7,201,  8,201,201,200 ],
					[ 200,201,201,201,201,201,201,201,201,201,201,201,201,201,201,200 ],
					[ 200,201,201, 29,201, 28,201, 27,201, 26,201, 25,201, 24,201,200 ],
					[ 200,201,201,201,201,201,201,201,201,201,201,201,201,201,201,200 ],
					[ 200,201,201,201,201,201,201,201,201,201,201,201,201,201,201,200 ],
					[ 200,201,201,201,201,201,201,202,201,201,201,201,201,201,201,200 ],
					[ 200,201,201,201,201,201,201,201,201,201,201,201,201,201,201,200 ],
					[ 200,201,201,201,201,201,201,201,201,201,201,201,201,201,201,200 ],
					[ 200,201,201,201,201,201,201,201,201,201,201,201,201,201,201,200 ],
					[ 200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200 ]
				],

				// Define all objects added to the map.
				addObjects:function() {
                                        maingame.addNpc(80,80,[6],"wife",null,[6,7]);
				},

				// Define all actions triggered by the map.
				mapActions:function() {

					// For all events, we'll need to know where the player is currently.
					var pl=gbox.getObject("player","player");
					var ontile=help.getTileInMap(pl.x+pl.colx+pl.colhw,pl.y+pl.coly+pl.colhh,tilemaps.map,tilemaps._defaultblock,"map");
					var xc=help.xPixelToTileX(tilemaps.map,pl.x+pl.colx+pl.colhw);
					var yc=help.yPixelToTileY(tilemaps.map,pl.y+pl.coly+pl.colhh);

					// Turns a number tile from a walkover to a wall.
					if ((ontile>=0) && (ontile<100)) { 
						maingame.setTileInMap(xc,yc,ontile+100,true);
					}

                                        // On stairs?  Go to the next level.
                                        if (ontile==203) { maingame.gotoLevel({level:"gregdek-2-000",x:90,y:90,introdialogue:true,label:"Quest Complete!"}); }

					// Tests number walls.
					// If test is passed, create a key object [FIXME].
					// If test is failed, reset number walls to number walkovers.
					//   (and remove health? FIXME)

					if ((ontile==202) && (!tilemaps.queststatus["gregdek-2-002complete"])) {

						// 202 is the red button that triggers the puzzle test, until the quest is cleared.  
						// 
						// Our puzzle solution: all, but only, %3s triggered.
						
						tilemaps.queststatus["_tmpgregdek-2-001fail"]=false;
						for (var ty=0; ty<tilemaps.map.map.length; ty++) {
							for (var tx=0; tx<tilemaps.map.map[ty].length; tx++) {
								var tilenum = tilemaps.map.map[ty][tx]; 
								if (
									// If a solid tile is %3 ...
									(((tilenum>=100) && (tilenum<200)) && ((tilenum-100) % 3 != 0)) ||
									// Or if a non-solid tile is (!%3) ...
									(((tilenum>=0) && (tilenum<100)) && (tilenum % 3 == 0)) 
								) {
									// then fail it!
									tilemaps.queststatus["_tmpgregdek-2-001fail"]=true;
								}
							}
						}

						if (tilemaps.queststatus["_tmpgregdek-2-001fail"]==true) {
							for (var ty=0; ty<tilemaps.map.map.length; ty++) {
								for (var tx=0; tx<tilemaps.map.map[ty].length; tx++) {
									if (tilemaps.map.map[ty][tx]>=100 && tilemaps.map.map[ty][tx]<200) {
										// maingame.addQuestClear(tilemaps.map.map[tx][ty])
										maingame.setTileInMap(tx,ty,tilemaps.map.map[ty][tx]-100,true);
									}
								}
							}
        	                                        maingame.addQuestClear("Try again!");
						}
						else {
	                                                maingame.setTileInMap(xc+1,yc+1,203,true);
        	                                        maingame.addQuestClear("Got it!");
							tilemaps.queststatus["gregdek-2-002complete"] = true;
						}
					}
				},

				// Define tiles that are solid for this map.
				tileIsSolid:function(obj,t){ if ((t>=100) && (t<=200)) return true; }
			}
		}
	]
}
