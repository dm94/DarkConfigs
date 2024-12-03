import * as Blockly from "blockly/core";
import { javascriptGenerator, Order } from "blockly/javascript";

Blockly.Blocks.heroMapValue = {
  init: function () {
    this.appendDummyInput().appendField("hero-map()");
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setInputsInline(true);
    this.setOutput(true, "Map");
    this.setColour(80);
    this.setTooltip("Gets the current map the hero is in");
  },
};

javascriptGenerator.forBlock.heroMapValue = () => ["hero-map()", Order.ATOMIC];
