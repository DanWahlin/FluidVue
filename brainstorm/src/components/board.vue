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
import { getBooleanType, getObjectType } from '../shared/propTypes';
import { Notero } from '../services/noteroDataObject';
import Note from './note.vue';
import { INote, INoteWithVotes, IUser } from '../shared/interfaces';

export default defineComponent({
  name: 'Board',
  components: { Note },
  props: {
    model: getObjectType<Notero>({}),
    notes: getObjectType<INoteWithVotes>([]),
    user: getObjectType<IUser>({}),
    highlightMine: getBooleanType(false)
  },
  methods: {
    vote(note: INote) {
        this.model?.vote(note);
    }
  }
});
</script>