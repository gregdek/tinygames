// Starting over with a dramatically simplified version of the map from scratch, with docs.

{
 	// Map BGM
	addAudio:[
		["map-bgm",[audioserver+"tlol-cave.mp3",audioserver+"tlol-cave.ogg"],{channel:"bgmusic",loop:true}],	
	],
	// Map graphics
	addImage:[	
		// ["tiles","resources/tlol/gfx-cave.png"],
		// ["tiles","resources/mongo/gfx-puzzle3.png"],
		["tiles","resources/mongo/gfx-puzzle6.png"],
	],
	// Map Tileset
	addTiles:[
		{id:"tiles",image:"tiles",tileh:30,tilew:30,tilerow:10,gapx:0,gapy:0},	
	],
	setObject:[
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
				addObjects:function() {
					// Conditional map-based adds.  I'm guessing that this is rechecked
					// continually for conditions, and objects are added whenever any of
					// the criteria below are true.

					//if (!tilemaps.queststatus["oldmanstory"]) gbox.playAudio("map-bgm");
					//if (tilemaps.queststatus["oldmanstory"]) // If you've heard the old man story...
					//	maingame.addNpc(555,180,[8,9],"soul"); // The soul of the tricked appears.
					//if (!tilemaps.queststatus["floor2trapped"]) {
					//	maingame.setTileInMap(14,6,4,false);
					//}
					//if (!tilemaps.queststatus["floor2arrows"]) {
					//	maingame.addChest(19,6,null,false,"arrow",null,0);
					//}
					//if (tilemaps.queststatus["floor1eyeswitch"]&&!tilemaps.queststatus["bosskey"]) {
					//	maingame.addEnemy("fifth1","octo",3,4,true);
					//	maingame.addEnemy("fifth2","octo",5,4,true);
					//	maingame.addEnemy("fifth3","octo",6,4,true);
					//	maingame.addEnemy("fifth4","octo",7,4,true);
					//	tilemaps.queststatus["_tmpbosskey"]=false;
					//}
				 },
				 mapActions:function() {
					// if (!tilemaps.queststatus["floor2trapped"]&&!tilemaps.queststatus["floor2untrapped"]) // the trap on floor 2
					//	if (ontile==4) {
					//		gbox.hitAudio("beep"); // Switch sound
					//		maingame.addDoor("sidedoor","doorv",10,4,true);
					//		maingame.addEnemy("third1","octo",13,2,true);
					//		maingame.addEnemy("third2","octo",21,2,true);
					//		maingame.addEnemy("third3","octo",13,10,true);
					//		maingame.addEnemy("third4","octo",21,10,true);
					//		tilemaps.queststatus["floor2trapped"]=true; // Trap on
					//		maingame.addQuestClear("TRAPPED!");
					//		maingame.startDialogue("usebtutorial"); // Explain how to open the first tresaure chest.
					//		maingame.setTileInMap(14,6,3,true);
					//	 }
					//if (tilemaps.queststatus["floor2trapped"]&&!tilemaps.queststatus["floor2untrapped"]) {
					//	if (!gbox.getObject("foes","third1")&&!gbox.getObject("foes","third2")&&!gbox.getObject("foes","third3")&&!gbox.getObject("foes","third4")) { // check them. If beaten...
					//		gbox.getObject("walls","sidedoor").doOpen();
					//		tilemaps.queststatus["floor2untrapped"]=true; // Set the quest as done...
					//		maingame.addQuestClear(); // Arcade-ish message "QUEST CLEAR"!
					//	}
					// }
					//if (tilemaps.queststatus["floor1eyeswitch"]&&!tilemaps.queststatus["bosskey"]&&!tilemaps.queststatus["_tmpbosskey"]) {
					//	if (!gbox.getObject("foes","fifth1")&&!gbox.getObject("foes","fifth2")&&!gbox.getObject("foes","fifth3")&&!gbox.getObject("foes","fifth4")) { // check them. If beaten...
					//		maingame.addQuestClear(); // Quest clear
					//		maingame.addChest(5,7,null,true,"BOSSKEY","bosskey",0);
					//		tilemaps.queststatus["_tmpbosskey"]=true;
					//	}
					// }
					var pl=gbox.getObject("player","player");
					var ontile=help.getTileInMap(pl.x+pl.colx+pl.colhw,pl.y+pl.coly+pl.colhh,tilemaps.map,tilemaps._defaultblock,"map");
					// if (ontile==1) maingame.gotoLevel({level:"floor1",x:60,y:530,label:"Floor 1 stairs"});
					if ((ontile>=0) && (ontile<100)) { 
						xc=help.xPixelToTileX(tilemaps.map,pl.x+pl.colx+pl.colhw);
						yc=help.yPixelToTileY(tilemaps.map,pl.y+pl.coly+pl.colhh);
						maingame.setTileInMap(xc,yc,ontile+100,true);
					}
					if (ontile==202) {
						// 202 is the red button that tests the puzzle.  When tripped,
						// the map is analyzed for correctness.  If the map is correct,
						// the quest is completed.  If not, the tiles are reset to their
						// original configuration.
						// NOTE: when walking over the map array, the ycoord comes before 
						// the xcoord because of the array structure.
						// FIRST, walk through to check puzzle state.  If we find any 
						// odd tiles (1,3,5,7,9) or even walls (16,18,20,22,24), then
						// FAIL.
						for (var ty=0; ty<tilemaps.map.map.length; ty++) {
							for (var tx=0; tx<tilemaps.map.map[ty].length; tx++) {
								// alert(tx+' '+ty);
								//if (tilemaps.map.map[ty][tx]>=100 && tilemaps.map.map[ty][tx]<200) {
									// maingame.addQuestClear(tilemaps.map.map[tx][ty])
									//maingame.setTileInMap(tx,ty,tilemaps.map.map[ty][tx]-100,true);
								//}
							}
						}
						for (var ty=0; ty<tilemaps.map.map.length; ty++) {
							for (var tx=0; tx<tilemaps.map.map[ty].length; tx++) {
								// alert(tx+' '+ty);
								if (tilemaps.map.map[ty][tx]>=100 && tilemaps.map.map[ty][tx]<200) {
									// maingame.addQuestClear(tilemaps.map.map[tx][ty])
									maingame.setTileInMap(tx,ty,tilemaps.map.map[ty][tx]-100,true);
								}
							}
						}
					}
				 },
				// tileIsSolid:function(obj,t){ return (obj._bullet?(t!=13)&&(t!=14):true)&&(t>9) } // Bullets flies over the pits.
				tileIsSolid:function(obj,t){ if ((t>=100) && (t<200)) return true; }
			}
		}
	]
}
