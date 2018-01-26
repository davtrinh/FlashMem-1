var topic = sessionStorage.getItem('topic');
var subtopic = sessionStorage.getItem('subtopic');
var i = 1;

window.onload = function() 
{
	setCard();
	document.getElementById("prevBtn").setAttribute("disabled", "disabled");
}

function prev() 
{
	i -= 1 ;
	clearCard();
	setCard();
	document.getElementById("nextBtn").removeAttribute("disabled");
	if (i <= 1)
	{
		document.getElementById("prevBtn").setAttribute("disabled", "disabled");
	}
}

function next()
{
	i += 1;
	clearCard();
	setCard();
	document.getElementById("prevBtn").removeAttribute("disabled");
	if (i >= 3)
	{
		document.getElementById("nextBtn").setAttribute("disabled", "disabled");		
	}
}

function setCard()
{
	var path = firebase.database().ref("Categories/" + topic + "/" + subtopic);
	path = path.child("Card" + i);
	var questionRef = path.child("Question");
	var answerRef = path.child("Answer");
	questionRef.once('value', function(snapshot)
	{
		var question = snapshot.val();
		var div = document.getElementById("question");
		var p = document.createElement("p");
		p.innerHTML = question;
		div.appendChild(p);
	});
	answerRef.once('value', function(snapshot)
	{
		var question = snapshot.val();
		var div = document.getElementById("answer");
		var p = document.createElement("p");
		p.innerHTML = question;
		div.appendChild(p);
	});
}

function clearCard()
{
	var divQuestion = document.getElementById("question");
	var divAnswer = document.getElementById("answer");

	while (divQuestion.firstChild)
	{
		divQuestion.removeChild(divQuestion.firstChild);
	}

	while (divAnswer.firstChild)
	{
		divAnswer.removeChild(divAnswer.firstChild);
	}
}

function rotateCard(btn)
{
    var $card = $(btn).closest('.card-container');
    console.log($card);
    
    if($card.hasClass('hover')){
        $card.removeClass('hover');
    } 
    else 
    {
        $card.addClass('hover');
    }
}

