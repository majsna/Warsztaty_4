$(function(){
	//loading books from server
	var $bookList = $('.bookList');
	var $formElem = $('form');
	var $delButtons = $('.remove');
//	var $titleElems = $('p').addClass('showDetails');
	
	function addBook(book){
		var $newLi = $('<li>');
		var $newP = $('<p>', {class: 'showDetails'}).text(book.title).attr('data-id', book.id);
		var $newDel = $('<button>', {class: 'remove'}).text('Delete').attr('data-id', book.id);
		var $newDiv = $('<div>', { class: book.id });
		$newLi.append($newP);
		$newLi.append($newDel);
		$newLi.append($newDiv);
		
		$bookList.append($newLi);
		
	}
		
	$.ajax({
		url: 'http://localhost:8282/books/',
		method: 'GET'		
	})
	.done(function(books){
		$.each(books, function(i, book){
			addBook(book);
		});
	})
	.fail(function(){
		alert('error loading books');
	})
	
	//posting new books to the server	
	$formElem.on('submit', function(){
		
		event.preventDefault();
		
		var book = {			
				isbn: $formElem.find('[name=isbn]').val(),
				title: $formElem.find('[name=title]').val(),
				author: $formElem.find('[name=author]').val(),
				publisher: $formElem.find('[name=publisher]').val(),
				type: $formElem.find('[name=type]').val()
		};
		
		$.ajax({
			url: 'http://localhost:8282/books/add',
			method: 'POST',
			data: JSON.stringify(book),
			dataType: 'json',
			contentType: 'application/json'
		})
		.done(function(newBook){
			addBook(newBook);
		})
		.fail(function(response){
//			alert('error saving book');
			console.log(response);
		})
		
	});
	
	//deleting books
	$bookList.delegate('.remove', 'click', function(){
		
		var $li = $(this).closest('li');
		
		$.ajax({
			url: 'http://localhost:8282/books/remove/'+$(this).attr('data-id'),
			method: 'DELETE',
		})
		.done(function(){
			$li.fadeOut(300, function(){
				$(this).remove();
			});
		})
		
	})
	
	//loading book by Id
	var $titleElems = $('ul').find('.showDetails');
	console.log($titleElems);
	//TODO
	function addBookDetails(book){
		$newUl = $('<ul>').css('list-style-type', 'circle');
		$newAuthor = $('<li>').text(book.author);
		$newId = $('<li>').text(book.id);
		$newPublisher = $('<li>').text(book.publisher);
		$newType = $('<li>').text(book.type);
		$newIsbn = $('<li>').text(book.isbn);
		$newEdit = $('<button>').text('Edit');
		
		$newUl.append($newAuthor);
		$newUl.append($newId);
		$newUl.append($newPublisher);
		$newUl.append($newType);
		$newUl.append($newIsbn);
		$newUl.append($newEdit);
		
		return $newUl;
	}
	
	$bookList.delegate('.showDetails','click', function(){
		
		if($(this).data('clicked')) {
			return;
		}
		
		var $div = $(this).next().next(); 
		
		$.ajax({
			url: 'http://localhost:8282/books/'+$(this).attr('data-id'),			
		})
		.done(function(book){
	
				$div.append( addBookDetails(book) );
	
		})
		
		$(this).data('clicked', true);
		
	})
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});
