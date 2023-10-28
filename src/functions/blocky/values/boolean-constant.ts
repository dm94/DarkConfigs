import * as Blockly from "blockly/core";
import {javascriptGenerator, Order} from "blockly/javascript";

Blockly.Blocks["booleanConstant"] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([
        ["true", "true"],
        ["false", "false"],
      ]), "type");
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setOutput(true, 'Boolean');
    this.setColour(160);
    this.setTooltip("Boolean constant");
  },
};

javascriptGenerator.forBlock["booleanConstant"] = function (block: any, generator: any) {
  const type = generator.valueToCode(block, "type", Order.ATOMIC);
  return `boolean(${type})`;
};