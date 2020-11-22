$(document).ready(function(){

    $("button").click(function(){

        $.ajax({
            url: 'http://localhost:9870/webhdfs/v1/user/hive/test?user.name=hadoop&op=GETCONTENTSUMMARY',
            type: 'GET',
            headers: {'Access-Control-Allow-Origin': '*'},
            crossDomain: true,
            success: function(data){
                console.log(data);
            },
            error: function(xhr,textStatus,errorThrown){
                console.log('Error Something');
                console.log(xhr);
                console.log(textStatus);
                console.log(errorThrown);
            },
        });

    });

});