var strPath = sessionStorage.getItem('path'); // Initialize location string for firebase database reference from previous webpage
var intIndex = 1; // Initialize card index count
var intLastIndex = 1; // Initialize end of card index

// Initialize card data onto webpage
window.onload = function() 
{
	setCard();
	document.getElementById("prevBtn").setAttribute("disabled", "disabled");
}

// Go back one card
function prev() 
{
	intIndex--;

	var divQuestion = document.getElementById("question");
	var divAnswer = document.getElementById("answer");

	clearCard(divQuestion, divAnswer);
	setCard();

	document.getElementById("nextBtn").removeAttribute("disabled"); // Enable the "Next" button

	// Check if the location of the card index is at the first card
	if (intIndex <= 1) // Index is at the first card
	{
		document.getElementById("prevBtn").setAttribute("disabled", "disabled"); // Disable the "Previous" button	
	}
}

// Go foward one card
function next()
{
	intIndex++;

	var divQuestion = document.getElementById("question");
	var divAnswer = document.getElementById("answer");

	clearCard(divQuestion, divAnswer);
	setCard();

	document.getElementById("prevBtn").removeAttribute("disabled"); // Enable the "Previous" button

	// Check if the location of the card index is higher than the total card amount
	if (intIndex >= intLastIndex) // Index is at the last card
	{
		document.getElementById("nextBtn").setAttribute("disabled", "disabled"); // Disable the "Next" button	
	}
}

// Clear all values inside both divs
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

// Set the card's question and answer values
function setCard()
{
	var path = firebase.database().ref(strPath);

	// Can be placed outside as a global variable with additional code?
	path.once('value', function(snapshot) 
		{ 
			intLastIndex = snapshot.numChildren(); // Count all children nodes

			// Check to see if there is only one card 
			if (intLastIndex == 1)  // There is only once card found
			{
				document.getElementById("nextBtn").setAttribute("disabled", "disabled"); // Disable the "Next" button
			}
		}
	);

	path = path.child("Card" + intIndex);
	var questionRef = path.child("Question");
	var answerRef = path.child("Answer");

	// Set the question value onto the card
	questionRef.once('value', function(snapshot)
	{
		var question = snapshot.val();
		var div = document.getElementById("question");
		var p = document.createElement("p");
		p.innerHTML = question;
		div.appendChild(p);
	});

	// Set the answer value onto the card
	answerRef.once('value', function(snapshot)
	{
		var answer = snapshot.val();
		var div = document.getElementById("answer");
		var p = document.createElement("p");
		p.innerHTML = answer;
		div.appendChild(p);
	});
} 

/* Find container of the card and add/remove the class "hover"
Using JQuery*/
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

