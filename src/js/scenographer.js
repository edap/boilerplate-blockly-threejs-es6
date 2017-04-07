import * as THREE from 'three';

export default class Scenographer{
    contructor(){
    }

    setScenes(scenes){
        this.currentSceneIndex = 0;
        this.scenes = scenes;
        this.startedAt = 0;
        this.timeElapsed = 0;
        this.animating = false;
    }

    update(time){
        if (!this.scenesAreAvailable()) return;
        if (this.startedAt === 0) { this.startedAt = time; };
        this.timeElapsed = time - this.startedAt;
        if(this.timeElapsed >= this.getCurrentScene().duration){
            this._changeScene(time);
        }
        //console.log(this.timeElapsed);
    }

    _changeScene(time){
        this.startedAt = time;
        if(this.currentSceneIndex < this.scenes.length-1){
            this.currentSceneIndex++;
        }else{
            this.animating = false;
        }
    }


    scenesAreAvailable(){
        return (this.scenes && this.scenes.length > 0);
    }

    getCurrentScene(){
        return this.scenes[this.currentSceneIndex];
    }

    resetScenes(){
        this.scenes = [];
        this.startedAt = 0;
        this.timeElapsed = 0;
        this.currentSceneIndex = 0;
        this.animating= false;
    }

    _changeAnimation(){
        console.log("change");
        if(this.currentCommandIndex < this.commands.length-1){
            this.currentCommandIndex++;
        }else{
            console.log("all animations were executed");
            this.animating=false;
        }
    }
}
