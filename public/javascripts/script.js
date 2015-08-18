$(document).ready(function(){
	var socket = io.connect('http://localhost:3000');

	$("#addForm").on("submit", function(){
		var product = $("#product").val();
		var merk = $("#merk").val();
		var type = $("#type").val();
		var foto = "/images/" + ($("#foto").val()).replace('C:\\fakepath\\', '');
		var prijs = $("#prijs").val();

		socket.emit("addProduct", {merk: merk, type: type, prijs: prijs, foto: foto, product: product});
		
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


	$("#bestel").on("submit", function(){
		var aantal = $("#aantal").val();
		var voornaam = $("#voornaam").val();
		var achternaam = $("#achternaam").val();
		var adres = $("#adres").val();

		socket.emit("addBestelling", {aantal: aantal, voornaam: voornaam, achternaam: achternaam, adres: adres});
		
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
			$('#product').prepend('<li><div class="product" data-user=""><h1>'+products[i].merk+'</h1><p>'+products[i].type+'</p><img src="'+products[i].foto+'"></img><p STYLE="font-size: 20px; color: red">'+"€ "+products[i].prijs+'</p><a id="meerInfo" href="/product?id='+products[i]._id+'">Meer info</a></div></li>'); 
			
		}
	});

	socket.on('detail', function(date){
       		$('#productdetail').prepend('<li><p><strong class="red">'+date.merk+'</strong>');
    });

});