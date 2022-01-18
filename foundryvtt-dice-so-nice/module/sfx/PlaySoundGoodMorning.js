import { DiceSFX } from '../DiceSFX.js';

export class PlaySoundGoodMorning extends DiceSFX {
    static id = "PlaySoundGoodMorning";
    static specialEffectName = "DICESONICE.PlaySoundGoodMorning";
    static path = 'modules/dice-so-nice/sfx/sounds/Good_Morning.mp3';
    /**@override init */
    static async init(){
        game.audio.pending.push(function(){
            AudioHelper.preloadSound(PlaySoundGoodMorning.path);
        }.bind(this));
        return true;
    }


    /**@override play */
    async play(){
        AudioHelper.play({
            src: PlaySoundGoodMorning.path,
            volume: this.box.volume
        }, false);
    }
}
