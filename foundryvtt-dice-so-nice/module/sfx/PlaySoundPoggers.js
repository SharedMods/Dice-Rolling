import { DiceSFX } from '../DiceSFX.js';

export class PlaySoundPoggers extends DiceSFX {
    static id = "PlaySoundPoggers";
    static specialEffectName = "DICESONICE.PlaySoundPoggers";
    static path = 'modules/dice-so-nice/sfx/sounds/Poggers.wav';
    /**@override init */
    static async init(){
        game.audio.pending.push(function(){
            AudioHelper.preloadSound(PlaySoundPoggers.path);
        }.bind(this));
        return true;
    }

    /**@override play */
    async play(){
        AudioHelper.play({
            src: PlaySoundPoggers.path,
            volume: this.box.volume
        }, false);
    }
}
