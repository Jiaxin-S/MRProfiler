$(window).on('load', function () {
    $.ajax({
        url: 'http://localhost:9870/webhdfs/v1/user/hive/?user.name=hadoop&op=GETCONTENTSUMMARY&format=json',
        method: 'GET',
        crossDomain: true,
        dataType: 'json',
        beforeSend: function (request) {
            request.setRequestHeader('Access-Control-Allow-Origin', '*');
            request.setRequestHeader('Accept', 'application/json; charset=utf-8');
            request.setRequestHeader('Content-Type', 'application/json');
        },
        success: function (data) {
            console.log(data);
            $('.num-of-dirs').html(data['ContentSummary']['directoryCount']);
            $('.num-of-files').html(data['ContentSummary']['fileCount']);
            $('.space-used').html(data['ContentSummary']['length']);
        },
        error(xhr, textStatus, errorThrown) {
            console.log(xhr);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
});

function getDirectoryFileInfo(urlSuffix) {
    var updatedUrl = 'http://localhost:9870/webhdfs/v1/user/hive/' + urlSuffix + '?user.name=hadoop&format=json&op=LISTSTATUS_BATCH&startAfter=';
    $.ajax({
        url: updatedUrl,
        method: 'GET',
        crossDomain: true,
        dataType: 'json',
        beforeSend: function (request) {
            request.setRequestHeader('Access-Control-Allow-Origin', '*');
            request.setRequestHeader('Accept', 'application/json; charset=utf-8');
            request.setRequestHeader('Content-Type', 'application/json');
        },
        success: function (data) {
            console.log(data);
            $('.num-of-dirs').html(data['ContentSummary']['directoryCount']);
            $('.num-of-files').html(data['ContentSummary']['fileCount']);
            $('.space-used').html(data['ContentSummary']['length']);
        },
        error(xhr, textStatus, errorThrown) {
            console.log("Something went wrong!!");
            console.log(xhr);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

function generateDirectoryTree() {
    console.log("Generating Directory Tree...");
    var dirFileQueue = [];

    /**
     * TODO:
     * call /user/hive
     * loop through FileStatus:
     *     if type = DIRECTORY, record directory name, append each suffix to call queue
     *     if type = FILE, record file names
     *
     *     need to think through this more thoroughly
     */

}


$(document).ready(function() {

    // codes for testing js working with the front-end
    // $(".contentSummary button").click(function () {
    //     alert( "Handler for .click() called." );
    // });

    generateDirectoryTree();

});
