import { DiceSFX } from '../DiceSFX.js';

export class PlaySoundRice extends DiceSFX {
    static id = "PlaySoundRice";
    static name = "DICESONICE.PlaySoundRice";
    static path = 'modules/dice-so-nice/sfx/sounds/WELCOME_TO_THE_RICE_FIELDS_MOTHERFUCKER.mp3';
    /**@override init */
    static async init(){
        game.audio.pending.push(function(){
            AudioHelper.play({
                src: PlaySoundRice.path,
                autoplay: false
            }, false);
        }.bind(this));
        return true;
    }

    /**@override play */
    async play(){
        AudioHelper.play({
            src: PlaySoundRice.path,
            volume: this.box.volume
        }, false);
    }
}
