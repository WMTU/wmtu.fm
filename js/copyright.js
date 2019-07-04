// script to inject current year for copyright

function copyDate()
{
    date = new Date();
    year = date.getFullYear();

    $("#copydate").html("<p>&copy; " + year + " WMTU 91.9 FM Houghton, Michigan Technological University</p>");
}

copyDate();