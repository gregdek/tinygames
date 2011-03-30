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
		// No dialogues on this map

		// Map data and actions
		{
			object:"tilemaps",
			property:"map",
			value:{
				tileset:"tiles",
				map:[
					//  0    1    2    3    4    5    6    7    8    9   10
					[  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12 ], // 0
					[  12,   6,   6,   6,   6,   6,   6,   6,   6,   6,  12 ], // 1
					[  12,   6,  14,  14,  14,  14,  14,   6,  14,   6,  12 ], // 2
					[  12,   6,  14,   6,   6,   6,   6,   6,  14,   6,  12 ], // 3
					[  12,   6,  14,   6,  14,  14,  14,   6,  14,   6,  12 ], // 4
					[  12,   6,  14,   6,   6,   6,  14,   6,  14,   6,  12 ], // 5
					[  12,   6,  14,   6,  14,  14,  14,   6,  14,   6,  12 ], // 6
					[  12,   6,  14,   6,   6,   6,   6,   6,  14,   6,  12 ], // 7
					[  12,   6,  14,  14,  14,  14,  14,  14,  14,   6,  12 ], // 8
					[   6,   6,   6,   6,   6,   6,   6,   6,   6,   6,  12 ], // 9
					[  12,  12,  12,  12,  12,  12,  12,  12,  12,  12,  12 ], // 10
				  ],
				 addObjects:function() {

					// Straight up monsters, yo.  And just for fun,
					// let's create them every time, regardless of
					// whether they've been killed before.  Also,
					// let's create one that a player can't actually
					// kill until he goes and gets the next weapon!
					// Params: 
					//   id, type, x, y, health, speed

					maingame.addEnemy("gregdek-3-003-enemy1","octo",3,3,(2*2*2*2),2);
					maingame.addEnemy("gregdek-3-003-enemy2","octo",3,7,(3*3*3*3),3);
					maingame.addEnemy("gregdek-3-003-enemy3","octo",7,3,(3*3*2*2),3);
					maingame.addEnemy("gregdek-3-003-enemy4","octo",7,7,(2*2*2*2),2);

					// Now let's add the 3x sword.  It will be impossible to get
					// the 3x sword without getting around some 3x monsters.

					if (!tilemaps.queststatus["sword3x"]) {
						maingame.addBonus((5*30)+5,(5*30)+5,"sword","sword3x",0);
					}
				 },
				 mapActions:function() {
					
					var pl=gbox.getObject("player","player");

					// Get tile id that player is currently standing on
					var ontile=help.getTileInMap(pl.x+pl.colx+pl.colhw,pl.y+pl.coly+pl.colhh,tilemaps.map,tilemaps._defaultblock,"map");

					// Get the player's current x and y coords on the map
                                        var xc=help.xPixelToTileX(tilemaps.map,pl.x+pl.colx+pl.colhw);
                                        var yc=help.yPixelToTileY(tilemaps.map,pl.y+pl.coly+pl.colhh);

					// Exit to previous level 
					if ((xc==0) && (yc==9)) maingame.gotoLevel({level:"gregdek-3-001",x:(7*30),y:(6*30),label:""});

				 },
				tileIsSolid:function(obj,t){ return (obj._bullet?(t!=13)&&(t!=14):true)&&(t>9) } // Bullets flies over the pits.
			}
		}
	]
}
