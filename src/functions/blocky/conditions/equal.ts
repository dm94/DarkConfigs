import * as Blockly from "blockly/core";
import { javascriptGenerator, Order } from "blockly/javascript";

Blockly.Blocks["equalCondition"] = {
  init: function () {
    this.appendValueInput("firstValue");
    this.appendValueInput("secondValue").appendField("equals");
    this.setPreviousStatement(true, "Boolean");
    this.setNextStatement(true, "Boolean");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(200);
    this.setTooltip("Returns true if both parameters are the same");
  },
};

javascriptGenerator.forBlock["equalCondition"] = (
  block: any,
  generator: any,
) => {
  const first = generator.valueToCode(block, "firstValue", Order.ATOMIC);
  const second = generator.valueToCode(block, "secondValue", Order.ATOMIC);
  return `equal(${first},${second});`;
};
