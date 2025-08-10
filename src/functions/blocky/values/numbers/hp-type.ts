import * as Blockly from "blockly/core";
import { javascriptGenerator, Order } from "blockly/javascript";

Blockly.Blocks.hpTypeValue = {
  init: function () {
    this.appendDummyInput()
      .appendField("HP Type")
      .appendField(new Blockly.FieldDropdown(this.generateOptions), "hpType");
    this.appendValueInput("from").appendField("from").setCheck("Health");
    this.setInputsInline(true);
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setOutput(true, "Number");
    this.setColour(40);
    this.setTooltip("Gets a certain HP type from a health");
  },
  generateOptions: () => {
    const options: string[][] = [];
    const all = ["HP_PERCENT", "SHIELD_PERCENT", "HP", "SHIELD", "NANO_HULL"];

    for (const option of all) {
      const custom = option.toLowerCase().replaceAll("_", "-");
      options.push([custom, custom]);
    }

    return options;
  },
};

javascriptGenerator.forBlock.hpTypeValue = (block: any, generator: any) => {
  const hpType = block.getFieldValue("hpType");
  const second = generator.valueToCode(block, "from", Order.ATOMIC);
  return [`hp-type(${hpType}, ${second})`, Order.ATOMIC];
};
