import * as Blockly from "blockly/core";
import { javascriptGenerator, Order } from "blockly/javascript";

Blockly.Blocks["numberConstant"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Number:")
      .appendField(new Blockly.FieldNumber(), "number");
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(40);
    this.setTooltip("Creates a number constant");
  },
};

javascriptGenerator.forBlock["numberConstant"] = (block: any) => {
  const first = block.getFieldValue("number");
  return [`number(${first})`, Order.ATOMIC];
};
