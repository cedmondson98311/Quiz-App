//Global State Objects
var state = {
	questions: [
		//index:0
		{text:'',
		 choices:[],
		 correctAnswerIndex:null,
		 image: [],
		 checkAnswer: null,
		 explainer: []
		},
	],
	correct: 0,
	missed: 0,
	current: 0,
	remaining: 10
}
var currentStateIndex = 0;
var choiceText = '';

//State Modification Functions
function addQuestion(questionText,answers,correctIndex,img,exp) {
	state.questions[currentStateIndex] = {};
	state.questions[currentStateIndex].text = questionText;
	state.questions[currentStateIndex].choices = answers;
	state.questions[currentStateIndex].correctAnswerIndex = correctIndex;
	state.questions[currentStateIndex].image = img;
	state.questions[currentStateIndex].explainer = exp;
	state.questions[currentStateIndex].checkAnswer = function() {
		var choiceIndex = state.questions[state.current].choices.indexOf(choiceText);
		var correctIndex = state.questions[state.current].correctAnswerIndex;
		if(choiceIndex === correctIndex) {
			state.correct += 1;
			renderResultCorrect();
		} else {
			state.missed += 1;
			renderResultIncorrect();
		}
	};
	currentStateIndex +=1;
	
};

function addCorrect() {
	state.correct += 1;
}

function addMissed() {
	state.missed += 1;
}

function calculateRemaining() {
	state.remaining = 10 - (state.correct + state.missed);
}

//Rendering Functions
function renderQuestions(){
	if(state.current < 10) {	
		$('.next-button').attr('disabled','disable');
		$('.correct-display, .incorrect-display, .explainer').addClass('hidden');
		$('.quiz-question-text').text(state.questions[state.current].text);
		$('.answer-a, .answer-b, .answer-c, .answer-d').removeClass('hidden');
		$('.answer-a').find('p').text(state.questions[state.current].choices[0]);
		$('.answer-b').find('p').text(state.questions[state.current].choices[1]);
		$('.answer-c').find('p').text(state.questions[state.current].choices[2]);
		$('.answer-d').find('p').text(state.questions[state.current].choices[3]);
		$('.question-image').attr('src',state.questions[state.current].image);
	} else {
		$('.results-display').removeClass('hidden');
		$('.question-image, .quiz-question-text, .answer-a, .answer-b, .answer-c, .answer-d, .correct-display, .incorrect-display, .score-tracker, .next-button, .explainer').addClass('hidden');
		renderRank();
	}
};

function renderResultCorrect() {
	$('.answer-a, .answer-b, .answer-c, .answer-d').addClass('hidden');
	$('.correct-display').removeClass('hidden');
}

function renderResultIncorrect() {
	$('.answer-a, .answer-b, .answer-c, .answer-d').addClass('hidden');
	$('.incorrect-display').removeClass('hidden');
}

function renderExplainer() {
	$('.explainer').removeClass('hidden');
	$('.explainer-text').text(state.questions[state.current].explainer);
}

function renderScores() {
	$('.remaining').text(function() {
		return 'Remaining: ' + state.remaining
	})
	$('.current-question').text(function() {
		return 'Current Question: ' + (state.current + 1)
	})
}

function renderRank() {
	$('.rank').text(function() {
		{
		var text = 'Your Rank: ';
		switch(state.correct) {
			case 1:
			case 2:
				text += 'Peasant';
				break;
			case 3:
			case 4:
				text += 'Squire';
				break;
			case 5:
			case 6:
				text += 'Knight';
				break;
			case 7:
			case 8:
				text += 'Lord';
				break;
			case 9:
				text += 'King';
				break;
			case 10:
				text += 'Azor Ahai'
				break;
			default:
				text += 'not sure what you are';
		}
		return text;
	}
	})
	$('.summary').text(function() {
		return 'You Got ' + state.correct +' Out of ' + currentStateIndex + ' Correct';
	})
}

//Event Listeners
$('.answer-a, .answer-b, .answer-c, .answer-d').on('click', function() {
	choiceText = $(this).find('p').text();
	state.questions[state.current].checkAnswer();
	$('.next-button').removeAttr('disabled');
	$('.correct').text(function() {
		return 'Correct: ' + state.correct
	});
	$('.missed').text(function() {
		return 'Missed: ' + state.missed
	});
	renderExplainer();
})

$('.start-button').on('click', function() {
	$('.quiz-app').removeClass('hidden');
	$('.start-display').addClass('hidden');
});

$('.next-button').on('click', function() {
	state.current += 1;
	state.remaining -= 1;
	renderQuestions();
	renderScores();
})

//Question Generation
addQuestion('What house does Theon, ward of Eddard Stark, hail from?',
	['A. House Baratheon','B. House Greyjoy','C. House Tully','D. House Martell'],
	1,'images/theon.jpg','Theon is of House Greyjoy. He is the last living son of Balon Greyjoy.');
addQuestion('What was Khal Drogo\'s first gift to Danaerys on their wedding day?',
	['A. Three Dragon Eggs','B. A Valyrian Steel Necklace','C. A Silver Mare','D. A Scarlet Silk Gown'],
	2,'images/khal-drogo.jpg','Drogo\'s gift to Danarys was a silver mare. She received her dragon eggs from Illyrio Mopatis.');
addQuestion('What is the name of Arya\'s direwolf?',
	['A. Shaggy Dog','B. Lady','C. Summer','D. Nymeria'],
	3,'images/direwolf.jpg','Arya\'s direwolf is named Nymeria. Shaggy Dog belongs to Rickon, Lady to Sansa, and Summer to Bran.');
addQuestion('Where Does Samwell First Encounter Gilly?',
	['A. Castle Black','B. The Fist of the First Men','C. Craster\'s Keep','D. Deepwood Motte'],
	2,'images/gilly.jpg','Samwell first encounters Gilly at Craster\'s Keep.');
addQuestion('What are the words of House Baratheon?',
	['A. Winter is Coming','B. Unbowed, Unbent, Unbroken','C. Family, Duty, Honor','D. Our\'s is the Fury'],
	3,'images/baratheon.jpg','The words of house Baratheon are \"Our\'s is the Fury\". ');
addQuestion('What name does Jofferey give to the Valyrian steel sword gifted to him by his grandfather on his wedding day?',
	['A. Widow\'s Wail','B. Lion\'s Tooth','C. Heart Eater','D. Lion\'s Pride'],
	0,'images/joffrey.jpg','Jofferey\'s only Valyrian steel sword was Widow\'s Wail.');
addQuestion('What is the dominant religion in Westeros?',
	['A. The Old Gods','B. R\'hollor','C. The Seven','D. The Drowned God'],
	2,'images/religion.jpg','The dominant religion in Westeros is The Seven.');
addQuestion('Who uses a black fish as their personal sigil?',
	['A. Edmure Tully','B. Godwin Tully','C. Stephen Tully','D. Brynden Tully'],
	3,'images/blackfish.jpg','Brynden Tully uses a black fish as his sigil.');
addQuestion('Which song is played by the Freys during the slaughter at the Red Wedding?',
	['A. The Rains of Castamere','B. The Bear and the Maiden Fair','C. The Ballad of the Five Kings','D. The North Remembers'],
	0,'images/song.jpg','The Rains of Castamere was played during the slughter of the Starks.');
addQuestion('What disease does Shireen Baratheon have?',
	['A. Rot Gum','B. The Laughing Disease','C. Grey Scale','D. The Flux'],
	2,'images/shireen.jpg','Shireen Baratheon contracted Grey Scale during her infancy.');



