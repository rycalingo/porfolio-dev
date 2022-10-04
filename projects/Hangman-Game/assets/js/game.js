var hangman = {

	wordList: [
				"alpha","bravo","charlie","delta","echo","foxtrot","golf","hotel","india",
				"juliet","kilo","lima","mike","november","oscar","papa","quebec","romeo",
				"sierra","tango","uniform","victory","whiskey","xray","yankee","zulu"
				],

	secretWord: "",
    usedChar: "",
	numGuess: 10,
	OnOff: 0,

	startGame: function(numGuess) {

		if ( this.OnOff === 0 ) {
			var prepGame = document.onkeyup = function(event) {	
				// press any key to start
				//$("#gameOverMsg").removeClass("show");
				document.getElementById("gameOverMsg").className = "" ;
				hangman.OnOff = 1;

				hangman.resetGame(numGuess);
			}
		}

	},
	resetGame: function(numGuess) {

		$("#numGuess").text(numGuess || this.numGuess);

		this.usedChar = "";
		$("#lettersUsed").text(this.usedChar);

		var n = Math.floor(Math.random() * this.wordList.length);
		this.secretWord = this.wordList[n];
		this.secretWord = this.secretWord.toUpperCase();

		console.log(this.secretWord);
		var hiddenWord = "";
		for(var i = 0; i < this.secretWord.length; i++ ) {
			hiddenWord += "_";
		}
		$("#letterBoard").text(hiddenWord);

		return this.runGame();
	},
	runGame: function() {
		
		var isAChar = /^[a-z]$/i; //test for letters only
		var playChar = document.onkeyup = function(event) {
			//console.log(event.which);
			var char = String.fromCharCode(event.which);
			// console.log(char + " = " + char.length);
			char = isAChar.test(char) ? char : false;

			var shownWord = $("#letterBoard").text();
			var numWins = $("#numWins").text();
			var numGuess = $("#numGuess").text();
			var tempStr = "";
			//console.log(shownWord);
			if (!char && hangman.OnOff !== 1) return console.log("Pick a differnt letter");

			// if (char) is not in #letterBoard and not in #lettersUsed
			if ( shownWord.indexOf(char) === -1 && hangman.usedChar.indexOf(char) === -1 ) {
				// if (char) is in secretWord
				if ( hangman.secretWord.indexOf(char) > -1 ) {

					for(var i = 0; i < hangman.secretWord.length; i++ ) {
						if ( char === hangman.secretWord.charAt(i) ) {
							// if there's a match add char to tempStr
							tempStr += char; 
						}else {
							// else add shownWord to tempStr
							tempStr += shownWord.charAt(i);
						}
					}
					// display tempStr to #letterBoard
					$("#letterBoard").text(tempStr);
					// if there are no "_" left add wins
					if (tempStr.indexOf("_") === -1 ) {
						
						numWins++;
						$("#numWins").text(numWins);
						console.log("★★★ You Win ★★★")
						hangman.OnOff = 0;

						return hangman.startGame();
					}
				}else {

					numGuess--;
					$("#numGuess").text(numGuess);
					console.log(numGuess);						

					hangman.usedChar+= char;
					// add wrong letter to #lettersUsed
					$("#lettersUsed").text(hangman.usedChar);
					hangman.usedChar+= ", "

					if ( numGuess <= 0 ) {

						// $("#gameOverMsg").addClass("show");
						document.getElementById("gameOverMsg").className = "show";
						console.log("OH Crap!");
						hangman.OnOff = 0;

						return hangman.startGame();
					}

				}

			}

		};

	} // runGame end;

};
hangman.startGame();
