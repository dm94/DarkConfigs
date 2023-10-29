import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";

Blockly.Blocks["oneCondition"] = {
  init: function () {
    this.appendStatementInput("conditions")
      .setCheck("Boolean")
      .appendField("One")
    this.setPreviousStatement(true, "Boolean");
    this.setNextStatement(true, "Boolean");
    this.setOutput(true, 'Boolean');
    this.setColour(200);
    this.setTooltip("Returns true if exactly one child condition return true");
  },
};

javascriptGenerator.forBlock["oneCondition"] = function (block: any, generator: any) {
  const conditions = generator.statementToCode(block, "conditions").trim();
  const conditionList = conditions.split(';').filter((value: string) => value.trim().length > 0);
  return `one(${conditionList.join(',')});`;
};