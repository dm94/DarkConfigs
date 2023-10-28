import * as Blockly from "blockly/core";
import {javascriptGenerator, Order} from "blockly/javascript";

Blockly.Blocks["stringConstant"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Text:")
      .appendField(new Blockly.FieldTextInput(''), 'firstValue');
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setInputsInline(true);
    this.setOutput(true, 'String');
    this.setColour(100);
    this.setTooltip("Creates a string constant");
  },
};

javascriptGenerator.forBlock["stringConstant"] = function (block: any, generator: any) {
  const first = generator.valueToCode(block, "firstValue", Order.ATOMIC);
  return [ `string("${first}")`, Order.ATOMIC];
};