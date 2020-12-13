$(window).on('load', function () {

    // for directory content
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

    // for resource manager: http://localhost:8088/ws/v1/cluster/info
    $.ajax({
        url: 'http://localhost:8088/ws/v1/cluster/info?user.name=hadoop',
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
            $('.cluster-id').html(data['clusterInfo']['id']);
            $('.cluster-state').html(data['clusterInfo']['state']);
            $('.cluster-start-time').html(data['clusterInfo']['startedOn']);
            $('.cluster-ha-state').html(data['clusterInfo']['haState']);
            $('.rm-state-store-name').html(data['clusterInfo']['rmStateStoreName']);
            $('.rm-version').html(data['clusterInfo']['resourceManagerVersion']);
            $('.rm-build-version').html(data['clusterInfo']['resourceManagerBuildVersion']);
            $('.rm-version-built-on').html(data['clusterInfo']['resourceManagerVersionBuiltOn']);
            $('.hadoop-version').html(data['clusterInfo']['hadoopVersion']);
            $('.hadoop-build-version').html(data['clusterInfo']['hadoopBuildVersion']);
            $('.hadoop-version-built-on').html(data['clusterInfo']['hadoopVersionBuiltOn']);
        },
        error(xhr, textStatus, errorThrown) {
            console.log(xhr);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });

    // for node manager: http://localhost:8042/ws/v1/node/info
    $.ajax({
        url: 'http://localhost:8042/ws/v1/node/info?user.name=hadoop',
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
            $('.node-id').html(data['nodeInfo']['id']);
            $('.node-healthy-status').html(data['nodeInfo']['nodeHealthy']);
            $('.node-host-name').html(data['nodeInfo']['nodeHostName']);
            $('.nm-startup-time').html(data['nodeInfo']['nmStartupTime']);
            $('.last-node-update-time').html(data['nodeInfo']['lastNodeUpdateTime']);
            $('.nm-version').html(data['nodeInfo']['nodeManagerVersion']);
            $('.nm-build-version').html(data['nodeInfo']['nodeManagerBuildVersion']);
            $('.nm-version-built-on').html(data['nodeInfo']['nodeManagerVersionBuiltOn']);

        },
        error(xhr, textStatus, errorThrown) {
            console.log(xhr);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });

    // line chart
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',

        // The data for our dataset
        data: {
            labels: ['19:20', '19:21', '19:22', '19:23', '19:24', '19:25', '19:26', '19:27', '19:28', '19:29'],
            datasets: [{
                label: 'Capacity Remaining',
                backgroundColor: 'rgb(54, 162, 235, 0.2)',
                borderColor: 'rgb(153, 102, 255, 0.2)',
                data: [20000, 12270, 12270, 12270, 8955, 8955, 8955, 12270, 12270, 12270]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });

    var ctx2 = document.getElementById('myChart2').getContext('2d');
    var myChart2 = new Chart(ctx2, {
        type: 'line',

        // The data for our dataset
        data: {
            labels: ['19:20', '19:21', '19:22', '19:23', '19:24', '19:25', '19:26', '19:27', '19:28', '19:29'],
            datasets: [{
                label: 'Capacity Consumed',
                backgroundColor: 'rgb(75, 192, 192, 0.2)',
                borderColor: 'rgb(255, 159, 64, 0.2)',
                data: [0, 7730, 7730, 7730, 11045, 11045, 11045, 7730, 7730, 7730]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
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
    // console.log("Generating Directory Tree...");
    // var dirFileQueue = [];

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
    getLineChart()

});
