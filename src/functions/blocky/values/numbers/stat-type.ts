import * as Blockly from "blockly/core";
import { javascriptGenerator, Order } from "blockly/javascript";

Blockly.Blocks.statTypeValue = {
  init: function () {
    this.appendDummyInput()
      .appendField("Stat: ")
      .appendField(
        new Blockly.FieldDropdown(this.generateTypeOptions),
        "statType",
      );
    this.appendDummyInput()
      .appendField("Data Type:")
      .appendField(
        new Blockly.FieldDropdown(this.generateDataOptions),
        "dataType",
      );
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setOutput(true, "Number");
    this.setColour(40);
    this.setTooltip("Gets a certain HP type from a health");
  },
  generateTypeOptions: () => {
    const options: string[][] = [];
    const all = [
      "CREDITS",
      "URIDIUM",
      "EXPERIENCE",
      "HONOR",
      "CARGO",
      "MAX_CARGO",
      "NOVA_ENERGY",
      "TELEPORT_BONUS_AMOUNT",
      "PING",
      "TICK_TIME",
      "MEMORY",
      "CPU",
      "RUNTIME",
      "GREEN",
      "BLUE",
      "RED",
      "SILVER",
      "APOCALYPSE",
      "PROMETHEUS",
      "OBSIDIAN_MICROCHIP",
      "BLACK_LIGHT_CODE",
      "BLACK_LIGHT_DECODER",
      "PROSPEROUS_FRAGMENT",
      "ASTRAL",
      "ASTRAL_SUPREME",
      "EMPYRIAN",
      "LUCENT",
      "PERSEUS",
    ];

    all.forEach((option) => {
      const custom = option.toLowerCase().replaceAll("_", "-");
      options.push([custom, custom]);
    });

    return options;
  },
  generateDataOptions: () => {
    const options: string[][] = [];
    const all = ["INITIAL", "CURRENT", "EARNED", "SPENT", "DIFFERENCE"];

    all.forEach((option) => {
      const custom = option.toLowerCase();
      options.push([custom, custom]);
    });

    return options;
  },
};

javascriptGenerator.forBlock.statTypeValue = (block: any) => {
  const statType = block.getFieldValue("statType");
  const dataType = block.getFieldValue("dataType");
  return [`stat-type(${statType}, ${dataType})`, Order.ATOMIC];
};
