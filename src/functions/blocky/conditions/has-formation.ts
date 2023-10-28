import * as Blockly from "blockly/core";
import { javascriptGenerator, Order } from "blockly/javascript";

Blockly.Blocks['hasFormationCondition'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Has formation")
      .appendField(new Blockly.FieldDropdown(this.generateFormations), 'formation');
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
    this.setTooltip("Checks if a ship has a formation");
  },
  generateFormations: function() {
    let options: string[][] = [];
    let allFormations = [
      "STANDARD",
      "TURTLE",
      "ARROW",
      "LANCE",
      "STAR",
      "PINCER",
      "DOUBLE_ARROW",
      "DIAMOND",
      "CHEVRON",
      "MOTH",
      "CRAB",
      "HEART",
      "BARRAGE",
      "BAT",
      "RING",
      "DRILL",
      "VETERAN",
      "DOME",
      "WHEEL",
      "X",
      "WAVY",
      "MOSQUITO"
    ];

    allFormations.forEach((formation) => {
      const custom = formation.toLowerCase().replaceAll("_","-");
      options.push([custom, custom]);
    })

    return options;
  }
};

javascriptGenerator.forBlock['hasFormationCondition'] = function (block: any) {
  const formation = block.getFieldValue("formation");
  const ship = block.getFieldValue("ship");

  return [`has-formation(${formation}, ${ship})`, Order.ATOMIC];
};