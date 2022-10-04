// SCRIPTS

var game_rpg = {

	_obj: this,
	initGame: function() {
		this.gameCache();
		this.pickChampion();
	},
	gameCache: function() {
		this.$game = $("#game_rpg");
		this.$champion_set = this.$game.find("#champions")
		this.$character_set = this.$champion_set.find(".character");
		this.$fighter_set = this.$game.find("#fighters");
		this.$attack_btn = this.$game.find("#attack_btn");

		this.$challenger_set = this.$game.find("#challenger");

		this.$restart_btn = this.$game.find("#restart_btn");
	},
	pickChampion: function(_obj) {
		this.$character_set.on('click', function() {

			game_rpg.$champion = $(this);

			game_rpg.$charFighter = game_rpg.$champion.siblings();

			game_rpg.$champion.addClass("champion");

			game_rpg.userHP = game_rpg.$champion.find(".hp");
			game_rpg.userHP_val = game_rpg.$champion.find(".hp").text();

			game_rpg.userATK = game_rpg.$champion.data("atk");

			game_rpg.$charFighter.addClass("fighter");

			game_rpg.$fighter_set.html(game_rpg.$charFighter);

			game_rpg.$character_set.unbind();
			
			game_rpg.pickChallenger();
		});
	},
	pickChallenger: function() {
		this.$charFighter.on('click', function() {
			game_rpg.$challenger = $(this);

			game_rpg.$challenger.removeClass("fighter");

			game_rpg.$challenger.addClass("challenger");

			game_rpg.challHP = game_rpg.$challenger.find(".hp");
			game_rpg.challHP_val = game_rpg.$challenger.find(".hp").text();

			game_rpg.challATK = game_rpg.$challenger.data("def");

			game_rpg.$challenger_set.html(game_rpg.$challenger);
			
			game_rpg.$charFighter.unbind();

			game_rpg.attack();
		});
	},
	attack: function() {
		game_rpg.user_atk = 0;
			
		game_rpg.$attack_btn.on("click", function() {

			game_rpg.user_atk = game_rpg.user_atk + game_rpg.userATK;

			game_rpg.challHP_val = game_rpg.challHP_val - game_rpg.user_atk;
			game_rpg.userHP_val = game_rpg.userHP_val - game_rpg.challATK;


			game_rpg.challHP.text(game_rpg.challHP_val);
			game_rpg.userHP.text(game_rpg.userHP_val);

			if ( game_rpg.challHP_val <= 0 ) {
				game_rpg.$challenger.addClass("HIDE");
				game_rpg.$challenger.removeClass("challenger");

				game_rpg.$attack_btn.unbind();
	
				game_rpg.pickChallenger();

			}else if ( game_rpg.userHP_val <= 0 ) {
				game_rpg.$restart_btn.removeClass("HIDE");
				
				game_rpg.userHP.text(0);
				game_rpg.$attack_btn.unbind();

				game_rpg.restart();
			}

		});
	},
	restart: function() {
		game_rpg.$restart_btn.removeClass("HIDE");

		game_rpg.$restart_btn.on("click", function() {

			game_rpg.$restart_btn.addClass("HIDE");
			
			for(var i = 0; i < game_rpg.$character_set.length; i++) {

				var char = game_rpg.$character_set.eq(i);
				var hp = char.data("hp");
				char.find(".hp").text(hp);

				char.removeClass("champion");
				char.removeClass("fighter");
				char.removeClass("challenger");
				char.removeClass("HIDE");

				game_rpg.$champion_set.append(char);
			};
			game_rpg.$restart_btn.unbind();

			game_rpg.initGame();
		});

	}
};
game_rpg.initGame();