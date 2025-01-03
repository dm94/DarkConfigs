import * as Blockly from "blockly/core";
import { javascriptGenerator, Order } from "blockly/javascript";

Blockly.Blocks.afterCondition = {
  init: function () {
    this.appendValueInput("seconds")
      .setCheck("Number")
      .appendField("Time in seconds");
    this.appendValueInput("condition")
      .setCheck("Boolean")
      .appendField("Condition");
    this.setPreviousStatement(true, "Boolean");
    this.setNextStatement(true, "Boolean");
    this.setOutput(true, "Boolean");
    this.setColour(200);
    this.setTooltip(
      "Returns true if inner condition is true after the specified time in seconds",
    );
  },
};

javascriptGenerator.forBlock.afterCondition = (block: any, generator: any) => {
  const seconds = generator.valueToCode(block, "seconds", Order.ATOMIC);

  const conditions = generator.statementToCode(block, "condition").trim();
  const conditionList = conditions
    .split(";")
    .filter((value: string) => value.trim().length > 0);
  return `after(${seconds},${conditionList.join(",")});`;
};
