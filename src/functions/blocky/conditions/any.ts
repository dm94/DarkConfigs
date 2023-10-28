import * as Blockly from "blockly/core";
import { javascriptGenerator, Order } from "blockly/javascript";

Blockly.Blocks["anyCondition"] = {
  init: function () {
    this.appendStatementInput("conditions")
      .setCheck("Boolean")
      .appendField("Any")
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setOutput(true, 'Boolean');
    this.setColour(200);
    this.setTooltip("Returns true if any child conditions return true");
  },
};

javascriptGenerator.forBlock["anyCondition"] = function (block: any, generator: any) {
  const conditions = generator.statementToCode(block, "conditions").trim();
  return [`any(${conditions})`, Order.ATOMIC];
};