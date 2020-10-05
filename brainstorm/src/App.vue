<template>
  <NoteroBoard :model="dataObject" />
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
