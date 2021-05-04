import { DiceSFX } from '../DiceSFX.js';

export class PlaySoundPolka extends DiceSFX {
    static id = "PlaySoundPolka";
    static name = "DICESONICE.PlaySoundPolka";
    static path = 'modules/dice-so-nice/sfx/sounds/Polka_knows_nat_one.wav';
    /**@override init */
    static async init(){
        game.audio.pending.push(function(){
            AudioHelper.play({
                src: PlaySoundPolka.path,
                autoplay: false
            }, false);
        }.bind(this));
        return true;
    }

    /**@override play */
    async play(){
        AudioHelper.play({
            src: PlaySoundPolka.path,
            volume: this.box.volume
        }, false);
    }
}
