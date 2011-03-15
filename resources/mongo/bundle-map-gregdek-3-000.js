{
	// Map BGM
	addAudio:[
		["map-bgm",[audioserver+"tlol-cave.mp3",audioserver+"tlol-cave.ogg"],{channel:"bgmusic",loop:true}],	
	],
	// Map graphics
	addImage:[	
		["tiles","resources/tlol/gfx-cave.png"],
	],
	// Map Tileset
	addTiles:[
		{id:"tiles",image:"tiles",tileh:30,tilew:30,tilerow:10,gapx:0,gapy:0},	
	],
	setObject:[
		// Dialogues on this map
		{
			object:"dialogues",
                        property:(tilemaps.queststatus["gregdek-3-000-oldmanhasspoken"]?"oldman":"notoldman"),
			value:{
				font:"small", skipkey:"a", esckey:"b", who: noface,
				scenes:[
					{ speed:1, who:"noone", audio:"beep", talk:["Good luck, Factorer!"]}
				]
			}	
		},
		{
			object:"dialogues",
                        property:(tilemaps.queststatus["gregdek-3-000-oldmanhasspoken"]?"notoldman":"oldman"),
			value:{
				//font:"small", skipkey:"a", esckey:"b", who: noface,
				font:"small", skipkey:"a", who: noface,
				scenes:[
					{ speed:1, who:"noone", audio:"beep", talk:["Are you the one they call..."]},
					{ speed:1, who:"noone", audio:"beep", talk:["...the Factorer?"]},
					{ speed:1, who:"noone", audio:"beep", talk:["There are many monsters here,","and they are very strong."]},
					{ speed:1, who:"noone", audio:"beep", talk:["We have heard that you know how","to cut them down to size!"]},
					{ speed:1, who:"noone", audio:"beep", talk:["I can only offer you","this x2 factoring sword,"]},
					{ speed:1, who:"noone", audio:"beep", talk:["But there are stronger","weapons in the dungeon."]},
					{ speed:1, who:"noone", audio:"beep", talk:["Good luck, Factorer!"]}
				]
			}	
		},

		// Map data and actions
		{
			object:"tilemaps",
			property:"map",
			value:{
				tileset:"tiles",
				map:[
					//  0    1    2    3    4    5    6    7    8    9   10   11   12   13   14   15   16   17   18 
					[  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12], // 0
					[  12,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,  12], // 1
					[  12,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,  12,  12,   6,  12], // 2
					[  12,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,  12,  12,   6,  12], // 3
					[  12,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,  12,  12,   6,  12], // 4
					[  12,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,  12,  12,   6,  12], // 5
					[  12,   6,   6,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,   6,  12], // 6
					[  12,   6,   6,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,   6,  12], // 7
					[  12,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,  12,  12,   6,  12], // 8
					[  12,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,  12,  12,   6,  12], // 9
					[  12,   6,   6,  12,  12,   6,   6,  12,  12,   6,   6,  12,  12,   6,   6,  12,  12,   6,  12], // 10
					[  12,   6,   6,  12,  12,   6,   6,  12,  12,   6,   6,  12,  12,   6,   6,  12,  12,   6,  12], // 11
					[  12,   6,   6,  12,  12,   6,   6,  12,  12,   6,   6,  12,  12,   6,   6,  12,  12,   6,  12], // 12
					[  12,   6,   6,  12,  12,   6,   6,  12,  12,   6,   6,  12,  12,   6,   6,  12,  12,   6,  12], // 13
					[  12,   6,   6,  12,  12,   6,   6,  12,  12,   6,   6,  12,  12,   6,   6,  12,  12,   6,  12], // 14
					[  12,   6,   6,  12,  12,   6,   6,  12,  12,   6,   6,  12,  12,   6,   6,  12,  12,   6,  12], // 15
					[  12,   6,   6,  12,  12,   6,   6,  12,  12,   6,   6,  12,  12,   6,   6,  12,  12,   6,  12], // 16
					[  12,   6,  12,  12,  12,   6,  12,  12,  12,   6,  12,  12,  12,   6,  12,  12,  12,   5,  12], // 17
				  ],
				 addObjects:function() {

					// Add NPC (old man).  Params:
					//   x, y, still, dialogue triggered, quest triggered, animation
					// Q: why is addNPC not set by tilexy like addEnemy, but by pixelxy?
                        		if (!tilemaps.queststatus["gregdek-3-questcomplete"]) {
						maingame.addNpc((5*30),(3*30),[2],"oldman","gregdek-3-000-oldmanhasspoken",[2,3]);
					} 
		
					// Add doors.  Params:
					//   maingame.addDoor=function(id,tileset,x,y,animated,openwith) 
					if (!tilemaps.queststatus["gregdek-3-door2x"]) {
 						maingame.addDoor("gregdek-3-door2x","door",1,6,false,"SMALLKEY");
					}
					maingame.addDoor("gregdek-3-door3x","door",3,8,false,"SMALLKEY");
					maingame.addDoor("gregdek-3-door5x","door",7,8,false,"SMALLKEY");
					maingame.addDoor("gregdek-3-door7x","door",11,8,false,"SMALLKEY");

					// Let's put enemies behind the doors. 
					// Params: 
					//   id, type, x, y, health, speed
					// Faster than 10 can be problematic for gameplay
					// Faster than 8 allows them to jump thru 1x1 walls

					// Also make sure that they're not recreated if they've already been killed

					if (!tilemaps.queststatus["gregdek-3-000-enemy2x"]) maingame.addEnemy("gregdek-3-000-enemy2x","octo",1,11,(2*2),2);
					if (!tilemaps.queststatus["gregdek-3-000-enemy3x"]) maingame.addEnemy("gregdek-3-000-enemy3x","octo",5,11,(3*3),3);
					if (!tilemaps.queststatus["gregdek-3-000-enemy5x"]) maingame.addEnemy("gregdek-3-000-enemy5x","octo",9,11,(5*5),5);
					if (!tilemaps.queststatus["gregdek-3-000-enemy7x"]) maingame.addEnemy("gregdek-3-000-enemy7x","octo",13,11,(7*7),7);

					// Now add a couple of objects that are just lying around.
					// Params:
					//   x, y, type, id, expire (if any)
					// Add the key to 2x if it hasn't been picked up yet:
					if (!tilemaps.queststatus["gregdek-3-key2x"]) {
						maingame.addBonus((3*30),(5*30),"SMALLKEY","gregdek-3-key2x",0);
					}

					if (!tilemaps.queststatus["sword2x"]) {
						maingame.addBonus((1*30),(1*30),"sword","sword2x",0);
					}
				 },
				 mapActions:function() {
					
					var pl=gbox.getObject("player","player");
					var ontile=help.getTileInMap(pl.x+pl.colx+pl.colhw,pl.y+pl.coly+pl.colhh,tilemaps.map,tilemaps._defaultblock,"map");

					// Get the player's current x and y coords on the map
                                        var xc=help.xPixelToTileX(tilemaps.map,pl.x+pl.colx+pl.colhw);
                                        var yc=help.yPixelToTileY(tilemaps.map,pl.y+pl.coly+pl.colhh);

					// Trigger: stepping on "5" tile goes back to village
					if (ontile==5) maingame.gotoLevel({level:"begin",x:210,y:90,label:"The Village"});

					// Exit to next level 
					if ((xc==1) && (yc==17)) maingame.gotoLevel({level:"gregdek-3-001",x:(1*30),y:(1*30),label:""});
				 },
				tileIsSolid:function(obj,t){ return (obj._bullet?(t!=13)&&(t!=14):true)&&(t>9) } // Bullets flies over the pits.
			}
		}
	]
}
