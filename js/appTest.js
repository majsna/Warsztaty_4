$(function(){

//	$.ajax({
//		url: 'http://date.jsontest.com/',
//		dataType: 'json'
//	})
//	.done(function(response){
//		var newEl = $('<div>').text(response.date);
//		$('body').append(newEl);
//	})
//	.fail(function(err){
//		console.log(err);
//	})
	
//	$.ajax({
//		url: 'https://swapi.co/api/people/4/',
//		method: 'GET',
//		dataType: 'json'
//	})
//	.done(function(response){
//		console.log(response);
//	})
//	.fail(function(resp){
//		console.log(resp);
//	})
	
	static loadBookById(id){
		
		var apiUrl = 'http://localhost:8282/books/'+id,
		
		$ajax({
			url: apiUrl,
			method: 'GET',
			dataType: 'json',
		})
		.done(function(response){
			var book = new Book('')
		})
	}
	
});
