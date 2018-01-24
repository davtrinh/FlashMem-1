window.onload = function() {
	document.getElementById('backBtn').onclick = clearArray;

	//if (!data || data.path[1] == undefined) {
		setCategories();
	//} else {
	//	toCategory(data.path[2]);
	//}
}

function setCategories() 
{
	document.getElementById("categoryTitle").innerHTML = "Select Category";
	document.getElementById("backBtn").setAttribute("disabled", "disabled");
	firebase.database().ref("Categories").on("child_added", function(snapshot)
	{
		console.log(snapshot.key);
		var topic = snapshot.key;
		var div = document.getElementById("categoryContainer");
		var a = document.createElement("a");
		a.className = "btn btn-info";
		a.onclick = function() 
		{
			setSubCategories(topic);
		};
		a.innerHTML = topic;
		div.appendChild(a);
	});
}

function setSubCategories(topic) {
	document.getElementById('backBtn').removeAttribute("disabled");
	var div = document.getElementById('categoryContainer');
	clearButtons(div);
	console.log(topic);
	document.getElementById('categoryTitle').innerHTML = topic;
	firebase.database().ref("Categories").child(topic).on("child_added", function(snapshot) 
	{
		console.log(snapshot.key);
		var subtopic = snapshot.key;
		var a = document.createElement('a');
		a.className = "btn btn-info";
		a.onclick = function() 
		{
			window.location.href = "flashcard.html";
		};
		a.innerHTML = subtopic;
		div.appendChild(a);
	});
}

function clearButtons(div) 
{
	while (div.firstChild) 
	{
		div.removeChild(div.firstChild);
	}
}

function clearArray() 
{
	var div = document.getElementById("categoryContainer");
	clearButtons(div);
	document.getElementById("categoryTitle").innerHTML = "";
	setCategories();
}