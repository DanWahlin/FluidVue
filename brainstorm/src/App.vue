<template>
  <div>
    <h1>Brainstorm Fluid Demo</h1>
    This demonstration shows how to use Fluid distributed data structures to sync data across multiple clients.
    After starting the demo (see the readme for instructions), copy the browser's URL into another tab to create another Fluid client. 
    <br /><br />
    To get started click on the yellow sticky note and press the "Share my idea" button. To vote for a note, click on it. All notes and votes
    will be synced across connected clients.
    <br />
    <NoteroBoard :model="dataObject" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted } from 'vue';
import { Notero } from './services/noteroDataObject';
import { FluidLoaderService } from './services/fluidLoaderService';
import { NoteroContainerFactory } from './services/containerCode';
import NoteroBoard from './components/notero-board.vue';

export default defineComponent({
  name: 'App',
  components: { NoteroBoard },
  setup() {
    let dataObject: Ref<Notero | undefined> = ref();

    onMounted(async () => {
      let fluidService = new FluidLoaderService();
      dataObject.value = await fluidService.loadDataObject<Notero>(NoteroContainerFactory);
    });

    return { dataObject };
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
