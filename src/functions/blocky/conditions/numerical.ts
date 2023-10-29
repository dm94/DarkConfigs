import * as Blockly from "blockly/core";
import {javascriptGenerator, Order} from "blockly/javascript";

Blockly.Blocks['numericalCondition'] = {
  init: function() {
    this.appendValueInput('firstNumber')
        .setCheck('Number')
        .appendField('if');
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ['>', '>'],
          ['>=', '>='],
          ['=', '='],
          ['<=', '<='],
          ['<', '<']
        ]), "operator");
    this.appendValueInput('secondNumber')
        .setCheck('Number');
    this.setInputsInline(true);
    this.setPreviousStatement(true, "Boolean");
    this.setNextStatement(true, "Boolean");
    this.setOutput(true, 'Boolean');
    this.setColour(200);
    this.setTooltip('Compares two numbers');
  }
};

javascriptGenerator.forBlock['numericalCondition'] = function (block: any, generator: any) {
  const firstNumber = generator.valueToCode(block, 'firstNumber', Order.ATOMIC);
  const operator = block.getFieldValue("operator");
  const secondNumber = generator.valueToCode(block, 'secondNumber', Order.ATOMIC);

  return `if(${firstNumber}${operator}${secondNumber});`;
};