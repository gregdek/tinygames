{
	// Map BGM
	addAudio:[
		["map-bgm",[audioserver+"tlol-village.mp3",audioserver+"tlol-village.ogg"],{channel:"bgmusic",loop:true}],	
	],
	// Map graphics
	addImage:[	
		["tiles","resources/tlol/gfx-village.png"],
	],
	// Map Tileset
	addTiles:[
		{id:"tiles",image:"tiles",tileh:30,tilew:30,tilerow:10,gapx:0,gapy:0},	
	],
	setObject:[
		// Dialogues on this map
		{
			object:"dialogues",
			property:"villager",
			value:{
				font:"small", skipkey:"a", esckey:"b", who: noface,
				scenes:[
					{ speed:1, who:"noone", audio:"beep", talk:["You have to hurry! Go into the","cave and save all of us","from the monster!"]},
					{ speed:1, who:"noone", audio:"beep", talk:["Believe in yourself!","You are the Hero of the Legend!"]}
				]
			}
		},{
			object:"dialogues",
			property:"wife",
			value:{
				font:"small", skipkey:"a", esckey:"b", who: noface,
		  		scenes:[
		  			{ speed:1, who:"noone", audio:"beep", talk:["The monster of the cave is","giving us a lot of troubles","as my husband says. But..."]},
		  			{ speed:1, who:"noone", audio:"beep", talk:["I feel that something","strange is happening, in Kariko","village..." ]},
		  			{ speed:1, who:"noone", audio:"beep", talk:["Keep your eyes wide open,", "Klin. Your enemy is very strong." ]},
		  		]
		  	}
		},{
			object:"dialogues",
			property:"intro",
			value:{ font:"smalltut", skipkey:"a", esckey:"b", who: noface,
		  		scenes:[
		  			{ speed:1, who:"noone", audio:"beep", talk:["The Dungeons of Mongo","are all around you."]},
		  			{ speed:1, who:"noone", audio:"beep", talk:["Learn math. Become a legend." ]},
		  		]
		  	}
		
		// Map data and actions
		},{
			object:"tilemaps",
			property:"map",
			value:{					
				title:"The Village",
				tileset:"tiles",
				map:[
					[  13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13],
					[  13,  2,  2, 13,  2,  2, 13,  2,  2, 13,  2,  2, 13,  2,  2, 13, 13],
					[  12,  1,  1, 12,  1,  1, 12,  1,  1, 12,  1,  1, 12,  1,  1, 12, 12],
					[   0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10, 11,  0],
					[   0,  0,  0,  0, 10,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10,  0],
					[   0,  0,  0, 11, 11, 11,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
					[   0,  0,  0, 11, 11,  0,  0,  0,  0,  0, 11, 11,  0,  0,  0,  0,  0],
					[   0,  0,  0, 10,  0, 11,  0,  0,  0,  0,  0, 11,  0,  0,  0,  0,  0],
					[   0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
					[   0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
					[   0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
					
				  ],
				 playerSpawnX:40,
				 playerSpawnY:180,
				 addObjects:function() {
					gbox.playAudio("map-bgm");
					maingame.addBlock(360,150,"house",0);
					maingame.addNpc(390,220,[4],"villager",null,[4,5]);
					maingame.addNpc(150,180,[6],"wife",null,[6,7]);
					maingame.addPuzzleblock(40,210,"digit",5);
					//maingame.addPuzzler(2,8,"treasure1",false,"coin");
					//maingame.addChest(2,8,"treasure1",false,"coin");
				 },
				 mapActions:function() {
					// Get the player object to work with
					var pl=gbox.getObject("player","player");

					// Get the player's current x and y coords on the map
                                        var xc=help.xPixelToTileX(tilemaps.map,pl.x+pl.colx+pl.colhw);
                                        var yc=help.yPixelToTileY(tilemaps.map,pl.y+pl.coly+pl.colhh);

					// Get the ID of the tile the player is on
					var ontile=help.getTileInMap(pl.x+pl.colx+pl.colhw,pl.y+pl.coly+pl.colhh,tilemaps.map,tilemaps._defaultblock,"map");

					// If he's in a cave, figure out which cave he's in and send him to the right dungeon.
					if ((ontile==1) && (xc>=1) && (xc<=2)) maingame.gotoLevel({level:"gregdek-1-000",x:60,y:60,introdialogue:true,label:"Greg's First Quest"});
					if ((ontile==1) && (xc>=4) && (xc<=5)) maingame.gotoLevel({level:"gregdek-2-000",x:60,y:60,introdialogue:true,label:"Greg's Second Quest"});
					if ((ontile==1) && (xc>=7) && (xc<=8)) maingame.gotoLevel({level:"gregdek-3-000",x:(17*30),y:(11*30),introdialogue:false,label:"Greg's Third Quest"});
					if ((ontile==1) && (xc>=11) && (xc<=14)) maingame.gotoLevel({level:"gregdek-4-000",x:60,y:60,introdialogue:true,label:"Greg's Fourth Quest"});
					if ((ontile==1) && (xc>14)) maingame.gotoLevel({level:"generic-000",x:60,y:60,introdialogue:true,label:"Unclaimed Cave"});
				 },
				tileIsSolid:function(obj,t){ return (t>9) }
			}
		}
	]
}
