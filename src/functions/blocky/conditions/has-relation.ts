import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";

Blockly.Blocks.hasRelationCondition = {
  init: function () {
    this.appendDummyInput()
      .appendField("If")
      .appendField(
        new Blockly.FieldDropdown([
          ["hero()", "hero()"],
          ["target()", "target()"],
        ]),
        "ship",
      );
    this.appendDummyInput()
      .appendField("has relation")
      .appendField(new Blockly.FieldDropdown(this.generateOptions), "relation");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setPreviousStatement(true, "Boolean");
    this.setNextStatement(true, "Boolean");
    this.setColour(200);
    this.setTooltip("Checks the target type");
  },
  generateOptions: () => {
    const options: string[][] = [];
    const all = ["NO_TARGET", "NPC", "ENEMY", "ALLIED", "NOT_ATTACK_PACT"];

    for (const option of all) {
      const custom = option.toLowerCase().replaceAll("_", "-");
      options.push([custom, custom]);
    }

    return options;
  },
};

javascriptGenerator.forBlock.hasRelationCondition = (block: any) => {
  const relation = block.getFieldValue("relation");
  const ship = block.getFieldValue("ship");

  return `has-relation(${relation}, ${ship});`;
};
