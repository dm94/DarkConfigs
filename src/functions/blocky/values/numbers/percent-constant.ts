import * as Blockly from "blockly/core";
import {javascriptGenerator, Order} from "blockly/javascript";

Blockly.Blocks["percentConstant"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Percent:")
      .appendField(new Blockly.FieldNumber(), 'number');
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setColour(40);
    this.setTooltip("Creates a percent constant");
  },
};

javascriptGenerator.forBlock["percentConstant"] = function (block: any, generator: any) {
  const first = generator.valueToCode(block, "number", Order.ATOMIC) as number;
  return [ `percent(${first * 100})`, Order.ATOMIC];
};