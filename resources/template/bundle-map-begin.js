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
				font:"small", esckey:"b", who: noface,
				scenes:[
					{ speed:1, who:"noone", audio:"beep", talk:["It's test time!","To answer questions,","walk to the answer,","A, B, C, or D.","Pick any answer to begin!"]}
				]
			}
		},

		// Map data and actions

		// The goal here is to create, dynamically, a maze based on inputs, with a path generated through the maze.  
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
					var ontile=help.getTileInMap(pl.x+pl.colx+pl.colhw,pl.y+pl.coly+pl.colhh,tilemaps.map,tilemaps._defaultblock,"map");
					if (ontile>1) maingame.gotoLevel({level:"1",x:(30*5),y:(30*5),label:"Question 1"});
				 },
				tileIsSolid:function(obj,t){ return (obj._bullet?(t!=13)&&(t!=14):true)&&(t>9) } // Bullets flies over the pits.
			}
		}
	]
}
