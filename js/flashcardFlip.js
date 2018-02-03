var strPath = sessionStorage.getItem('path');
var i = 1;
var lastIndex = 1;

window.onload = function() 
{
	setCard();
	document.getElementById("prevBtn").setAttribute("disabled", "disabled");
}

function prev() 
{
	i--;
	var divQuestion = document.getElementById("question");
	var divAnswer = document.getElementById("answer");
	clearCard(divQuestion, divAnswer);
	setCard();
	document.getElementById("nextBtn").removeAttribute("disabled");
	if (i <= 1)
	{
		document.getElementById("prevBtn").setAttribute("disabled", "disabled");		
	}
}

function next()
{
	i++;
	var divQuestion = document.getElementById("question");
	var divAnswer = document.getElementById("answer");
	clearCard(divQuestion, divAnswer);
	setCard();
	document.getElementById("prevBtn").removeAttribute("disabled");
	if (i >= lastIndex)
	{
		document.getElementById("nextBtn").setAttribute("disabled", "disabled");		
	}
}

function clearCard(divQuestion, divAnswer)
{
	while (divQuestion.firstChild)
	{
		divQuestion.removeChild(divQuestion.firstChild);
	}

	while (divAnswer.firstChild)
	{
		divAnswer.removeChild(divAnswer.firstChild);
	}
}

function setCard()
{
	console.log(strPath);
	var path = firebase.database().ref(strPath);
	console.log("In set card");

	// Can be placed outside as a global variable with additional code?
	path.once('value', function(snapshot) 
		{ 
			lastIndex = snapshot.numChildren();
			if (lastIndex == 1) 
			{
				document.getElementById("nextBtn").setAttribute("disabled", "disabled");
			}
			//alert("This is the number of card: " + lastIndex);
		}
	);

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

