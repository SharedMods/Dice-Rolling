import * as THREE from './libs/three.module.js';
import { GLTFLoader } from './libs/three-modules/GLTFLoader.js';

import { PlaySoundEpicFail } from './sfx/PlaySoundEpicFail.js';
import { PlaySoundEpicWin } from './sfx/PlaySoundEpicWin.js';
import { PlaySoundPeko } from './sfx/PlaySoundPeko.js';
import { PlaySoundGoodMorning } from './sfx/PlaySoundGoodMorning.js';
import { PlaySoundPolka } from './sfx/PlaySoundPolka.js';
import { PlaySoundHaachama } from './sfx/PlaySoundHaachama.js';
import { PlaySoundNonsense } from './sfx/PlaySoundNonsense.js';
import { PlaySoundRice } from './sfx/PlaySoundRice.js';
import { PlaySoundYes } from './sfx/PlaySoundYes.js';
import { PlaySoundNo } from './sfx/PlaySoundNo.js' ;
import { PlaySoundPain } from './sfx/PlaySoundPain.js' ;
import { PlaySoundPan } from './sfx/PlaySoundPan.js' ;
import { PlaySoundPoggers } from './sfx/PlaySoundPoggers.js' ;
import { PlaySoundYo } from './sfx/PlaySoundYo.js' ;
import { PlaySoundTsukuyomi } from './sfx/PlaySoundTsukuyomi.js' ;
import { PlaySoundFairyTail } from './sfx/PlaySoundFairyTail.js' ;
import { PlaySoundAllMight } from './sfx/PlaySoundAllMight.js' ;
import { PlaySoundUnbelievable } from './sfx/PlaySoundUnbelievable.js' ;

import { PlayConfettiStrength1 } from './sfx/PlayConfettiStrength1.js';
import { PlayConfettiStrength2 } from './sfx/PlayConfettiStrength2.js';
import { PlayConfettiStrength3 } from './sfx/PlayConfettiStrength3.js';
import { PlayAnimationParticleSpiral } from './sfx/PlayAnimationParticleSpiral.js';
import { PlayAnimationParticleSparkles } from './sfx/PlayAnimationParticleSparkles.js';
import { PlayAnimationParticleVortex } from './sfx/PlayAnimationParticleVortex.js';
import { PlayAnimationBright } from './sfx/PlayAnimationBright.js';
import { PlayAnimationDark } from './sfx/PlayAnimationDark.js';
import { PlayAnimationThormund } from './sfx/PlayAnimationThormund.js';
import { PlayAnimationImpact } from './sfx/PlayAnimationImpact.js';
import { PlayMacro } from './sfx/PlayMacro.js';

export const DiceSFXManager = {
    SFX_MODE_CLASS : {
        "PlayAnimationBright": PlayAnimationBright,
        "PlayAnimationDark": PlayAnimationDark,
        "PlayAnimationImpact": PlayAnimationImpact,
        "PlayConfettiStrength1": PlayConfettiStrength1,
        "PlayConfettiStrength2": PlayConfettiStrength2,
        "PlayConfettiStrength3": PlayConfettiStrength3,
        "PlayAnimationThormund": PlayAnimationThormund,
        "PlayAnimationParticleSpiral": PlayAnimationParticleSpiral,
        "PlayAnimationParticleSparkles": PlayAnimationParticleSparkles,
        "PlayAnimationParticleVortex": PlayAnimationParticleVortex,
        "PlaySoundEpicWin": PlaySoundEpicWin,
        "PlaySoundEpicFail": PlaySoundEpicFail,
        "PlaySoundPeko": PlaySoundPeko,
        "PlaySoundGoodMorning": PlaySoundGoodMorning,
        "PlaySoundPolka": PlaySoundPolka,
        "PlaySoundHaachama": PlaySoundHaachama,
        "PlaySoundNonsense": PlaySoundNonsense,
        "PlaySoundRice": PlaySoundRice,
        "PlaySoundYes": PlaySoundYes,
        "PlaySoundNo": PlaySoundNo,
        "PlaySoundPain": PlaySoundPain,
        "PlaySoundPan": PlaySoundPan,
        "PlaySoundPoggers": PlaySoundPoggers,
        "PlaySoundYo": PlaySoundYo,
        "PlaySoundTsukuyomi": PlaySoundTsukuyomi,
        "PlaySoundFairyTail": PlaySoundFairyTail,
        "PlaySoundAllMight": PlaySoundAllMight,
        "PlaySoundUnbelievable": PlaySoundUnbelievable
    },
    SFX_MODE_LIST : null,
    SFX_CLASS : {},
    renderQueue : [],
    garbageCollector : [],
    init : function(){
        if(!DiceSFXManager.SFX_MODE_LIST){
            DiceSFXManager.SFX_MODE_LIST = {};
            Object.values(DiceSFXManager.SFX_MODE_CLASS).forEach((sfx)=>{
                if(sfx.id.startsWith("PlayConfettiStrength") && (!game.modules.get("confetti") || !game.modules.get("confetti").active))
                    return;
                DiceSFXManager.SFX_MODE_LIST[sfx.id] = sfx.name;
            });
        }
        let sfxUniqueList = [];
        game.users.forEach((user) => {
            let sfxList = user.getFlag("dice-so-nice", "sfxList");
            if(sfxList){
                Object.values(sfxList).forEach((line) => {
                    //fix corrupted save from bug #139
                    if(!Array.isArray(line.specialEffect)){
                        sfxUniqueList.push(line.specialEffect);
                    }
                });
            }
        });
        //remove duplicate
        sfxUniqueList = sfxUniqueList.filter((v, i, a) => a.indexOf(v) === i);

        //for each possible sfx, initialize
        sfxUniqueList.forEach((sfxClassName) => {
            if(sfxClassName.startsWith("PlayConfettiStrength") && (!game.modules.get("confetti") || !game.modules.get("confetti").active))
                return;
            DiceSFXManager.addSFXMode(DiceSFXManager.SFX_MODE_CLASS[sfxClassName]);
        });
    },
    addSFXMode : function(sfx){
        if(sfx.id && sfx.name && !sfx.initialized){
            DiceSFXManager.SFX_CLASS[sfx.id] = sfx;
            sfx.initialized = true;
            sfx.init();
        }
    },
    playSFX : async function(id, box, dicemesh){
        if(!DiceSFXManager.SFX_CLASS[id])
            return;
        let sfxInstance = new DiceSFXManager.SFX_CLASS[id](box, dicemesh);

        sfxInstance.play().then(result => {
            if(result !== false){
                if(typeof sfxInstance.render === 'function')
                    DiceSFXManager.renderQueue.push(sfxInstance);
                if(sfxInstance.enableGC)
                    DiceSFXManager.garbageCollector.push(sfxInstance);
            }
        });
    },
    renderSFX : function(){
        let queue = [...DiceSFXManager.renderQueue];
        for(let i =0;i<queue.length;i++){
            let sfxInstance = queue[i];
            if(sfxInstance.destroyed){
                DiceSFXManager.endSFX(sfxInstance);
            } else {
                if(typeof sfxInstance.render === 'function')
                    sfxInstance.render();
            }
        }
    },
    endSFX : function(sfxInstance){
        let index = DiceSFXManager.renderQueue.indexOf(sfxInstance);
        if(index !== -1)
            DiceSFXManager.renderQueue.splice(index, 1);
        if(DiceSFXManager.renderQueue.length == 0)
            game.dice3d._afterShow();
    },
    clearQueue : function(){
        let queue = [...DiceSFXManager.renderQueue];
        for(let i =0;i<queue.length;i++){
            let sfxInstance = queue[i];
            if(typeof sfxInstance.destroy === 'function')
                sfxInstance.destroy();
                DiceSFXManager.endSFX(sfxInstance);
        }
        //For animations that do not have a render loop but still require some cleaning
        for(let i = 0;i<DiceSFXManager.garbageCollector.length;i++){
            DiceSFXManager.garbageCollector[i].destroy();
        }
        DiceSFXManager.garbageCollector = [];
    }
}
