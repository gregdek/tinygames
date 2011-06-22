{
	// Map graphics.  Note that we're using a new tileset here!  This tileset has lots of numbers,
	// for players to walk over.  We'll get to that in the gameplay, below.

        addImage:[
                ["tiles","resources/tutorial3/gfx-puzzle8.png"],
        ],

	// Tiles...

	addTiles:[
		{id:"tiles",image:"tiles",tileh:30,tilew:30,tilerow:10,gapx:0,gapy:0},	
	],

	setObject:[
		// Dialogues on this map
		{
			object:"dialogues",
			property:"intro",
			value:{ font:"smalltut", skipkey:"a", esckey:"b", who: noface,
		  		scenes:[
		  			{ speed:1, who:"noone", audio:"beep", talk:["Solve the puzzle.","Push the blocks."]}
		  		]
		  	}
		
		// Map data and actions
		},{

                        object:"tilemaps",
                        property:"map",
                        value:{
                                tileset:"tiles",
                                map: [
					// This is just a place holder.  The real map is being built
					// with newmap, below.
                                        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
                                        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
                                        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
                                        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
                                        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
                                        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
                                        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
                                        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
                                        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
                                        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
                                ],

                                // Define all objects added to the map.
                                addObjects:function() {

					// First, a different way of mapping the level.
					// We re-map the level using a more intuitive "string"
					// approach, rather than the "array" approach used
					// by default.  Downside: the "map" setting, above,
					// must be identical in size to "newmap".
					var newmap=['xxxxxxxxxxxxxxx',
					            'x.............x',
					            'x...xxxxxx....x',
					            'x...xx13xx....x',
					            'x...x+22xx....x',
					            'x...xx==xx....x',
					            'x...xx.5xx....x',
					            'x.............x',
					            'x.............x',
					            'xxxxxxxxxxxxxxx'];
					var newtiles={
						"x":200, ".":201,
						"1":101, "2":102, "3":103, "4":104, "5":105, 
						"6":106, "7":107, "8":108, "9":109, "0":100,
						"+":204, "-":205, "*":206, "=":207
					}; 
					for (ymap=0; ymap<newmap.length; ymap++) {
						for (xmap=0; xmap<newmap[ymap].length; xmap++) {
							var mymaptile = newtiles[newmap[ymap].charAt(xmap)];
							maingame.setTileInMap(xmap,ymap,mymaptile,false);
						}
					}

					// This approach also allows us to create a separate 
					// map for adding objects in almost exactly the same way!
					var objmap=['xxxxxxxxxxxxxxx',
					            'x.............x',
					            'x.6.........1.x',
					            'x.7.........2.x',
					            'x.8.........3.x',
					            'x.9.........4.x',
					            'x.0.........5.x',
					            'x.............x',
					            'x.............x',
					            'xxxxxxxxxxxxxxx'];

					// Now go through and insert object for those things we recognize.
					// We keep the visual layout similar for ease of reconciling with the
					// "newmap", above, but only pull out the objects we're interested in.
					for (ymap=0; ymap<objmap.length; ymap++) {
						for (xmap=0; xmap<objmap[ymap].length; xmap++) {
							var myobjid = objmap[ymap].charAt(xmap);
							if ((myobjid>='0') && (myobjid<='9')) {
								maingame.addPuzzleblock(xmap*30,ymap*30,"digit",myobjid);
							}
						}
					}

					// maingame.addPuzzleblock(40,210,"digit",5);
					
					// maingame.setTileInMap(1,1,99,false);
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
				tileIsSolid:function(obj,t){ return ((t>=100) && (t<=200)) }
			}
		}
	]
}
