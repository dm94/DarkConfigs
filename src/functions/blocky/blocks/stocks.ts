import * as Blockly from "blockly/core";
import {javascriptGenerator, Order} from "blockly/javascript";

Blockly.Blocks["stock_buy_simple"] = {
  init: function () {
    this.appendValueInput("Number")
      .setCheck("Number")
      .appendField("Buy Stock ID")
      .appendField(new Blockly.FieldNumber(0), "ID")
      .appendField("For amount")
      .appendField(new Blockly.FieldNumber(0), "Amount")
      .appendField("At Price")
      .appendField(new Blockly.FieldNumber(0), "Price");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "String");
    this.setColour(230);
    this.setTooltip("buy id");
    this.setHelpUrl("https://example.com");
  },
};

javascriptGenerator.forBlock["stock_buy_simple"] = function (block, generator) {
  var number_id = block.getFieldValue("ID");
  var number_amount = block.getFieldValue("Amount");
  var number_price = block.getFieldValue("Price");
  var value_number = generator.valueToCode(block, "Number", Order.ATOMIC);
  var code = `buy(${number_id},${number_amount},${number_price},${value_number});\n`;
  return code;
};

Blockly.Blocks["stock_buy_prog"] = {
  init: function () {
    this.appendValueInput("Number")
      .setCheck("Number")
      .appendField("Buy Stock ID");
    this.appendValueInput("NAME").setCheck("Number").appendField("For amount");
    this.appendValueInput("NAME").setCheck("Number").appendField("At Price");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "String");
    this.setColour(230);
    this.setTooltip("buy id");
    this.setHelpUrl("https://example.com");
  },
};

javascriptGenerator.forBlock["stock_buy_prog"] = function (block, generator) {
  var value_number = generator.valueToCode(block, "Number", Order.ATOMIC);
  var value_name = generator.valueToCode(block, "NAME", Order.ATOMIC);
  var code = `buy(${value_number},${value_name},${value_name});\n`;
  return code;
};

Blockly.Blocks["stock_fetch_price"] = {
  init: function () {
    this.appendValueInput("Fetch")
      .setCheck("Number")
      .appendField("Fetch Price of Stock ID:");
    this.appendDummyInput()
      .appendField("And set to:")
      .appendField(new Blockly.FieldVariable("item"), "variable");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("fetch stock price");
    this.setHelpUrl("https://example.com");
  },
};

javascriptGenerator.forBlock["stock_fetch_price"] = function (
  block,
  generator
) {
  var value_fetch = generator.valueToCode(block, "Fetch", Order.ATOMIC);
  var variable_variable = generator.nameDB_.getName(
    block.getFieldValue("variable"),
    Blockly.names.NameType.VARIABLE
  );
  var code = `fetch_price(${value_fetch},${variable_variable});\n`;
  return code;
};