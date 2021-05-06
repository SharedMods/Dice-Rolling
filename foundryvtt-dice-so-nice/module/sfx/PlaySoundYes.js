import { DiceSFX } from '../DiceSFX.js';

export class PlaySoundYes extends DiceSFX {
    static id = "PlaySoundYes";
    static name = "DICESONICE.PlaySoundYes";
    static path = 'modules/dice-so-nice/sfx/sounds/yes-yes-yes.mp3';
    /**@override init */
    static async init(){
        game.audio.pending.push(function(){
            AudioHelper.play({
                src: PlaySoundYes.path,
                autoplay: false
            }, false);
        }.bind(this));
        return true;
    }

    /**@override play */
    async play(){
        AudioHelper.play({
            src: PlaySoundYes.path,
            volume: this.box.volume
        }, false);
    }
}
