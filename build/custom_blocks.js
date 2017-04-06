/*
move forward block
https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#h4ynt2

turn actor right
https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#n9y6ca

actor jump block
https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#av6o3o
*/

 Blockly.Blocks['actor_move_forward'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("move forward")
        .appendField(new Blockly.FieldDropdown([["1","1"], ["2","2"], ["3","3"]]), "actor_move_forward_distance");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['actor_turn_right'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(" turn right")
        .appendField(new Blockly.FieldAngle(90), "actor_turn_right_value");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['actor_turn_left'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(" turn left")
        .appendField(new Blockly.FieldAngle(90), "actor_turn_left_value");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['actor_jump'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("jump");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};