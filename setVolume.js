chrome.storage.sync.get(['volume'], function(data) {
    var videos = document.getElementsByTagName("video");
    if (videos.length > 0)
    {
        console.log('Found '+ videos.length + ' videos');
        console.log('Setting volume to: '+ data.volume);
        var i;
        for (i = 0; i < videos.length; i++) {
            videos[i].volume = data.volume;
        }
    }

    var audios = document.getElementsByTagName("audio");
    if (audios.length > 0)
    {
        console.log('Found '+ audios.length + ' audios');
        console.log('Setting volume to: '+ data.volume);
        var j;
        for (j = 0; j < audios.length; j++) {
            audios[j].volume = data.volume;
        }
    }
});