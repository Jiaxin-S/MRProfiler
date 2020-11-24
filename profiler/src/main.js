
function getContentSummary() {
    $.ajax({
        url: 'http://localhost:9870/webhdfs/v1/user/hive/test?user.name=hadoop&op=GETCONTENTSUMMARY&format=json',
        method: 'GET',
        crossDomain: true,
        dataType: 'json',
        beforeSend: function(request) {
            request.setRequestHeader('Access-Control-Allow-Origin', '*');
            request.setRequestHeader('Accept', 'application/json; charset=utf-8');
            request.setRequestHeader('Content-Type', 'application/json');
        },
        success: function(data) {
            console.log(data);
            console.log(typeof data);
            console.log(data['ContentSummary']['length']);

        },
        error(xhr, textStatus, errorThrown) {
            console.log('Error Something');
            console.log(xhr);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

$(document).ready(function(){

    $("button").click(function(){
        getContentSummary();
    });

});
