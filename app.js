$(document).ready(function () {
    $(document).ready(function () {
        $.ajax({
            type: "GET",
            url: "http://127.0.0.1:5500/jsfile.csv",
            dataType: "text",
            success: function (data) { processData(data); }
        });
    });
});

var lines = [];
function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');

    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = {};
            for (var j = 0; j < headers.length; j++) {
                tarr = addToObject(tarr, headers[j], data[j]);
            }
            console.log(tarr);
            Liferay.Service('/foo.foo/dosomething',tarr,function (obj) {console.log(obj)});
            lines.push(tarr);
        }
    }
}

var addToObject = function (obj, key, value, index) {
    // Create a temp object and index variable
    var temp = {};
    var i = 0;
    // Loop through the original object
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            // If the indexes match, add the new item
            if (i === index && key && value) {
                temp[key] = value;
            }
            // Add the current item in the loop to the temp obj
            temp[prop] = obj[prop];
            // Increase the count
            i++;
        }
    }
    // If no index, add to the end
    if (!index && key && value) {
        temp[key] = value;
    }
    return temp;
};