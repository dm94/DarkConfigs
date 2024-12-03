import * as Blockly from "blockly/core";
import { javascriptGenerator, Order } from "blockly/javascript";

Blockly.Blocks.mapConstantString = {
  init: function () {
    this.appendDummyInput()
      .appendField("Map Name:")
      .appendField(new Blockly.FieldTextInput(""), "map");
    this.setOutput(true, "Map");
    this.setColour(80);
    this.setTooltip("Creates a map constant");
  },
};

javascriptGenerator.forBlock.mapConstantString = (block: any) => {
  const type = block.getFieldValue("map");
  return [`map("${type}")`, Order.ATOMIC];
};
