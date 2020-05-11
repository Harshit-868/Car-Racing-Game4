class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(275, 150);
    car2 = createSprite(475, 150);
    car3 = createSprite(675, 150);
    car4 = createSprite(875, 150);
    cars = [car1, car2, car3, car4];

    car1.addImage("Car1.png", img1);
    car2.addImage("Car2.png", img2);
    car3.addImage("Car3.png", img3);
    car4.addImage("Car4.png", img4);
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      background(groundImg);
      image(trackImg, 0, -displayHeight * 3.8, displayWidth, displayHeight * 5);

      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175;
      var y;

      for(var plr in allPlayers){

        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;

        //use data form the database to display the cars in y direction
        y = (displayHeight + 100) - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){

          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y - 275;
        }
        
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if (player.distance > 3600) {
      gameState = 2;
    }

    drawSprites();
  }

  end() {
    game.update(2);
    console.log("Game End")
  }

}
