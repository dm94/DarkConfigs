import * as Blockly from "blockly/core";
import { javascriptGenerator, Order } from "blockly/javascript";

Blockly.Blocks["booleanConstant"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Boolean:")
      .appendField(new Blockly.FieldDropdown([
        ["true", "true"],
        ["false", "false"],
      ]), "type");
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setOutput(true, 'Boolean');
    this.setColour(120);
    this.setTooltip("Boolean constant");
  },
};

javascriptGenerator.forBlock["booleanConstant"] = function (block: any) {
  const type = block.getFieldValue("type");
  return [`boolean(${type})`, Order.ATOMIC];
};