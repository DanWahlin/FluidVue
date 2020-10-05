<template>
    <div class="board">
        <div v-for="note in notes" :key="note.id">
            <Note
                :note="note"
                :count="note.votes"
                :user="user"
                :highlightMine="highlightMine"
                @click="vote(note)" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import { Notero } from '../services/noteroDataObject';
import Note from './note.vue';
import { INote } from '../shared/interfaces';

export default defineComponent({
  name: 'Board',
  components: { Note },
  props: {
    model: Notero,
    notes: Array,
    user: Object,
    highlightMine: Boolean
  },
  methods: {
    vote(note: INote) {
        this.model?.vote(note);
    }
  }
});
</script>