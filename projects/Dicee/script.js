async function rollDice() {

    return new Promise(function(res) {

      document.querySelector("h1").innerHTML = "Rolling!!!"

      const players = document.querySelectorAll("img");
      const pl = [];
      let score;

      let rollCount = 10;

      const roll = setInterval(()=>{

        for (let [i, p] of players.entries()) {

          var n = Math.floor(Math.random()*6) + 1;

          players[i].setAttribute("src", `images/dice${n}.png`);
          pl[i] = n;
        }
        console.log(pl);

        rollCount--;
        if (rollCount <= 0) {
          
          clearInterval(roll);

          if (pl[0] > pl[1]) score = "🚩 Player 1 Wins!";
          if (pl[0] < pl[1]) score = "Player 2 Wins! 🚩";
          if (pl[0] === pl[1]) score = "🚩 Draw! 🚩";

          res(score);
        }


      },100);

    });

}

rollDice().then(
    (res)=> { document.querySelector("h1").innerHTML = res; }
);