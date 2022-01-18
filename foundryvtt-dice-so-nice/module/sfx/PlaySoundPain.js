import { DiceSFX } from '../DiceSFX.js';

export class PlaySoundPain extends DiceSFX {
    static id = "PlaySoundPain";
    static specialEffectName = "DICESONICE.PlaySoundPain";
    static path = 'modules/dice-so-nice/sfx/sounds/PAIN_PEKO.wav';
    static async init(){
        game.audio.pending.push(function(){
            AudioHelper.preloadSound(PlaySoundPain.path);
        }.bind(this));
        return true;
    }


    /**@override play */
    async play(){
        AudioHelper.play({
            src: PlaySoundPain.path,
            volume: this.box.volume
        }, false);
    }
}
