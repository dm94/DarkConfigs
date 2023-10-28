<script setup lang="ts">
import BlocklyComponent from "./components/blockly-component.vue";
import "@/functions/blocky/conditions";
import "@/functions/blocky/values";
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
                <block type="hasRelationCondition"></block>
                <block type="untilCondition"></block>
            </category>
            <category name="Number values" colour="%{BKY_MATH_HUE}">
                <block type="distanceValue"></block>
            </category>
            <category name="Other values" colour="%{BKY_VARIABLES_HUE}">
                <block type="booleanConstant"></block>
            </category>
            <category name="Text" colour="%{BKY_TEXTS_HUE}">
                <block type="text"></block>
                <block type="text_length"></block>
                <block type="text_print"></block>
            </category>
            <category name="Variables" custom="VARIABLE" colour="%{BKY_VARIABLES_HUE}">
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
</style>@/functions/blocky/conditions@/functions/blocky/values