import * as Blockly from "blockly/core";
import { javascriptGenerator, Order } from "blockly/javascript";

Blockly.Blocks["distanceValue"] = {
  init: function () {
    this.appendValueInput("firstValue")
      .setCheck("Location")
      .appendField("distance between");
    this.appendValueInput("secondValue").setCheck("Location");
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(40);
    this.setTooltip("Returns the distance between two locations");
  },
};

javascriptGenerator.forBlock["distanceValue"] = (
  block: any,
  generator: any,
) => {
  const first = generator.valueToCode(block, "firstValue", Order.ATOMIC);
  const second = generator.valueToCode(block, "secondValue", Order.ATOMIC);
  return [`distance(${first}, ${second})`, Order.ATOMIC];
};
