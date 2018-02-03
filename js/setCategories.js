var strPath = "Categories";

window.onload = function() 
{
	document.getElementById('backBtn').onclick = resetCategories;
	initiateCategories();
}

function initiateCategories() 
{
	document.getElementById("categoryTitle").innerHTML = "Select Category";
	document.getElementById("backBtn").setAttribute("disabled", "disabled");
	setCategories(strPath);
}

function setSubCategories(subtopic) 
{
	document.getElementById('backBtn').removeAttribute("disabled");
	var div = document.getElementById('categoryContainer');
	clearButtons(div);
	document.getElementById('categoryTitle').innerHTML = subtopic;
	strPath += "/" + subtopic;
	setCategories(strPath);
}

function setCategories(path)
{
	firebase.database().ref(path).on("child_added", function(snapshot)
	{	
		var subtopic = snapshot.key;
		var div = document.getElementById("categoryContainer");
		var a = document.createElement("a");
		a.className = "btn btn-info";
		a.onclick = function() 
		{
			if (isLastCategory(path + "/" + subtopic))  
			{
				window.location.href = "flashcard.html";
				sessionStorage.setItem("path", strPath + "/" + subtopic);
			}
			else
			{
				setSubCategories(subtopic);
			}
		}
		a.innerHTML = subtopic;
		div.appendChild(a);
	});
}

function isLastCategory(path)
{
	var hasCard;
	firebase.database().ref(path).once("value", function(snapshot)
	{
		hasCard = snapshot.hasChild("Card1");
	});
	return hasCard;
}

function clearButtons(div) 
{
	while (div.firstChild) 
	{
		div.removeChild(div.firstChild);
	}
}

function resetCategories() 
{
	var div = document.getElementById("categoryContainer");
	document.getElementById("categoryTitle").innerHTML = firebase.database().ref(strPath).parent.key;
	strPath = strPath.substring(0, strPath.length - (firebase.database().ref(strPath).key.length) - 1);
	clearButtons(div);
	setCategories(strPath);
}