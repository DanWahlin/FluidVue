<template>
  <div>
    <h1>Dice Roller Fluid Demo</h1>
    This demonstration shows how to use Fluid distributed data structures to sync data across multiple clients.
    After starting the demo (see the readme for instructions), copy the browser's URL into another tab to create another Fluid client. 
    <br /><br />
    After multiple clients are available, click the Roll button to sync rolls across all of the clients.
    <br />
    <div style="text-align: center">
      <div style="font-size: 200px;" :style="{color: diceCharColor }">
        {{diceChar}}
      </div>
      <button style="font-size: 50px" @click="roll">Roll</button>
    </div>
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
    let dataObject: DiceRoller;

    onMounted(async () => {
      let fluidService = new FluidLoaderService();
      dataObject = await fluidService.loadDataObject<DiceRoller>(DiceRollerContainerRuntimeFactory);
      dataObject.on('diceRolled', updateDiceChar);
      updateDiceChar(dataObject.value);
    });

    function roll() { dataObject.roll(); }

    function updateDiceChar(val: number) {
      // Unicode 0x2680-0x2685 are the sides of a dice (⚀⚁⚂⚃⚄⚅)
      diceChar.value = String.fromCodePoint(0x267F + val);
      diceCharColor.value = `hsl(${val * 60}, 70%, 50%)`;
    }

    onUnmounted(() => {
      dataObject.off('diceRolled', updateDiceChar);
    });

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
