import * as Blockly from "blockly/core";
import {javascriptGenerator, Order} from "blockly/javascript";

Blockly.Blocks["untilCondition"] = {
  init: function () {
    this.appendValueInput("firstValue").setCheck("Boolean");
    this.appendValueInput("secondValue").setCheck("Boolean").appendField("until");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setOutput(true, 'Boolean');
    this.setColour(200);
    this.setTooltip("Returns true if the first matches until the second one turns true");
  },
};

javascriptGenerator.forBlock["untilCondition"] = function (block: any, generator: any) {
  const first = generator.valueToCode(block, "firstValue", Order.ATOMIC);
  const second = generator.valueToCode(block, "secondValue", Order.ATOMIC);
  return `until(${first},${second})`;
};