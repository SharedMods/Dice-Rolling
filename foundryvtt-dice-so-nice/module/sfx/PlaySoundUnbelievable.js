import { DiceSFX } from '../DiceSFX.js';

export class PlaySoundUnbelievable extends DiceSFX {
    static id = "PlaySoundUnbelievable";
    static specialEffectName = "DICESONICE.PlaySoundUnbelievable";
    static path = 'modules/dice-so-nice/sfx/sounds/unbelievable_peko.mp3';
    /**@override init */
    static async init(){
        game.audio.pending.push(function(){
            AudioHelper.preloadSound(PlaySoundUnbelievable.path);
        }.bind(this));
        return true;
    }

    /**@override play */
    async play(){
        AudioHelper.play({
            src: PlaySoundUnbelievable.path,
            volume: this.box.volume
        }, false);
    }
}
