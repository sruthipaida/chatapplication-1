    $(document).ready(function() 
    {       
             
    	    var fe=cc('c');
    	    var param={fe:fe};
    	    setInterval(function(){AjaxTimer()},500);
    	    var counter=1;
    	    function AjaxTimer()
    	    { 
                  $.ajax(
                  {
                    url: "/chat",
                  	type: 'post',
                  	data:param,
               	  }).done(function(data) 
                  {  
                  	 $('#pmessage').val(data);
                  });
             
            }    
    	    $('#cemail').val(fe);
            var cg="";
            var te="";
            $('#cbutton').click(function()
            {  var regex = /^([a-zA-Z0-9.+-])+([_a-zA-Z0-9.+-])\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
               te=$('#cemail1').val();
               if(te=="")
               	alert("Enter email whom to send");
               else if(!(te.match(regex)))
    	          alert("please enter valid email id");
               else
               {	
                  var cm=$('#cmessage').val();
                  var params={fe:fe , te:te, msg:cm};
                  $.ajax(
                  {
                    url: "/chatbox",
                  	type: 'post',
                  	data:params,
               	  }).done(function(data) 
                  {
                    if(data=="")
                       alert("Email is not yet registered..");
                    else
                    {
                       var pm=$("#pmessage").val();
                       $('#pmessage').val(data);
                       $('#cmessage').val("");
                    }
                  });
               }
            });
    });        
 function cc(c)
         {
             var result = new RegExp("=([^&]*)", "i").exec(window.location.search); 
              return result && unescape(result[1]) || "";  
         }