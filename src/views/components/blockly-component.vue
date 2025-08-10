<script setup lang="ts">
/**
 * REF: https://github.com/google/blockly-samples/blob/master/examples/blockly-vue3/src/components/BlocklyComponent.vue
 */

import { onMounted, ref, shallowRef } from "vue";
import * as Blockly from "blockly";

const props = defineProps(["options"]);
const blocklyToolbox = ref();
const blocklyDiv = ref();
const workspace = shallowRef();

defineExpose({ workspace });

onMounted(() => {
  const options = props.options || {};
  if (!options.toolbox) {
    options.toolbox = blocklyToolbox.value;
  }
  workspace.value = Blockly.inject(blocklyDiv.value, options);
});
</script>

<template>
  <div>
    <div
      ref="blocklyDiv"
      class="blocklyDiv"
    />
    <xml
      ref="blocklyToolbox"
      style="display: none"
    >
      <slot />
    </xml>
  </div>
</template>

<style scoped>
.blocklyDiv {
  height: 100%;
  width: 100%;
  text-align: left;
}
</style>
