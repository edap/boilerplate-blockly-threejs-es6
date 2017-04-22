import * as THREE from 'three';
import Stats from 'stats.js';
import Actor from "./actor";
import Plane from "./plane";
import Game from "./game";

let game;

window.blockly_loaded = function(blockly) {
    // init the game only after window.Blockly definition
    window.Blockly = blockly;
    defineActions();
    game = new Game();
    game.initGame();
};

window.reset_car = function() {
    game.actor.reset();
};

window.run_code = function() {
    game.instructions=[];
    var code = window.Blockly.JavaScript.workspaceToCode(window.Blockly.mainWorkspace);
    eval(code);
    game.actor.startConsume(game.instructions);
};

function defineActions(){
    window.Blockly.JavaScript['actor_move_forward'] = function(block) {
        var dropdown_actor_move_forward_distance = block.getFieldValue('actor_move_forward_distance');
        var code = "game.instructions.push({type:'move_forward',value:"+dropdown_actor_move_forward_distance+"});";
        return code;
    };

    window.Blockly.JavaScript['actor_turn'] = function(block) {
        var direction = block.getFieldValue('actor_turn_direction');
        var code = "game.instructions.push({type:'turn',value:'"+direction+"'});";
        return code;
    };

    window.Blockly.JavaScript['actor_jump_forward'] = function(block) {
        var dropdown_actor_jump_forward_distance = block.getFieldValue('actor_jump_forward_distance');
        var code = "game.instructions.push({type:'jump_forward',value:"+dropdown_actor_jump_forward_distance+"});";
        return code;
    };
}
