import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";

Blockly.Blocks["untilCondition"] = {
  init: function () {
    this.appendValueInput("firstValue").setCheck("Boolean");
    this.appendValueInput("secondValue")
      .setCheck("Boolean")
      .appendField("until");
    this.setPreviousStatement(true, "Boolean");
    this.setNextStatement(true, "Boolean");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(200);
    this.setTooltip(
      "Returns true if the first matches until the second one turns true",
    );
  },
};

javascriptGenerator.forBlock["untilCondition"] = (
  block: any,
  generator: any,
) => {
  const firstConditions = generator.statementToCode(block, "firstValue").trim();
  const second = generator.statementToCode(block, "secondValue").trim();

  return `until(${firstConditions},${second});`;
};
