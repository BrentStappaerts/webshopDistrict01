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
});