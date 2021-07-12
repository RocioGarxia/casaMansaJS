$(document).ready(function(){
    $("#arte").click(function(){
        $(".caja").animate({
            height: "200px",
            width: "500px",
            marginRight: "20px",
            marginTop: "50px",
            padding: "40px",
            fontSize: "40px",        
        
        }, 3000, function () {
                $(".caja").fadeOut (5000), 
                $(".caja").fadeIn (5000);  
                });
        
        });
    });

    $(document).ready(function(){
        $("#arte").click(function(){

            $(".linea").show (3000), 
            $(".linea").animate({
                height: "100px",
                width: "50px",
                marginLeft: "96.7%",
            }, 4500, function () {
                    $(".linea").fadeOut (3000); 
                    });
            
            });
        });
    
