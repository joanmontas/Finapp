$( function() {
    $( "#datepicker" ).datepicker({
      changeMonth: true,
      changeYear: true
    });
  });
  
  function removeallaccordiotitems() {
  // description: remove all the accordion items in the screen
  // will be useful if date picker changes
  $("#accordionExample").empty();
  }
  
  /*
  $("#addbutton").click(function(name,category,cost,id){
  newAccordian = '<div class="accordion-item">' + '<h2 class="accordion-header" id="headingOne"><button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Accordian Item</button></h2>'
                  + '<div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">' 
                  + '<div class="accordion-body">' +
                 '<form><label for="fname">Name:</label><br>' +
                 '<input type="text" id="fname" name="fname" value="John"><br>' +
                 '<label for="lname">Category:</label><br>'+
                 '<input type="text" id="lname" name="lname" value="Doe"><br><br>'+
                 '<label for="lname">Cost:</label><br>' + 
                 '<input type="number" id="lcost" name="lname" value="Doe"><br><br>' + 
                 '<input type="submit" value="Submit"></form>';
  
                 $('#accordionExample').append(newAccordian);
  });
  
  */
  
  var globalvar = null;