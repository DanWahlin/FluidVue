<template>
  <div style="text-align: center">
    <div style="font-size: 200px;" :style="{color: diceCharColor }">
      {{diceChar}}
    </div>
    <button style="font-size: 50px" @click="roll">Roll</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, onUnmounted } from 'vue';
import { DiceRoller } from './services/dicerollerDataObject';
import { FluidLoaderService } from './services/fluidLoaderService';
import { DiceRollerContainerRuntimeFactory } from './services/containerCode';

export default defineComponent({
  setup() {
    let diceChar = ref('');
    let diceCharColor = ref('');
    let dataObject: any = null;

    onMounted(async () => {
      let fluidService = new FluidLoaderService();
      dataObject = await fluidService.loadDataObject<DiceRoller>(DiceRollerContainerRuntimeFactory);
      dataObject.on('diceRolled', updateDiceChar);
      updateDiceChar(dataObject.value);
    });

    onUnmounted(() => {
      dataObject.off('diceRolled', updateDiceChar);
    });

    const roll = () => dataObject.roll();

    const updateDiceChar = (val: number) => {
      // Unicode 0x2680-0x2685 are the sides of a dice (⚀⚁⚂⚃⚄⚅)
      diceChar.value = String.fromCodePoint(0x267F + val);
      diceCharColor.value = `hsl(${val * 60}, 70%, 50%)`;
    }

    return {
      diceChar,
      diceCharColor,
      roll
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
