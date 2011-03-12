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
			property:"intro",
			value:{
				font:"small", skipkey:"a", esckey:"b", who: noface,
				scenes:[
					{ speed:1, who:"noone", audio:"beep", talk:["This dungeon has not yet","been claimed by a developer!"]}
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
					[  12,  12,  12,  12,  12,  12,  12,  12,  12,  12],
					[  12,  11,  11,  11,  11,  11,  11,  11,  11,  12],
					[  12,   6,   6,   6,   6,   6,   6,   6,   6,  12],
					[  12,   6,   6,   6,   6,   6,   6,   6,   6,  12],
					[  12,   6,   6,   6,   6,   6,   6,   6,   6,  12],
					[  12,   6,   6,   6,   6,   6,   6,   6,   6,  12],
					[  12,   6,   6,   6,   6,   6,   6,   6,   6,  12],
					[  12,   6,   6,   6,   6,   6,   6,   6,   6,  12],
					[  12,   6,   6,   6,   6,   6,   6,   6,   6,  12],
					[  12,  12,  12,  12,  12,   5,   5,  12,  12,  12]
				  ],
				 addObjects:function() {
					// Here we add enemies. 
					// Params: id, type, x, y, health, speed
					// Faster than 10 can be problematic for gameplay
					maingame.addEnemy("enemy1","octo",7,8,(2*2*3),(2+2+3));
					maingame.addEnemy("enemy2","octo",8,7,(2*2*3*3),(2+2+3+3));
				 },
				 mapActions:function() {
					
					var pl=gbox.getObject("player","player");
					var ontile=help.getTileInMap(pl.x+pl.colx+pl.colhw,pl.y+pl.coly+pl.colhh,tilemaps.map,tilemaps._defaultblock,"map");
					if (ontile==5) maingame.gotoLevel({level:"begin",x:210,y:90,label:"The Village"});
				 },
				tileIsSolid:function(obj,t){ return (obj._bullet?(t!=13)&&(t!=14):true)&&(t>9) } // Bullets flies over the pits.
			}
		}
	]
}
