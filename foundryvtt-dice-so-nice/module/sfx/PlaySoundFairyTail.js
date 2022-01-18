import { DiceSFX } from '../DiceSFX.js';

export class PlaySoundFairyTail extends DiceSFX {
    static id = "PlaySoundFairyTail";
    static specialEffectName = "DICESONICE.PlaySoundFairyTail";
    static path = 'modules/dice-so-nice/sfx/sounds/Fairy_tail.wav';
    /**@override init */
    static async init(){
        game.audio.pending.push(function(){
            AudioHelper.preloadSound(PlaySoundFairyTail.path);
        }.bind(this));
        return true;
    }


    /**@override play */
    async play(){
        AudioHelper.play({
            src: PlaySoundFairyTail.path,
            volume: this.box.volume
        }, false);
    }
}
