import * as Blockly from "blockly/core";
import { javascriptGenerator, Order } from "blockly/javascript";
import { shipTypes } from "../../dropdowns/ship-types";

Blockly.Blocks["shipLocationValue"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Location from")
      .appendField(new Blockly.FieldDropdown(shipTypes), "shipType");
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setInputsInline(true);
    this.setOutput(true, 'Location');
    this.setColour(60);
    this.setTooltip("Gets the current location of a ship");
  },
};

javascriptGenerator.forBlock["shipLocationValue"] = function (block: any) {
  const shipType = block.getFieldValue("shipType");
  return [`ship-loc(${shipType})`, Order.ATOMIC];
};