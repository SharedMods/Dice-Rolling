import { DiceSFX } from '../DiceSFX.js';

export class PlaySoundNo extends DiceSFX {
    static id = "PlaySoundNo";
    static name = "DICESONICE.PlaySoundNo";
    static path = 'modules/dice-so-nice/sfx/sounds/jotaro-no.mp3';
    /**@override init */
    static async init(){
        game.audio.pending.push(function(){
            AudioHelper.play({
                src: PlaySoundNo.path,
                autoplay: false
            }, false);
        }.bind(this));
        return true;
    }

    /**@override play */
    async play(){
        AudioHelper.play({
            src: PlaySoundNo.path,
            volume: this.box.volume
        }, false);
    }
}
