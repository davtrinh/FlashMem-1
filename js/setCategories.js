var strPath = "Categories"; // Initialize location string for firebase database reference

// Initialize the back button and category buttons
window.onload = function() 
{
	document.getElementById('backBtn').onclick = resetCategories;
	initiateCategories();
}

// Set element attributes and call setCategories function
function initiateCategories() 
{
	document.getElementById("categoryTitle").innerHTML = "Select Category";
	document.getElementById("backBtn").setAttribute("disabled", "disabled");

	setCategories(strPath);
}

// Remove parent categories and initialize sub categories based on the subtopic value passed 
function initiateSubCategories(subtopic) 
{
	document.getElementById('backBtn').removeAttribute("disabled");
	document.getElementById('categoryTitle').innerHTML = subtopic;
	var div = document.getElementById('categoryContainer');
	strPath += "/" + subtopic; // Updated location string with subtopic

	clearButtons(div);
	setCategories(strPath);
}

// Initialize sub categories based on the string path (firebase database location)
function setCategories(path)
{
	firebase.database().ref(path).on("child_added", function(snapshot)  // Reference all child nodes 
	{	
		var subtopic = snapshot.key;
		var div = document.getElementById("categoryContainer");
		var a = document.createElement("a");
		a.className = "btn btn-info";
		
		// Set the onclick path to either reiterate sub categories or open the flashcard webpage
		a.onclick = function()
		{
			if (isLastCategory(path + "/" + subtopic)) // Subtopic is the last parent node category
			{
				window.location.href = "flashcard.html";
				sessionStorage.setItem("path", strPath + "/" + subtopic); 
			}
			else // Subtopic is not the last parent category
			{
				initiateSubCategories(subtopic);
			}
		}

		a.innerHTML = subtopic;
		div.appendChild(a);
	});
}

// Check if firebase location is the last parent category
function isLastCategory(path)
{
	var hasCard; // Initialize boolean

	firebase.database().ref(path).once("value", function(snapshot) // Reference snapshot
	{	
		hasCard = snapshot.hasChild("Card1");
	});
	return hasCard; // Return boolean value
}

// Removes all child elements in parameter div
function clearButtons(div) 
{
	while (div.firstChild) // Loops until there are no more child elements
	{
		div.removeChild(div.firstChild);
	}
}

// Go back one level in firebase database location and initialize categories
function resetCategories() 
{
	var div = document.getElementById("categoryContainer");
	document.getElementById("categoryTitle").innerHTML = firebase.database().ref(strPath).parent.key;
	strPath = strPath.substring(0, strPath.length - (firebase.database().ref(strPath).key.length) - 1); // Removes the last known subtopic from location string 

	clearButtons(div);
	setCategories(strPath);
	console.log(firebase.database().ref(strPath).key);
	if (firebase.database().ref(strPath).key == "Categories") 
	{
		document.getElementById("backBtn").setAttribute("disabled", "disabled");
	};
}