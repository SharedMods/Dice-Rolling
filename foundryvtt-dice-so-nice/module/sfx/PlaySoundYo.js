import { DiceSFX } from '../DiceSFX.js';

export class PlaySoundYo extends DiceSFX {
    static id = "PlaySoundYo";
    static specialEffectName = "DICESONICE.PlaySoundYo";
    static path = 'modules/dice-so-nice/sfx/sounds/YO DAZO.mp3';
    /**@override init */
    static async init(){
        game.audio.pending.push(function(){
            AudioHelper.preloadSound(PlaySoundYo.path);
        }.bind(this));
        return true;
    }

    /**@override play */
    async play(){
        AudioHelper.play({
            src: PlaySoundYo.path,
            volume: this.box.volume
        }, false);
    }
}
