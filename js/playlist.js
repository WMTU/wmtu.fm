// song parser to display the song list

// variables to save current song and album to
var c_song    = "";
var c_artist  = "";
var c_album   = "";
var c_artwork = "";

var nowPlaying = function()
{
    // initial variables
    var song_data = { song: "Song", artist: "Artist", album: "Album", artwork: "", ts: 0 };

    // parse out song data
    function parseSongData(data)
    {
        song_data.song    = data[0].song;
        song_data.artist  = data[0].artist;
        song_data.album   = data[0].album;
        song_data.artwork = data[0].artwork;
        song_data.ts      = Date.parse(data[0].timestamp);

        if ( song_data.artwork == "" ) { song_data.artwork = "https://wmtu.fm/img/default_artwork.png" }

        // check if it's the same song, if not add it to the playlist
        if ( song_data.song != c_song || song_data.artist != c_artist || song_data.album != c_album )
        {
            // set current data
            c_song    = song_data.song;
            c_artist  = song_data.artist;
            c_album   = song_data.album;
            c_artwork = song_data.artwork;

            // set now playing song
            $("div#np_song").text(song_data.song);

            // set now playing artist
            $("div#np_artist").text(song_data.artist);

            // set now playing album
            $("div#np_album").text(song_data.album);

            // set the album artwork
            $("div#np_artwork").html('<img src="' + song_data.artwork + '" alt="Now Playing Artwork" width="100%" height="100%" style="border: 0; border-radius: .5rem;">');

            // log song data
            console.log("\nNow Playing");
            console.log("Song:    " + song_data.song);
            console.log("Artist:  " + song_data.artist);
            console.log("Album:   " + song_data.album);
            console.log("Artwork: " + song_data.artwork);
        }
    }

    // get current playing song info and send it to function
    $.get('https://log.wmtu.fm/api/2.0/history', {n: 1, delay: false}, parseSongData);

    // update every 5 seconds
    setTimeout(nowPlaying, 5000);
}

nowPlaying();