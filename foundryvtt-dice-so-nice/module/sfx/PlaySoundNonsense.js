import { DiceSFX } from '../DiceSFX.js';

export class PlaySoundNonsense extends DiceSFX {
    static id = "PlaySoundNonsense";
    static specialEffectName = "DICESONICE.PlaySoundNonsense";
    static path = 'modules/dice-so-nice/sfx/sounds/Cat_nonsense.mp3';
    /**@override init */
    static async init(){
        game.audio.pending.push(function(){
            AudioHelper.preloadSound(PlaySoundNonsense.path);
        }.bind(this));
        return true;
    }

    /**@override play */
    async play(){
        AudioHelper.play({
            src: PlaySoundNonsense.path,
            volume: this.box.volume
        }, false);
    }
}
