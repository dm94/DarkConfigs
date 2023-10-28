<script setup lang="ts">
import BlocklyComponent from "./components/blockly-component.vue";
import "@/functions/blocky/blocks/stocks";
import "@/functions/blocky/blocks/conditions";
import { javascriptGenerator } from "blockly/javascript";
import { ref } from "vue";

const blocky = ref();
const code = ref();
const options = {
    media: "media/",
    grid: {
        spacing: 25,
        length: 3,
        colour: "#ccc",
        snap: true,
    },
    toolbox: `<xml>
            <category name="Logic" colour="%{BKY_LOGIC_HUE}">
                <block type="controls_if"></block>
                <block type="logic_compare"></block>
                <block type="logic_operation"></block>
                <block type="logic_negate"></block>
                <block type="logic_boolean"></block>
            </category>
            <category name="Loops" colour="%{BKY_LOOPS_HUE}">
                <block type="controls_repeat_ext">
                <value name="TIMES">
                    <block type="math_number">
                    <field name="NUM">10</field>
                    </block>
                </value>
                </block>
                <block type="controls_whileUntil"></block>
            </category>
            <category name="Math" colour="%{BKY_MATH_HUE}">
                <block type="math_number">
                <field name="NUM">123</field>
                </block>
                <block type="math_arithmetic"></block>
                <block type="math_single"></block>
            </category>
            <category name="Text" colour="%{BKY_TEXTS_HUE}">
                <block type="text"></block>
                <block type="text_length"></block>
                <block type="text_print"></block>
            </category>
            <category name="Variables" custom="VARIABLE" colour="%{BKY_VARIABLES_HUE}">
                </category>
            <category name="Stocks" colour="%{BKY_LOOPS_HUE}">
                <block type="stock_buy_simple"></block>
                <block type="stock_buy_prog"></block>
                <block type="stock_fetch_price"></block>
            </category>
            <category name="Conditions" colour="%{BKY_LOGIC_HUE}">
                <block type="afterCondition"></block>
                <block type="allCondition"></block>
                <block type="anyCondition"></block>
                <block type="equalCondition"></block>
                <block type="hasEffectCondition"></block>
                <block type="hasFormationCondition"></block>
                <block type="noneCondition"></block>
                <block type="numericalCondition"></block>
                <block type="oneCondition"></block>
            </category>
        </xml>`,
};

const showCode = () => {
    code.value = javascriptGenerator.workspaceToCode(blocky.value.workspace);
};

</script>
<template>
    <div class="flex container mx-auto p-4 gap-8 flex-col" data-testid="maker-page">
        <BlocklyComponent id="blockly2" :options="options" ref="blocky"></BlocklyComponent>
        <p class="code">
            <button @click="showCode()">Show condition</button>
        <pre v-html="code"></pre>
        </p>
    </div>
</template>
<style>
.code {
    min-height: 50px;
    width: 100%;
}

#blockly2 {
    height: 80vh;
    width: 100%;
}
</style>