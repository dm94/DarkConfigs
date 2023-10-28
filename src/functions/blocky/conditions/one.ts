import * as Blockly from "blockly/core";
import { javascriptGenerator, Order } from "blockly/javascript";

Blockly.Blocks["oneCondition"] = {
  init: function () {
    this.appendStatementInput("conditions")
      .setCheck("Boolean")
      .appendField("One")
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setOutput(true, 'Boolean');
    this.setColour(200);
    this.setTooltip("Returns true if exactly one child condition return true");
  },
};

javascriptGenerator.forBlock["oneCondition"] = function (block: any, generator: any) {
  const conditions = generator.statementToCode(block, "conditions").trim();
  return [`one(${conditions})`, Order.ATOMIC];
};