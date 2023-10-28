import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";

Blockly.Blocks["noneCondition"] = {
  init: function () {
    this.appendStatementInput("conditions")
      .setCheck("Boolean")
      .appendField("None")
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setOutput(true, 'Boolean');
    this.setColour(200);
    this.setTooltip("Returns true if no child conditions return true");
  },
};

javascriptGenerator.forBlock["noneCondition"] = function (block: any, generator: any) {
  const conditions = generator.statementToCode(block, "conditions").trim();
  return `none(${conditions})`;
};