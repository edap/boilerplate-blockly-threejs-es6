import * as THREE from 'three';

export default class Scenographer{
	contructor(){
        this.currentSceneIndex = 0;
	}

	setScenes(scenes){
        this.scenes = scenes;
	}

	update(time){
		if(!this.scenesAreAvailable()) return;
		console.log("startd");
		console.log(time);
		//debugger;
	}

	scenesAreAvailable(){
		return (this.scenes && this.scenes.length > 0);
	}

	getCurrentScene(){
		console.log(this);
		return this.scenes[this.currentSceneIndex];
	}

	resetScenes(){
		this.scenes = [];
		this.currentSceneIndex = 0;
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