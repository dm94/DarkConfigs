<script setup lang="ts">
import BlocklyComponent from "./components/blockly-component.vue";
import "@/functions/blocky/conditions";
import "@/functions/blocky/values";
import { javascriptGenerator } from "blockly/javascript";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const blocky = ref();
const code = ref();

const { t } = useI18n();

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
            <category name="Number values" colour="40">
                <block type="distanceValue"></block>
                <block type="hpTypeValue"></block>
                <block type="numberConstant"></block>
                <block type="percentConstant"></block>
                <block type="statTypeValue"></block>
            </category>
            <category name="Location values" colour="60">
                <block type="locationConstant"></block>
                <block type="shipLocationValue"></block>
            </category>
            <category name="Map values" colour="80">
                <block type="heroMapValue"></block>
                <block type="mapConstant"></block>
                <block type="mapConstantString"></block>
            </category>
            <category name="String values" colour="100">
                <block type="nameValue"></block>
                <block type="stringConstant"></block>
            </category>
            <category name="Other values" colour="120">
                <block type="booleanConstant"></block>
                <block type="healthValue"></block>
            </category>
        </xml>`,
};

const generateCode = () => {
    code.value = javascriptGenerator.workspaceToCode(blocky.value.workspace).replaceAll(";", "");
};

</script>
<template>
    <div class="flex container mx-auto p-4 gap-8 flex-col" data-testid="maker-page">
        <p class="code flex p-4 gap-4 flex-col w-100">
            <button
                class="mx-auto max-w-xl text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                @click="generateCode()">{{ t("maker.generateButton") }}</button>
        <pre class="bg-gray-100 p-1">{{ code }}</pre>
        </p>
        <BlocklyComponent id="blockly2" :options="options" ref="blocky"></BlocklyComponent>
    </div>
</template>
<style>
#blockly2 {
    height: 80vh;
    width: 100%;
}
</style>@/functions/blocky/conditions@/functions/blocky/values