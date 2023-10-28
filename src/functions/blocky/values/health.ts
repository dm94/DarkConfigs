import * as Blockly from "blockly/core";
import { javascriptGenerator, Order } from "blockly/javascript";

Blockly.Blocks["healthValue"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Health from")
      .appendField(new Blockly.FieldDropdown([
          ["hero()", "hero()"],
          ["target()", "target()"],
        ]), "shipType");
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setInputsInline(true);
    this.setOutput(true, 'Health');
    this.setColour(120);
    this.setTooltip("Gets the health of a ship");
  },
};

javascriptGenerator.forBlock["healthValue"] = function (block: any) {
  const shipType = block.getFieldValue("shipType");
  return [`health(${shipType})`, Order.ATOMIC];
};