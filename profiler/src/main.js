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
            let space_used = parseInt(data['ContentSummary']['length'])/Math.pow(10, 9);
            console.log(space_used);
            $('.space-used').html(space_used.toString());
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

function generateDiagramData() {

    let timestamp_arr = [];
    let filesCount_arr = [];
    let spaceConsumed_arr = [];
    let spaceRemained_arr = [];
    let throughput_arr = [];
    let curr_throughput = 0;

    jQuery.get('diagram_1gb.txt', function (data) {

        let lines = data.split("\n");

        $.each(lines, function (n, elem) {
            let index = elem.indexOf(" ");  // Gets the first index where a space occours
            let curr_timestamp = elem.substr(0, index); // Gets the first part
            let json_string = elem.substr(index + 1);  // Gets the text part
            let json_obj = JSON. parse(json_string);
            // console.log(curr_timestamp);
            // console.log(json_string);
            // console.log(json_obj['ContentSummary']['fileCount']);
            // console.log(json_obj['ContentSummary']['spaceConsumed']);
            timestamp_arr.push(curr_timestamp);
            let fileCount_val = parseInt(json_obj['ContentSummary']['fileCount']);
            let spaceConsumed_val = parseInt(json_obj['ContentSummary']['spaceConsumed'])/Math.pow(10, 6);
            let spaceRemained_val = 5 * Math.pow(10, 3) - spaceConsumed_val; // assume total capacity = 5 GB
            filesCount_arr.push(fileCount_val);
            spaceConsumed_arr.push(spaceConsumed_val);
            spaceRemained_arr.push(spaceRemained_val);
            throughput_arr.push(spaceConsumed_val - curr_throughput);
            curr_throughput = spaceConsumed_val;
        });

        console.log(timestamp_arr);
        // console.log(filesCount_arr);
        console.log(spaceConsumed_arr);
    });

    let result = new Map();
    result['timestamp_arr'] = timestamp_arr;
    result['filesCount_arr'] = filesCount_arr;
    result['spaceConsumed_arr'] = spaceConsumed_arr;
    result['spaceRemained_arr'] = spaceRemained_arr;
    result['throughput_arr'] = throughput_arr;
    return result;
}

$(document).ready(function() {

    // codes for testing js working with the front-end
    // $(".contentSummary button").click(function () {
    //     alert( "Handler for .click() called." );
    // });

    let data_arr = generateDiagramData();
    let timestamp_arr = data_arr['timestamp_arr'];
    let filesCount_arr = data_arr['filesCount_arr'];
    let spaceConsumed_arr = data_arr['spaceConsumed_arr'];
    let spaceRemained_arr = data_arr['spaceRemained_arr'];
    let throughput_arr = data_arr['throughput_arr'];

    console.log(timestamp_arr);
    console.log(filesCount_arr);
    console.log(spaceConsumed_arr);
    console.log(spaceRemained_arr);
    console.log(throughput_arr);

    // line chart
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',

        // The data for our dataset
        data: {
            labels: [
                "18:47:32",
                "18:47:33",
                "18:47:34",
                "18:47:35",
                "18:47:36",
                "18:47:37",
                "18:47:38",
                "18:47:39",
                "18:47:40",
                "18:47:41",
                "18:47:42",
                "18:47:43",
                "18:47:44",
                "18:47:45",
                "18:47:46",
                "18:47:47",
                "18:47:48",
                "18:47:49",
                "18:47:50",
                "18:47:51",
                "18:47:52",
                "18:47:53",
                "18:47:54",
                "18:47:55"
            ],
            datasets: [{
                label: 'Capacity Remaining',
                backgroundColor: 'rgb(54, 162, 235, 0.2)',
                borderColor: 'rgb(153, 102, 255, 0.2)',
                data: [
                    3955.407795,
                    3955.407795,
                    3955.407795,
                    3717.756171,
                    3642.883899,
                    3299.5761709999997,
                    3195.031171,
                    2985.941171,
                    2881.396171,
                    2910.918898,
                    2776.70117,
                    2776.70117,
                    2642.483442,
                    2508.265714,
                    2463.06617,
                    2328.848442,
                    2194.630714,
                    2149.43117,
                    2015.2134420000002,
                    1880.9957140000001,
                    1836.7572730000002,
                    1866.4300010000002,
                    2910.918898,
                    2910.918898
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Megabyte(s)'
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero:true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Timestamp'
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
            labels: [
                "18:47:32",
                "18:47:33",
                "18:47:34",
                "18:47:35",
                "18:47:36",
                "18:47:37",
                "18:47:38",
                "18:47:39",
                "18:47:40",
                "18:47:41",
                "18:47:42",
                "18:47:43",
                "18:47:44",
                "18:47:45",
                "18:47:46",
                "18:47:47",
                "18:47:48",
                "18:47:49",
                "18:47:50",
                "18:47:51",
                "18:47:52",
                "18:47:53",
                "18:47:54",
                "18:47:55"
            ],
            datasets: [{
                label: 'Capacity Consumed',
                backgroundColor: 'rgb(75, 192, 192, 0.2)',
                borderColor: 'rgb(255, 159, 64, 0.2)',
                data: [
                    1044.592205,
                    1044.592205,
                    1044.592205,
                    1282.243829,
                    1357.116101,
                    1700.423829,
                    1804.968829,
                    2014.058829,
                    2118.603829,
                    2089.081102,
                    2223.29883,
                    2223.29883,
                    2357.516558,
                    2491.734286,
                    2536.93383,
                    2671.151558,
                    2805.369286,
                    2850.56883,
                    2984.786558,
                    3119.004286,
                    3163.242727,
                    3133.569999,
                    2089.081102,
                    2089.081102
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Megabyte(s)'
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero:true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Timestamp'
                    }
                }]
            }
        }
    });

    var ctx3 = document.getElementById('myChart3').getContext('2d');
    var myChart3 = new Chart(ctx3, {
        type: 'line',

        // The data for our dataset
        data: {
            labels: [
                "18:47:32",
                "18:47:33",
                "18:47:34",
                "18:47:35",
                "18:47:36",
                "18:47:37",
                "18:47:38",
                "18:47:39",
                "18:47:40",
                "18:47:41",
                "18:47:42",
                "18:47:43",
                "18:47:44",
                "18:47:45",
                "18:47:46",
                "18:47:47",
                "18:47:48",
                "18:47:49",
                "18:47:50",
                "18:47:51",
                "18:47:52",
                "18:47:53",
                "18:47:54",
                "18:47:55"
            ],
            datasets: [{
                label: 'Throughput Over Time',
                backgroundColor: 'rgb(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 206, 86, 0.2)',
                data: [
                    1044.592205,
                    0,
                    0,
                    237.65162400000008,
                    74.87227200000007,
                    343.307728,
                    104.54499999999985,
                    209.09000000000015,
                    104.54500000000007,
                    -29.52272700000003,
                    134.21772800000008,
                    0,
                    134.21772799999962,
                    134.21772800000008,
                    45.19954400000006,
                    134.21772800000008,
                    134.21772800000008,
                    45.19954400000006,
                    134.21772799999962,
                    134.21772800000008,
                    44.238440999999966,
                    -29.672728000000006,
                    -1044.4888969999997,
                    0
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'MB per Second'
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero:true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Timestamp'
                    }
                }]
            }
        }
    });

    var ctx4 = document.getElementById('myChart4').getContext('2d');
    var myChart4 = new Chart(ctx4, {
        type: 'line',

        // The data for our dataset
        data: {
            labels: [
                "18:47:32",
                "18:47:33",
                "18:47:34",
                "18:47:35",
                "18:47:36",
                "18:47:37",
                "18:47:38",
                "18:47:39",
                "18:47:40",
                "18:47:41",
                "18:47:42",
                "18:47:43",
                "18:47:44",
                "18:47:45",
                "18:47:46",
                "18:47:47",
                "18:47:48",
                "18:47:49",
                "18:47:50",
                "18:47:51",
                "18:47:52",
                "18:47:53",
                "18:47:54",
                "18:47:55"
            ],
            datasets: [{
                label: 'Files Total',
                backgroundColor: 'rgb(255, 206, 86, 0.2)',
                borderColor: 'rgb(255, 99, 132, 0.2)',
                data: [
                    7,
                    7,
                    7,
                    9,
                    10,
                    13,
                    14,
                    16,
                    17,
                    17,
                    18,
                    18,
                    18,
                    18,
                    19,
                    19,
                    19,
                    20,
                    20,
                    20,
                    21,
                    21,
                    17,
                    17
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'File Count(s)'
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero:true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Timestamp'
                    }
                }]
            }
        }
    });

    var ctx5 = document.getElementById('myChart5').getContext('2d');
    var myChart5 = new Chart(ctx5, {
        type: 'line',

        // The data for our dataset
        data: {
            labels: [
                "18:47:32",
                "18:47:33",
                "18:47:34",
                "18:47:35",
                "18:47:36",
                "18:47:37",
                "18:47:38",
                "18:47:39",
                "18:47:40",
                "18:47:41",
                "18:47:42",
                "18:47:43",
                "18:47:44",
                "18:47:45",
                "18:47:46",
                "18:47:47",
                "18:47:48",
                "18:47:49",
                "18:47:50",
                "18:47:51",
                "18:47:52",
                "18:47:53",
                "18:47:54",
                "18:47:55"
            ],
            datasets: [{
                label: 'Total Load',
                backgroundColor: 'rgb(153, 102, 255, 0.2)',
                borderColor: 'rgb(75, 192, 192, 0.2)',
                data: [
                    1044.592205,
                    1044.592205,
                    1044.592205,
                    1282.243829,
                    1357.116101,
                    1700.423829,
                    1804.968829,
                    2014.058829,
                    2118.603829,
                    2089.081102,
                    2223.29883,
                    2223.29883,
                    2357.516558,
                    2491.734286,
                    2536.93383,
                    2671.151558,
                    2805.369286,
                    2850.56883,
                    2984.786558,
                    3119.004286,
                    3163.242727,
                    3133.569999,
                    2089.081102,
                    2089.081102
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Megabyte(s)'
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero:true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Timestamp'
                    }
                }]
            }
        }
    });

});
