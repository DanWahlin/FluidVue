<template>
  <div v-if="model">
    <Pad
      :model="model"
      :user="user"
      :users="users"
      :highlightMine="highlightMine"
      @on-highlight-mine="onHighlightMine($event)" />
    <Board
      :model="model"
      :notes="notes"
      :user="user"
      :highlightMine="highlightMine" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, Ref, ref, watch, toRefs } from 'vue';
import Pad from './pad.vue';
import Board from './board.vue';
import { Notero } from '../services/noteroDataObject';
import { INote, IUser } from '../shared/interfaces';

export default defineComponent({
  name: 'NoteroBoard',
  components: { Pad, Board },
  props: {
    model: Notero
  },
  setup(props) {
    let { model } = toRefs(props);
    let notes: Ref<INote[] | undefined> = ref();
    let user: Ref<IUser | undefined> = ref();
    let users: Ref<IUser[] | undefined> = ref();
    let highlightMine: Ref<boolean> = ref(false);

    watch(() => props.model, (model, prevModel) => {
      // If first time model has a value then hook up 'changed' event
      if (model && !prevModel) {
        notes.value = model.getNotesFromBoard();
        model.on('changed', changed); 
      }
    });

    function changed(changeType: any) {
      if (model && model.value) {
        switch (changeType) {
          case 'valueChanged':
              notes.value = model.value.getNotesFromBoard();
              break;
          case 'addMember':
          case 'removeMember':
            user.value = model.value.getUser();
            users.value = model.value.getUsers();
            break;
        }
      }
    }

    function onHighlightMine(highlight: boolean) {
        highlightMine.value = highlight;
    }

    onUnmounted(() => {
      if (model && model.value) {
        model.value.off('changed', changed);
      }
    });

    return { notes, user, users, highlightMine, onHighlightMine };
  }
});
</script>

<style>
</style>