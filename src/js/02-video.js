import Player from '@vimeo/player';
import throttle from 'lodash.throttle';


const iframe = document.querySelector('iframe');
const player = new Player(iframe);
    
const CURRENT_TIME = 'videoplayer-current-time';


player.on('timeupdate', throttle(saveToLocalStorage, 1000));

let savedTime = 0;
let savedData = localStorage.getItem(CURRENT_TIME);

function saveToLocalStorage(time) {
    //  console.log('time',time);
    savedTime = JSON.stringify(time.seconds);
    // console.log('savedTime',savedTime);
    localStorage.setItem(CURRENT_TIME, savedTime); 
}

// console.log('savedData',savedData);

player.setCurrentTime(savedData).then(function (savedData) {
        // seconds = the actual time that the player seeked to
    }).catch(function(error) {
        switch (error.name) {
            case 'RangeError':
                // the time was less than 0 or greater than the video’s duration
                break;

            default:
                // some other error occurred
                break;
        }
});

    
        