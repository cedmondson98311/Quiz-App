//Global State Object
var state = {
	questions: [
		//index:0
		{text:'What house does Theon, ward of Eddard Stark, hail from?',
		 choices:['House Baratheon','House Greyjoy','House Martell','House Tully'],
		 correctAnswerIndex:1,
		 displayed:false,
		 checkAnswer: function(correctIndex,submittedAnswer) {

		 },
		 display: function() {
		 	this.displayed=true;
		 	renderQuestions();
		 }
		},
		//index:1
		{text:'What house does Theon, ward of Eddard Stark, hail from?',
		 choices:['House Baratheon','House Greyjoy','House Martell','House Tully'],
		 correctAnswerIndex:1,
		 displayed:false,
		 checkAnswer: function(correctIndex,submittedAnswer) {

		 },
		 display: function() {
		 	this.displayed=true;
		 	renderQuestions();
		 }
		}
		],
	correct: 0,
	missed: 0,
	remaining: 10
}

//State Modification Functions
function changeState() {

}

//Rendering Functions

function renderQuestions(question){

}

//Event Listeners

function submitAnswer() {

}

$('button').on('click', function() {
	console.log('event triggered');
	$('.quiz-app').removeClass('hidden');
	$('.start-display').addClass('hidden');
});




