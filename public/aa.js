$(document).ready(function() 
    {
             var namea=null;
             $("#btn1").click(function() 
             {
                  $("#popupdiv").dialog(
                  {
                     title: "Registration Form",
                     width: 500,
                     height: 500,
                     modal: true,
                     buttons: {
                                Close: function() 
                                {
                                   $(this).dialog('close');
                                }
                              }
                  });
             });    
            $("#Sub1").click(function() 
            {
    	       var name = $("#name").val();
    	       var email = $("#email").val();
    	       var password = $("#password").val();
    	       var cpassword = $("#cpassword").val();
    	       var regex = /^([a-zA-Z0-9.+-])+([_a-zA-Z0-9.+-])\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;	
    	       var regex1=/^[a-zA-Z]/;
    	       if (name == '' || email == '' || password == '' || cpassword == '') 
                  alert("Please fill all fields...!!!!!!");
               else if(!(name.match(regex1)))
        	      alert("Please enter valid name...!");
    	       else if(!(email.match(regex)))
    	          alert("please enter valid email id");
    	       else if ((password.length) < 3) 
                  alert("Password should atleast 3 character in length...!!!!!!");
    	       else if (!((password)===(cpassword)) )
                  alert("Your passwords don't match. Try again?");
    	       else
    	       {
                	$('#name').val("");
    		        $('#email').val("");
	    	        $('#password').val("");
			        $('#cpassword').val("");            
		 	        $("#popupdiv").dialog('close');      
                    var tr;
                    tr=$('<tr/>');
                    tr.append("<td><input type='text' name='n' id='n' class='name' value="+name+" readonly/></td>");
                    tr.append("<td><input type='e' name='e' id='e' class='email' value="+email+" readonly/></td>");
                    tr.append("<td><input type='password' name=pwd id='pwd' class='id' value="+password+" readonly /></td>");
                    tr.append("<td><input type='button' id='b' name='show'class='b' value='show'/></td>");
                    $('.table').append(tr);
                    namea=name;
		       }
	        });
            $("#reset").click(function() 
            {
               $('#name').val("");
               $('#email').val("");
               $('#password').val(""); 
               $('#cpassword').val("");
            });
           $("#c").click(function() 
           {   
               if(namea==null)
                {
                    alert("you havent submit the form!!");
                }
               else
                    window.location.reload();
               namea=null;
           });
           populateTable();
           var $form = $('form');
           $form.submit(function()
           {
               $.post($(this).attr('action'), $(this).serialize(), function(response)
               {
               },'json');
               return false;
           });
          
           
    });
   function populateTable() 
   {
        var tableContent = '<tr><th>ID</th><th>Name</th><th>Email</th><th>Password</th></tr>';
        $.getJSON( '/userlogin1', function( data ) 
        {
            $.each(data, function()
            {
                tableContent += '<tr>';
                tableContent += '<td>' + this._id +' </td>';
                tableContent += '<td>' + this.n+ '</td>';
                tableContent += '<td>' + this.e + '</td>';
                tableContent += '<td>' + this.pwd + '</td>';
                tableContent += '</tr>';
            });
            $('.table').html(tableContent);
        });
   }
