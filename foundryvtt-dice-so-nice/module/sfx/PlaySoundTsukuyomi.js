import { DiceSFX } from '../DiceSFX.js';

export class PlaySoundTsukuyomi extends DiceSFX {
    static id = "PlaySoundTsukuyomi";
    static specialEffectName = "DICESONICE.PlaySoundTsukuyomi";
    static path = 'modules/dice-so-nice/sfx/sounds/Tsukuyomi.wav';
    /**@override init */
    static async init(){
        game.audio.pending.push(function(){
            AudioHelper.preloadSound(PlaySoundTsukuyomi.path);
        }.bind(this));
        return true;
    }

    /**@override play */
    async play(){
        AudioHelper.play({
            src: PlaySoundTsukuyomi.path,
            volume: this.box.volume
        }, false);
    }
}
