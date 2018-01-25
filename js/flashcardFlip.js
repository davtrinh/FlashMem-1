var list;

window.onload = function() 
{
	var topic = sessionStorage.getItem("topic");
	var subTopic = sessionStorage.getItem("subTopic");
	var path = firebase.database().ref("Categories/" + topic + "/" + subTopic);

	path.on("value", function(snapshot)
	{
		console.log(snapshot.key);
		var question = snapshot.key;
		list = snapshot.val;
		document.getElementById("question").innerHTML = question;
		document.getElementById("answer").innerHTML = path;
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

