// song parser to display the song list

// variables to save current song and album to
var c_song   = "";
var c_artist = "";
var c_album  = "";
var c_artwork = "";

var nowPlaying = function()
{
    // initial variables
    var song_data = { song: "Song", artist: "Artist", album: "Album", ts: 0 };
    var c_new = 0;

    // parse out song data
    function parseSongData(data)
    {
        song_data.song = data.songs[0].title;
        song_data.artist = data.songs[0].artist;
        song_data.album = data.songs[0].album;
        song_data.ts = Date.parse(data.songs[0].timestamp);

        // check if it's the same song, if not add it to the playlist
        if ( song_data.song != c_song || song_data.artist != c_artist || song_data.album != c_album )
        {
            // set current data
            c_song   = song_data.song;
            c_artist = song_data.artist;
            c_album  = song_data.album;
            c_new = 1;

            // set now playing song
            $("div#np_song").text(song_data.song);

            // set now playing artist
            $("div#np_artist").text(song_data.artist);

            // set now playing album
            $("div#np_album").text(song_data.album);

            // log song data
            console.clear();
            console.log("\nNow Playing");
            console.log("Song:   " + song_data.song);
            console.log("Artist: " + song_data.artist);
            console.log("Album:  " + song_data.album);
        }
        else
        {
            c_new = 0;
        }
    }

    function parseArtworkURL(url_data)
    {
        // get album artwork for current song
        if ( c_artwork != url_data.url )
        {
            c_artwork = url_data.url;
            
            // set the album art from the artwork fetcher
            $("div#np_artwork").html('<img src="' + c_artwork + '" alt="Now Playing Artwork" width="100%" height="100%" style="border: 0; border-radius: .5rem;">');
        }
    }

    // get current playing song info and send it to function
    $.get('https://proxy.wmtu.fm/log/api/v1.0/songs', {n: 1, desc: true, delay: false}, parseSongData);

    // get artwork url and set the np artwork
    $.get('https://proxy.wmtu.fm/artwork/artwork.json', parseArtworkURL);

    // update every 5 seconds
    setTimeout(nowPlaying, 5000);
}

nowPlaying();