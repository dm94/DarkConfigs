import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";

Blockly.Blocks["noneCondition"] = {
  init: function () {
    this.appendStatementInput("conditions")
      .setCheck("Boolean")
      .appendField("None");
    this.setPreviousStatement(true, "Boolean");
    this.setNextStatement(true, "Boolean");
    this.setOutput(true, "Boolean");
    this.setColour(200);
    this.setTooltip("Returns true if no child conditions return true");
  },
};

javascriptGenerator.forBlock["noneCondition"] = (
  block: any,
  generator: any,
) => {
  const conditions = generator.statementToCode(block, "conditions").trim();
  const conditionList = conditions
    .split(";")
    .filter((value: string) => value.trim().length > 0);
  return `none(${conditionList.join(",")});`;
};
