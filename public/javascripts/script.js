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

	socket.on("printProducts", function(products){
		for(var i = 0; i < products.length; i++){
			$('#product').prepend('<li><div class="product" data-user="">'+products[i].product+'<h1>'+products[i].merk+'</h1><p>'+products[i].type+'</p><img src="'+products[i].foto+'"></img><p STYLE="font-size: 20px; color: red">'+"€ "+products[i].prijs+'</p><a id="meerInfo" href="/product?id='+products[i]._id+'">Meer info</a></div></li>'); 
		}
	});

	socket.on('detail', function(data){
       		$('#productdetail').prepend('<li><h1>'+data[0].merk+'</h1><p>'+data[0].type+'<p STYLE="font-size: 20px; color: red">'+"€ "+data[0].prijs+'</p><img src="'+data[0].foto+'"></img></li>');
    });

	socket.on('printOrders', function(data){
		for(var i = 0; i < data.length; i++){
			$('#bestelling').prepend('<li style="display:block;">ProductID: '+ data[i].productid +'</a> </br> Aantal: '+data[i].aantal+'<hr></li>');
		}
	});

	socket.on("printBestelling", function(products){
		for(var i = 0; i < products.length; i++){
			$('#bestellingen').prepend('<li><div class="bestellingen" data-user="">ProductID: '+products[i].productid+' </br> Aantal: '+products[i].aantal+' </br> Naam: '+products[i].naam+'</br> Adres: '+products[i].adres+'</div></br></li>'); 
		}
	});




});