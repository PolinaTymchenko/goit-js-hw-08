import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';
const currentTime = getPlayerTime();

const onPlay = function(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data.seconds))
};

player.on('timeupdate', throttle(onPlay, 1000));
player.setCurrentTime(currentTime);

function getPlayerTime() {
    let playerTime = localStorage.getItem(STORAGE_KEY);
    if (playerTime) {
        return JSON.parse(playerTime);
    }
}


