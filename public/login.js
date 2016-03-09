 $(document).ready(function() 
 {
           $('#lbutton').click(function()
           { 
               var lusername=$('#lusername').val();
               var lpassword=$('#lpassword').val();
               var params={lusername:lusername , lpassword:lpassword};
    // add rest = true and jsonp = true to /etc/mongodb.conf, 
    // then restart mongodb
               $.ajax(
               {
                  url: "/login",
                  type: 'post',
                  data:params,
               }).done(function(data) 
               {
                  if(data=="")
                     alert("login ID or Password wrong");
                  else
                  {
                     window.location.replace('chat.html?c='+lusername);
                  }
               });
            });
 });