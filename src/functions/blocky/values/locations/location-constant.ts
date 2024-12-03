import * as Blockly from "blockly/core";
import { javascriptGenerator, Order } from "blockly/javascript";

Blockly.Blocks.locationConstant = {
  init: function () {
    this.appendValueInput("firstNumber").setCheck("Number").appendField("X");
    this.appendValueInput("secondNumber").setCheck("Number").appendField("Y");
    this.setInputsInline(true);
    this.setOutput(true, "Location");
    this.setColour(60);
    this.setTooltip("Creates a location constant");
  },
};

javascriptGenerator.forBlock.locationConstant = (
  block: any,
  generator: any,
) => {
  const firstNumber = generator.valueToCode(block, "firstNumber", Order.ATOMIC);
  const secondNumber = generator.valueToCode(
    block,
    "secondNumber",
    Order.ATOMIC,
  );

  return [`location(${firstNumber}, ${secondNumber})`, Order.ATOMIC];
};
