import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";
import { shipTypes } from "../dropdowns/ship-types";

Blockly.Blocks['hasRelationCondition'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("If")
      .appendField(new Blockly.FieldDropdown(shipTypes), "ship");
    this.appendDummyInput()
      .appendField("has relation")
      .appendField(new Blockly.FieldDropdown(this.generateOptions), 'relation');
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(200);
    this.setTooltip("Checks the target type");
  },
  generateOptions: function() {
    let options: string[][] = [];
    let all = [
      "NO_TARGET",
      "NPC",
      "ENEMY",
      "ALLIED",
      "NOT_ATTACK_PACT"
    ];

    all.forEach((option) => {
      const custom = option.toLowerCase().replaceAll("_","-");
      options.push([custom, custom]);
    })

    return options;
  }
};

javascriptGenerator.forBlock['hasRelationCondition'] = function (block: any) {
  const relation = block.getFieldValue("relation");
  const ship = block.getFieldValue("ship");

  return `has-relation(${relation}, ${ship})`;
};