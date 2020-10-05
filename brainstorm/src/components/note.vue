<template>
    <button v-if="note && note.user && user" class="note"
      :class="{ others: note.user.id != user.id && highlightMine }">
        <span v-if="count > 0" class="note-badge" :class="{ voted: note.currentUserVoted }">
          {{ count }}
        </span>
      <span class="note-text">{{ note.text }}</span>
    </button>  
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Note',
  props: {
    note: Object,
    highlightMine: Boolean,
    user: Object,
    count: Number
  }
});
</script>