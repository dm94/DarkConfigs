import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";

Blockly.Blocks["hasEffectCondition"] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Has effect")
      .appendField(new Blockly.FieldDropdown(this.generateEffects), 'effect');
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

javascriptGenerator.forBlock["hasEffectCondition"] = function (block: any) {
  const effect = block.getFieldValue("effect");
  const ship = block.getFieldValue("ship");

  return `has-effect(${effect}, ${ship})`;
};