<template>
  <div>
    <h1>Collaborative TextArea Fluid Demo</h1>
    This demonstration shows how to use Fluid distributed data structures to sync data across multiple clients.
    After starting the demo (see the readme for instructions), copy the browser's URL into another tab to create another Fluid client. 
    <br /><br />
    After multiple clients are available, type into the text area and notice that all changes are synced across clients.
    <br />
    <div class="text-area" v-if="sharedString">
      <CollaborativeTextArea :sharedString="sharedString" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted } from 'vue';
import { CollaborativeText } from './services/collaborative-text.dataobject';
import { FluidLoaderService } from './services/fluidLoaderService';
import { CollaborativeTextContainerRuntimeFactory } from './services/containerCode';
import { SharedString } from '@fluidframework/sequence';
import CollaborativeTextArea from './components/collaborative-textarea.vue';

export default defineComponent({
  name: 'App',
  components: { CollaborativeTextArea },
  setup() {
    const sharedString: Ref<SharedString | undefined> = ref();

    onMounted(async () => {
      const fluidService = new FluidLoaderService();
      const dataObject = await fluidService.loadDataObject<CollaborativeText>(CollaborativeTextContainerRuntimeFactory);
      sharedString.value = dataObject.text;
    });

    return {
      sharedString
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
