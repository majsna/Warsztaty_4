class Book{
	
	constructor(listSelector, isbn, title, author, publisher, type){
		
		this.bookListElem = $(listSelector);		
		this.id = 0;
		this.isbn = isbn;
		this.title = title;
		this.author = author;
		this.publisher = publisher;
		this.type = type;
	}
	
	deleteBook(elem){
		elem.on('click', function(){
			
		})		
	}

	
	createBookHtmlElem(){
		var newElem = $('<li>');		
		var titleElem = $('<span>', {class: 'title'}).text(this.title+' ');
		var delElem = $('<button>').text('Delete');
		//ukryte informacje:
		var divElem = $('<div>').css('display', 'none');
		var authorElem = $('<span>', {class: 'author'}).text('Author: '+this.author).css('display', 'block').css('font-style','italic').css('color','dimgrey');
		var publisherElem = $('<span>', {class: 'publisher'}).text('Publisher: '+this.publisher).css('display', 'block').css('font-style','italic').css('color','dimgrey');
		var typeElem = $('<span>', {class: 'type'}).text('Type: '+this.type).css('display', 'block').css('font-style','italic').css('color','dimgrey');
		var isbnElem = $('<span>', {class: 'isbn'}).text('ISBN: '+this.isbn).css('display', 'block').css('font-style','italic').css('color','dimgrey');
		var editElem = $('<button>').text('Edit');
		
		divElem.append(authorElem);
		divElem.append(publisherElem);
		divElem.append(typeElem);
		divElem.append(isbnElem);
		divElem.append(editElem);
		
		titleElem.on('click', function(e){
			if( titleElem.next().next().css('display') == 'none'){
				titleElem.next().next().css('display', 'block');			
			} else {
				titleElem.next().next().css('display', 'none');
			}
		});
		
//		delElem.on('click', function(){
//			var apiUrl = 'http://localhost:8282/books/remove/'+this.id;
//			$ajax({
//				url = apiUrl,
//				method: 'DELETE'
//			})
//			.done( function(response){
//				console.log('Book deleted successfully.');
//			})
//			.fail( function(response){
//				console.log(response);
//			})
//			
//		})
		
				
		newElem.append(titleElem).css('display', 'block');
		newElem.append(delElem);
		newElem.append(divElem);
				
		this.bookListElem.append(newElem);
	}
	

	
	save(){
		if(this.id != 0){
			this.update();
		}else{
			this.add();
		}
	}
	
	add(){
		var dataToSend = {
				
//				id: this.id,
				isbn: this.isbn,
				title: this.title,
				author: this.author,
				publisher: this.publisher,
				type: this.type
		};
		
		var apiUrl = 'http://localhost:8282/books/add';
//		console.log(this.title);
		var book = this;
		$.ajax({
			url: apiUrl,
			method: 'POST',
			data: JSON.stringify(dataToSend),
			dataType: 'json',
			contentType: 'application/json'
		})
		.done(function(){
			console.log('Book added successfully.');
		})
		.fail(function(response){
			if(response.status == 201){
				book.createBookHtmlElem();
				console.log('Error');				
			} else {
				console.log(error);
			}
		})
		
	}
	
	
	static loadBooksFromServer(){
		
		var apiUrl = 'http://localhost:8282/books/';
		
		$.ajax({
			url: apiUrl,
			dataType: 'json'
		})
		.done(function(response){
			response.forEach(function(el){
				var book = new Book('ul.bookList',
										el.isbn, 
										el.title, 
										el.author, 
										el.publisher, 
										el.type);
				book.createBookHtmlElem();
			});
			console.log(response);
		})
		.fail(function(response){
			console.log('Error');
		})
				
	}
	

	
	static formAction(selector){
		var formElem = $(selector);
		formElem.on('submit', function(event){
			event.preventDefault();
			var book = new Book( 'ul.bookList',
								formElem.find('[name=isbn]').val(),
								formElem.find('[name=title]').val(),
								formElem.find('[name=author]').val(),
								formElem.find('[name=publisher]').val(),
								formElem.find('[name=type]').val()
								);
			book.save();
			
		});
	}
	
	
	

	
}
