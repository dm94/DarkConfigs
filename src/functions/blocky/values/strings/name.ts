import * as Blockly from "blockly/core";
import { javascriptGenerator, Order } from "blockly/javascript";
import { shipTypes } from "../../dropdowns/ship-types";

Blockly.Blocks["nameValue"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Name of")
      .appendField(new Blockly.FieldDropdown(shipTypes), "shipType");
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setInputsInline(true);
    this.setOutput(true, 'String');
    this.setColour(100);
    this.setTooltip("Gets the name of the ship or npc");
  },
};

javascriptGenerator.forBlock["nameValue"] = function (block: any) {
  const shipType = block.getFieldValue("shipType");
  return [`name("${shipType}")`, Order.ATOMIC];
};