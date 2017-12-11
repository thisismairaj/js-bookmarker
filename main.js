var myForm = document.getElementById('myForm');


myForm.addEventListener('submit', saveBookmark);

function saveBookmark(e){
	var urlpassed = document.getElementById('url').value;
	var titlepassed = document.getElementById('title').value;

	var bookmark = {
		name: titlepassed,
		url: urlpassed
	}

	if(!urlpassed || !titlepassed){
		alert("Please fill in the form!");
		return false;
	}

	if(localStorage.getItem('bookmarks') === null){
		var bookmarks = [];

		bookmarks.push(bookmark);

		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		bookmarks.push(bookmark);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}
	// Re-Fetch Bookmarkss
	document.removeChild(outputBox);
	fetchBookmarks();
	// Prevent form from submitting
	e.preventDefault();
}

function deleteBookmark(url){
	bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	for (var i = 0; i < bookmarks.length;  i++) {
		if(bookmarks[i].url == url){
			bookmarks.splice(i, 1);
		}
	}
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	document.removeChild(outputBox);
	fetchBookmarks();
}


function fetchBookmarks(){
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	var outputBox = document.getElementById('outputBox');

	bookmarks.forEach(item => {
		var linkBox = document.createElement('div');
		linkBox.classList.add('card', 'col-sm-4', 'px-3');
		var linkBody = document.createElement('div');
		linkBody.classList.add('card-body');
		var linkTitle = document.createElement('div');
		linkTitle.classList.add('card-title');
		linkTitle.id = 'output-title';
		linkALink = document.createElement('a');
		linkALink.classList.add('output-url');
		linkButton = document.createElement('button');
		var t = document.createTextNode('Go To!');
		linkButton.classList.add('btn', 'btn-primary', 'mr-3');
		linkDelete = document.createElement('button');
		linkDelete.classList.add('btn', 'btn-danger');
		linkDelete.setAttribute('onclick', 'deleteBookmark(linkALink.href)');
		var tDelete = document.createTextNode('Delete');
		linkBox.appendChild(linkBody);
		linkBody.appendChild(linkTitle);
		linkBody.appendChild(linkALink);
		linkALink.appendChild(linkButton);
		linkButton.appendChild(t);
		linkBody.appendChild(linkDelete);
		linkDelete.appendChild(tDelete);

		outputBox.appendChild(linkBox);

		linkTitle.innerHTML = item.name,
		linkALink.href = item.url
	});
}
fetchBookmarks();