// Scripts
var triviaGame = {

	init: function() {
		this.cacheDom();
		this.bindEvents();
	},
	cacheDom: function() {
		this.$game = $("#trivia_game");
		this.$startBtn = this.$game.find("#start_btn");
		this.$timeDisplay = this.$game.find("#time_display");
		this.$questionDisplay = this.$game.find("#question_display");
		this.$choiceDisplay = this.$game.find("#choice_display");
		this.$selChoice;

		this.$hiddenItems = this.$game.find(".HIDE");
	},
	bindEvents: function() {
		this.$startBtn.on("click", this.startGame.bind(this) );
		this.$choiceDisplay.on("click", ".choice", this.checkAnswer.bind(this));
	},
	startGame: function() {
		this.$hiddenItems.removeClass("HIDE");
		this.$startBtn.addClass("HIDE");
		
		this.queryCount = 0;
		this.correctCount = 0;
		this.wrongCount = 0;
		this.missedCount = 0;
		this.timeCount = 0;
		this.isTimerON = 0;
		this.answer = null;
		
		this.displayQuery();
	},
	gameTimer: function() {
		if ( this.isTimerON === 0 ) {
			this.timer = setInterval(this.counter.bind(this), 1000);

		}else {
			clearInterval(this.timer);
		}
		this.isTimerON = this.isTimerON ? 0 : 1;
	},
	counter: function() {
		if ( this.timeCount === 0 ) {
			this.gameTimer();
			this.missedCount++;
			console.log(this.missedCount);
			this.$questionDisplay.html("Times up the answer is:<br><span>" + this.answer + "</span>");

			return this.displayResults();
		}
		this.timeCount--;
		this.$timeDisplay.text( this.timeCount );
	},
	checkAnswer: function(event) {
		event.stopPropagation();
		var _this = $(event.target);
		
		this.gameTimer();
		if ( this.answer === _this.text() )  {
			this.correctCount++;
			console.log(this.correctCount);
			this.$questionDisplay.text("Correct:");
			_this.addClass("correct");
			this.$choiceDisplay.html(_this);
			this.displayResults();
		}else {
			this.wrongCount++;
			console.log(this.wrongCount);
			this.$questionDisplay.html("Wrong the correct answer is:<br><span>" + this.answer + "</span>");
			_this.addClass("wrong");
			this.$choiceDisplay.html(_this);
			this.displayResults();			
		};
	},
	displayQuery: function() {
		if (this.queryCount >= this.questionList.length) {
			this.queryCount = 00;
			return this.displayResults();
		}
		this.timeCount = 15;
		this.$timeDisplay.text(this.timeCount);
		
		var queryStr = this.questionList[this.queryCount].query;
		this.$questionDisplay.text( queryStr );
		this.answer = this.questionList[this.queryCount].answer;
		
		this.$choiceDisplay.empty();
		
		var choiceList = this.questionList[this.queryCount].choices;

		for ( var c in choiceList ) {
			var div = $("<div>",{class: "choice"}).text(choiceList[c]);
			this.$choiceDisplay.append(div);
		}
		this.queryCount++;
		this.$selChoice = this.$choiceDisplay.find(".choice");

		this.gameTimer();
	},
	displayResults: function() {
		if (this.queryCount === 00) {
			this.$choiceDisplay.empty();			
			this.$questionDisplay.text("Results");
			this.$choiceDisplay.append($("<div>").text("Correct: " + this.correctCount));
			this.$choiceDisplay.append($("<div>").text("Wrong: " + this.wrongCount));
			this.$choiceDisplay.append($("<div>").text("Missed: " + this.missedCount));
			
			this.$startBtn.removeClass("HIDE");
			this.$startBtn.text("Restart  Game");
		} else {
			setTimeout( this.displayQuery.bind(this), 2500);
		}
	},
	questionList: [
		{
			query: "What is the name of Thor's hammer?",
			choices: ["Mythril", "Mjolnir", "Gram", "Gungnir"],
			answer: "Mjolnir"
		},
		{
			query: "Which of these is not one of the six infinity stones?",
			choices: ["Uru", "Orb", "Aether", "Tesseract"],
			answer: "Uru"
		},
		{
			query: "Captain America's shield is made of what fictional metal?",
			choices: ["Titanium", "Platinum", "Adamantium", "Vibranium"],
			answer: "Vibranium"
		},
		{
			query: "What city did Dr. Strange had to go to find The Ancient One?",
			choices: ["Janakpur", "Kamar-Taj", "Shangri-La", "Kathmandu"],
			answer: "Kamar-Taj"
		},
		{
			query: "Bruce Banner was expose to what type of radiation causing him to turn into The Hulk?",
			choices: ["Gamma", "Omega", "Beta", "Delta"],
			answer: "Gamma"
		},
		{
			query: "Which infinity stone is inbeded in Vision's forehead?",
			choices: ["Space", "Mind", "Soul", "Power"],
			answer: "Mind"
		},
		{
			query: "Tony Stark calls his AI by what name?",
			choices: ["Alfred", "Friday", "Jarvis", "Penny"],
			answer: "Jarvis"
		},
		{
			query: "Hawkeye's real name is?",
			choices: ["Geln", "Jeff", "Clint", "Rickson"],
			answer: "Clint"
		},
		{
			query: "The Aether was given to who for safe keeping?",
			choices: ["The Collector", "SHIELD", "Hydra", "Nova Corps"],
			answer: "The Collector"
		},
		{
			query: "What part on New York City is Spiderman from?",
			choices: ["Brooklyn", "Harlem", "Bronx", "Queens"],
			answer: "Queens"
		}
	]
}; triviaGame.init();