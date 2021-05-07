import { DiceSFX } from '../DiceSFX.js';

export class PlaySoundPan extends DiceSFX {
    static id = "PlaySoundPan";
    static name = "DICESONICE.PlaySoundPan";
    static path = 'modules/dice-so-nice/sfx/sounds/hitsound.wav';
    /**@override init */
    static async init(){
        game.audio.pending.push(function(){
            AudioHelper.play({
                src: PlaySoundPan.path,
                autoplay: false
            }, false);
        }.bind(this));
        return true;
    }

    /**@override play */
    async play(){
        AudioHelper.play({
            src: PlaySoundPan.path,
            volume: this.box.volume
        }, false);
    }
}
