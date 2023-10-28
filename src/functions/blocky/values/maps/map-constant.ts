import * as Blockly from "blockly/core";
import { javascriptGenerator, Order } from "blockly/javascript";

Blockly.Blocks["mapConstant"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Map Name:")
      .appendField(new Blockly.FieldDropdown(this.generateMaps()), "map");
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setOutput(true, 'Map');
    this.setColour(80);
    this.setTooltip("Creates a map constant");
  },
  generateMaps: function() {
    let options: string[][] = [];
    
    for (let c = 1; c<4; c++) {
      for (let s = 1; s<9; s++) {
        options.push([`${c}-${s}`, `${c}-${s}`]);
      }
      options.push([`${c}BL`, `${c}BL`]);
      options.push([`5-${c}`, `5-${c}`]);
    }
    options.push(["5-4", "5-4"]);

    return options;
  }
};

javascriptGenerator.forBlock["mapConstant"] = function (block: any) {
  const type = block.getFieldValue("map");
  return [`map("${type}")`, Order.ATOMIC];
};