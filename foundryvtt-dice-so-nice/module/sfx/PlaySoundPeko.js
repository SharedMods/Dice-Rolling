import { DiceSFX } from '../DiceSFX.js';

export class PlaySoundPeko extends DiceSFX {
    static id = "PlaySoundPeko";
    static name = "DICESONICE.PlaySoundPeko";
    static path = 'modules/dice-so-nice/sfx/sounds/YATTA_PEKO.mp3';
    /**@override init */
    static async init(){
        game.audio.pending.push(function(){
            AudioHelper.play({
                src: PlaySoundPeko.path,
                autoplay: false
            }, false);
        }.bind(this));
        return true;
    }

    /**@override play */
    async play(){
        AudioHelper.play({
            src: PlaySoundPeko.path,
            volume: this.box.volume
        }, false);
    }
}
