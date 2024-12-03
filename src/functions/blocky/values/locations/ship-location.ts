import * as Blockly from "blockly/core";
import { javascriptGenerator, Order } from "blockly/javascript";

Blockly.Blocks["shipLocationValue"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Location from")
      .appendField(
        new Blockly.FieldDropdown([
          ["hero()", "hero()"],
          ["target()", "target()"],
        ]),
        "shipType",
      );
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setInputsInline(true);
    this.setOutput(true, "Location");
    this.setColour(60);
    this.setTooltip("Gets the current location of a ship");
  },
};

javascriptGenerator.forBlock["shipLocationValue"] = (block: any) => {
  const shipType = block.getFieldValue("shipType");
  return [`ship-loc(${shipType})`, Order.ATOMIC];
};
