import { DiceSFX } from '../DiceSFX.js';

export class PlaySoundHaachama extends DiceSFX {
    static id = "PlaySoundHaachama";
    static specialEffectName = "DICESONICE.PlaySoundHaachama";
    static path = 'modules/dice-so-nice/sfx/sounds/HAACHAMA20.wav';
    /**@override init */
    static async init(){
        game.audio.pending.push(function(){
            AudioHelper.preloadSound(PlaySoundHaachama.path);
        }.bind(this));
        return true;
    }


    /**@override play */
    async play(){
        AudioHelper.play({
            src: PlaySoundHaachama.path,
            volume: this.box.volume
        }, false);
    }
}
