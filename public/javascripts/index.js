$(document).ready(function(){
	var socket = io.connect('http://localhost:3000');

	$("#addForm").on("submit", function(){
		var product = $("#product").val();
		var merk = $("#merk").val();
		var type = $("#type").val();
		var foto = "/images/" + ($("#foto").val()).replace('C:\\fakepath\\', '');
		var specificaties = $("#specificaties").val();

		socket.emit("addSpot", {merk: merk, type: type, specificaties: specificaties, foto: foto, product: product});
		
		$(this).ajaxSubmit({
			error: function(xhr){
				status('Error: ' + xhr.status);
			},
			success: function(response){
				console.log(response);
			}
		});
		return false;
	});

	socket.on("printProducts", function(products){
		for(var i = 0; i < products.length; i++){
			$("#product").prepend('<li>'+products[i].specificaties+'</li>');
			$("#product").prepend('</br>');
			$("#product").prepend('<li>'+products[i].foto+'</li>');
			$("#product").prepend('</br>');
			$("#product").prepend('<li>'+products[i].type+'</li>');
			$("#product").prepend('</br>');
			$("#product").prepend('<li>'+products[i].merk+'</li>');
			$("#product").prepend('</br>');
		}
	});
});