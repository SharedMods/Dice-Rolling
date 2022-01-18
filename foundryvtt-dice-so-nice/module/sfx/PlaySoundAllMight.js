import { DiceSFX } from '../DiceSFX.js';

export class PlaySoundAllMight extends DiceSFX {
    static id = "PlaySoundAllMight";
    static specialEffectName = "DICESONICE.PlaySoundAllMight";
    static path = 'modules/dice-so-nice/sfx/sounds/All_Might.mp3';
    /**@override init */
    static async init(){
        game.audio.pending.push(function(){
            AudioHelper.preloadSound(PlaySoundAllMight.path);
        }.bind(this));
        return true;
    }

    /**@override play */
    async play(){
        AudioHelper.play({
            src: PlaySoundAllMight.path,
            volume: this.box.volume
        }, false);
    }
}
