// music player for the home page

// unicode play: &#x25B6;
// unicode black square: &#x23F9;
function wmtuPlay()
{
    // sound object for Howler.js
    var sound = new Howl
    ({
        src: ['https://stream.wmtu.fm/wmtu-live'],
        ext: ['mp3'],
        mobileAutoEnable: true,
        preload: true,
        autoplay: false,
        volume: 1,
        html5: true
    });

    // play and stop the stream on div button click
    function stream()
    {
        if ( stream_id == null || sound.state() == "unloaded" || sound.playing(stream_id) == false )
        {
            console.log("\nPlaying stream...\n");
            stream_id = sound.play();
            $("#play_button").attr('style', 'background: black; color: #ffcd00;');
            $("#play_button").html('&#x23F9;');
            $(document).attr('title', 'WMTU 91.9 FM ▶️');
        }
        else
        {
            console.log("\nStopping stream...\n");
            stream_id = sound.stop();
            sound.unload();
            $("#play_button").removeAttr('style');
            $("#play_button").html('&#x25B6;');
            $(document).attr('title', 'WMTU 91.9 FM');
        }
    }

    var stream_id = null;
    $("#play_button").click( stream );
}

wmtuPlay()