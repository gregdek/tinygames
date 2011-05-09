{

// Template: Test Intro Level
// To be copied and string-replaced at dungeon generation time.  
// Anything with #MACROfoo# gets replaced.

	// Map BGM
	addAudio:[
		["map-bgm",[audioserver+"tlol-cave.mp3",audioserver+"tlol-cave.ogg"],{channel:"bgmusic",loop:true}],	
	],
	// Map graphics
	addImage:[	
		["tiles","resources/%%GAMENAME%%/gfx-cave-test1.png"],
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
				//font:"small", skipkey:"a", esckey:"b", who: noface,
				font:"small", skipkey:"a", esckey:"b", who: noface,
				scenes:[
					{ speed:1, who:"noone", audio:"beep", talk: ["%%QUESTION%%","A. %%A%%","B. %%B%%","C. %%C%%","D. %%D%%"]}
				]
			}
		},{
			object:"dialogues",
			property:"wrong",
			value:{
				font:"small", skipkey:"a", esckey:"b", who: noface,
				scenes:[
					{ speed:1, who:"noone", audio:"beep", talk: ["Cool dude."]}
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
					[ 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6 ],
					[ 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6 ],
					[ 6, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 6 ],
					[ 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6 ],
					[ 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6 ],
					[ 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6 ],
					[ 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6 ],
					[ 6, 0, 3, 0, 0, 0, 0, 0, 0, 4, 0, 6 ],
					[ 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6 ],
					[ 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6 ],
				  ],
				 addObjects:function() {
				 },
				 mapActions:function() {
					var pl=gbox.getObject("player","player");
                                        var xc=help.xPixelToTileX(tilemaps.map,pl.x+pl.colx+pl.colhw);
                                        var yc=help.yPixelToTileY(tilemaps.map,pl.y+pl.coly+pl.colhh);
					var ontile=help.getTileInMap(pl.x+pl.colx+pl.colhw,pl.y+pl.coly+pl.colhh,tilemaps.map,tilemaps._defaultblock,"map");
					if (ontile==1) {
						maingame.setTileInMap(xc,yc,0,true);	
						maingame.addQuestClear("WRONG!");
                                                maingame.hud.addValue("health","value",-4); // Decrease by 1
                                                if (maingame.hud.getValue("health","value")<=0) // If dead..
                                                	pl.kill(); // Kill...
                                                else { // Else is just hit
                                                	gbox.hitAudio("hurt");
                                                	pl.accz=-5; // A little jump...
                                                	pl.invultimer=30; // Stay invulnerable for a while...
                                                	pl.stilltimer=10; // Stay still for a while...
						}
					}
					if (ontile==2) {
						maingame.setTileInMap(xc,yc,0,true);	
						maingame.startDialogue("wrong");
					}
					if (ontile==3) {
						maingame.gotoLevel({level:"%%NEXT%%",x:(30*5),y:(30*5),introdialogue:true,label:"%%NEXT%%"});
					}
				 },
				tileIsSolid:function(obj,t){ return (obj._bullet?(t!=13)&&(t!=14):true)&&(t>9) } // Bullets flies over the pits.
			}
		}
	]
}
