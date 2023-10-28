import * as Blockly from "blockly/core";
import {javascriptGenerator, Order} from "blockly/javascript";

Blockly.Blocks["afterCondition"] = {
  init: function () {
    this.appendValueInput("seconds")
      .setCheck("Number")
      .appendField("Time in seconds");
    this.appendValueInput("condition")
      .setCheck("Boolean")
      .appendField("Condition")
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setOutput(true, 'Boolean');
    this.setColour(200);
    this.setTooltip("Returns true if inner condition is true after the specified time in seconds");
  },
};

javascriptGenerator.forBlock["afterCondition"] = function (block, generator) {
  const seconds = generator.valueToCode(block, "seconds", Order.ATOMIC);
  const condition = generator.valueToCode(block, "condition", Order.ATOMIC);
  const code = `after(${seconds},${condition})`;
  return code;
};

Blockly.Blocks["allCondition"] = {
  init: function () {
    this.appendStatementInput("conditions")
      .setCheck("Boolean")
      .appendField("All")
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setOutput(true, 'Boolean');
    this.setColour(200);
    this.setTooltip("Returns true if all child conditions return true");
  },
};

javascriptGenerator.forBlock["allCondition"] = function (block, generator) {
  const conditions = generator.statementToCode(block, "conditions").trim();
  const code = `all(${conditions})`;
  return code;
};

Blockly.Blocks["anyCondition"] = {
  init: function () {
    this.appendStatementInput("conditions")
      .setCheck("Boolean")
      .appendField("Any")
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setOutput(true, 'Boolean');
    this.setColour(200);
    this.setTooltip("Returns true if any child conditions return true");
  },
};

javascriptGenerator.forBlock["anyCondition"] = function (block, generator) {
  const conditions = generator.statementToCode(block, "conditions").trim();
  const code = `any(${conditions})`;
  return code;
};

Blockly.Blocks["equalCondition"] = {
  init: function () {
    this.appendValueInput("firstValue");
    this.appendValueInput("secondValue").appendField("equals");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setOutput(true, 'Boolean');
    this.setColour(200);
    this.setTooltip("Returns true if both parameters are the same");
  },
};

javascriptGenerator.forBlock["equalCondition"] = function (block, generator) {
  const first = generator.valueToCode(block, "firstValue", Order.ATOMIC);
  const second = generator.valueToCode(block, "secondValue", Order.ATOMIC);
  const code = `equal(${first},${second})`;
  return code;
};

Blockly.Blocks["hasEffectCondition"] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Has effect")
      .appendField(new Blockly.FieldDropdown(this.generateEffects), 'FIELDNAME');
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([
        ["hero()", "hero()"],
        ["target()", "target()"],
      ]), "ship");
      this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(200);
    this.setTooltip("Checks if a ship has an effect");
  },
  generateEffects: function() {
    let options: string[][] = [];
    let allEffects = ["SOLACE_NANO_CLUSTER",
    "DIMINISHER_WEAKEN_SHIELDS",
    "SPECTRUM_PRISMATIC_SHIELD",
    "SENTINEL_FORTRESS",
    "VENOM_SINGULARITY",
    "SHIP_SLOWDOWN",
    "LEECH",
    "LIGHTNING_ABILITY",
    "NPC_ISH",
    "CITADEL_FORTIFY",
    "CITADEL_DRAW_FIRE",
    "CITADEL_PROTECTION",
    "CITADEL_PROTECTED",
    "CITADEL_DRAW_FIRE_VICTIM",
    "STICKY_BOMB",
    "ISH",
    "TARTARUS_SPEED_BOOST",
    "TARTARUS_RAPID_FIRE",
    "MIMESIS_PHASE_OUT",
    "PROMETHEUS_SHOT_LOADED",
    "DISRUPTOR_REDIRECT",
    "DISRUPTOR_SHIELD_DISARRAY",
    "DISRUPTOR_DDOL",
    "BERSERKER_SHIELD_LINK",
    "BERSERKER_BERSERK",
    "BERSERKER_REVENGE",
    "SOLARIS_INCINERATE",
    "HOLO_REVERSAL_SELF",
    "HOLO_ENEMY_REVERSAL",
    "CITADEL_PLUS_PRISMATIC_ENDURANCE"];

    allEffects.forEach((effect) => {
      const custom = effect.toLowerCase().replaceAll("_","-");
      options.push([custom, custom]);
    })

    return options;
  }
};

javascriptGenerator.forBlock["hasEffectCondition"] = function (block, generator) {
  const effect = generator.valueToCode(block, "FIELDNAME", Order.ATOMIC);
  const ship = generator.valueToCode(block, "ship", Order.ATOMIC);

  const code = `has-effect(${effect},${ship})`;
  return code;
};
