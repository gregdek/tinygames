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
		//["tiles","resources/mongo/gfx-cave.png"],
		["tiles","resources/mongo/gfx-cave-test1.png"],
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
					{ speed:1, who:"noone", audio:"beep", talk:["It's test time!"]}
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
					[ 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6 ],
					[ 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6 ],
					[ 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6 ],
					[ 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6 ],
					[ 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6 ],
					[ 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6 ],
					[ 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6 ],
					[ 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6 ],
					[ 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6 ],
					[ 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6 ],
					[ 6, 6, 6, 6, 6, 6, 6, 6, 5, 5, 6, 6 ],
				  ],
				 addObjects:function() {
					
				 },
				 mapActions:function() {
					
					var pl=gbox.getObject("player","player");
					var ontile=help.getTileInMap(pl.x+pl.colx+pl.colhw,pl.y+pl.coly+pl.colhh,tilemaps.map,tilemaps._defaultblock,"map");
					if (ontile==5) maingame.gotoLevel({level:"begin",x:300,y:90,label:"The Village"});
				 },
				tileIsSolid:function(obj,t){ return (obj._bullet?(t!=13)&&(t!=14):true)&&(t>9) } // Bullets flies over the pits.
			}
		}
	]
}
