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

const toolbox = {
    "kind": "categoryToolbox",
    "contents": [
        {
            "kind": "category",
            "name": "Conditions",
            "colour": "200",
            "contents": [
                {
                    "kind": "block",
                    "type": "afterCondition"
                },
                {
                    "kind": "block",
                    "type": "allCondition"
                },
                {
                    "kind": "block",
                    "type": "anyCondition"
                },
                {
                    "kind": "block",
                    "type": "equalCondition"
                },
                {
                    "kind": "block",
                    "type": "hasEffectCondition"
                },
                {
                    "kind": "block",
                    "type": "hasFormationCondition"
                },
                {
                    "kind": "block",
                    "type": "noneCondition"
                },
                {
                    "kind": "block",
                    "type": "numericalCondition"
                },
                {
                    "kind": "block",
                    "type": "oneCondition"
                },
                {
                    "kind": "block",
                    "type": "hasRelationCondition"
                },
                {
                    "kind": "block",
                    "type": "untilCondition"
                },
            ]
        },
        {
            "kind": "category",
            "name": "Number values",
            "colour": "40",
            "contents": [
                {
                    "kind": "block",
                    "type": "distanceValue"
                },
                {
                    "kind": "block",
                    "type": "hpTypeValue"
                },
                {
                    "kind": "block",
                    "type": "numberConstant"
                },
                {
                    "kind": "block",
                    "type": "percentConstant"
                },
                {
                    "kind": "block",
                    "type": "statTypeValue"
                }
            ]
        },
        {
            "kind": "category",
            "name": "Location values",
            "colour": "60",
            "contents": [
                {
                    "kind": "block",
                    "type": "locationConstant"
                },
                {
                    "kind": "block",
                    "type": "shipLocationValue"
                }
            ]
        },
        {
            "kind": "category",
            "name": "Map values",
            "colour": "80",
            "contents": [
                {
                    "kind": "block",
                    "type": "heroMapValue"
                },
                {
                    "kind": "block",
                    "type": "mapConstant"
                },
                {
                    "kind": "block",
                    "type": "mapConstantString"
                }
            ]
        },
        {
            "kind": "category",
            "name": "String values",
            "colour": "100",
            "contents": [
                {
                    "kind": "block",
                    "type": "nameValue"
                },
                {
                    "kind": "block",
                    "type": "stringConstant"
                }
            ]
        },
        {
            "kind": "category",
            "name": "Other values",
            "colour": "120",
            "contents": [
                {
                    "kind": "block",
                    "type": "booleanConstant"
                },
                {
                    "kind": "block",
                    "type": "healthValue"
                }
            ]
        }
    ]
};

const options = {
    media: "media/",
    grid: {
        spacing: 25,
        length: 3,
        colour: "#ccc",
        snap: true,
    },
    toolbox: toolbox,
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