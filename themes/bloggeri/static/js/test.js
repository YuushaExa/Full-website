 function testFunction() {
      var imagesrc = document.getElementsByClassName("title-image")[0].src;
      document.getElementsByTagName("html").innerHTML = '<img src="' + imagesrc + '" >';
    }
