// update statuspage information

function updateStatus()
{
    var status = "";
    var indicators = 
    [
        {type: "none",                 color: "#2fcc66"},
        {type: "minor",                color: "#f1c40f"},
        {type: "major",                color: "#e67e22"},
        {type: "maintenance",          color: "#3498DB"}
    ]

    // statuspage colors
    // green: #2fcc66
    // yellow: #f1c40f
    // orange: #e67e22
    // red: #e74c3c
    // blue: #3498DB

    function parseStatus(data)
    {
        // get the current status
        status = data.status.description;
        type = data.status.indicator;

        // update the page
        for ( var i = 0; i < indicators.length; i++ )
        {
            if ( type == indicators[i].type )
            {
                $("#status").css('background', indicators[i].color);
            }
        }
        $("#status_desc").text("Current WMTU Status: " + status);
    }

    // get the current status rollup
    $.get('https://n0pg6brf8r04.statuspage.io/api/v2/status.json', parseStatus);

    // update every 10 minutes
    setTimeout(updateStatus, 600000);
}

updateStatus();