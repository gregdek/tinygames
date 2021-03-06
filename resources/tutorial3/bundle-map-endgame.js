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
		// First, set dialogues.  "intro" plays at level start if defined in... FIXME.
		{
                        object:"dialogues",
                        property:"intro",
                        value:{ font:"smalltut", skipkey:"a", esckey:null, who: noface, endgame:true,
                        // value:{ font:"smalltut", skipkey:"a", who: noface,
                                scenes:[
                                        { speed:1, who:"noone", audio:"beep", talk:["You have escaped!","Your knowledge is impressive."]},
                                        { speed:1, who:"noone", audio:"beep", talk:["Until the next time!"]},
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
                                        { speed:1, who:"noone", audio:"beep", talk:["Press the red button, and the stairs","to the next level will appear."]}
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
                                        if (ontile==203) { maingame.gotoLevel({level:"gregdek-1-001",x:90,y:90,introdialogue:true,label:"Dungeon Level 1: Land of the Odd"}); }

					// On trigger?  Create the stairs.

					if ((ontile==202) && (!tilemaps.queststatus["gregdek-1-000complete"])) {

						// 202 is the red button that triggers the puzzle test, until the quest is cleared.  
						// 
						// In this case, the quest is automatically cleared.

						maingame.setTileInMap(4,4,203,true);	
						//maingame.addQuestClear("Booyah!");
						tilemaps.queststatus["gregdek-1-000complete"] = true;
					}
				},

				// Define tiles that are solid for this map.
				tileIsSolid:function(obj,t) { if ((t>=100) && (t<=200)) return true; }
			}
		}
	]
}
