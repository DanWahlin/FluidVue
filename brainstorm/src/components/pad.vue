<template>
    <div class="container">
      <div class="pad">
        <div class="note editor">
          <textarea class="note-text"
            @keyup="onKeyUp($event)"
            @focus="onNoteFocus($event)"
            :value="value"
          ></textarea>
        </div>
        <button class="button" :disabled="disabled" @click="createNote()">Share my idea</button>
        <button class="button" :disabled="disabled" @click="handleHighlight()">
          {{ highlightMineValue ? "Stop highlighting" : "Highlight my ideas" }}
        </button>
        <UserName v-if="user && users" :user="user" :userCount="users.length" />
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Notero } from '../services/noteroDataObject';
import UserName from './username.vue';

export default defineComponent({
  name: 'Pad',
  components: { UserName },
  props: {
    model: Notero,
    user: Object,
    users: Array,
    highlightMine: Boolean
  },
  setup(props) {
    let highlightMineValue = ref(props.highlightMine);
    let value = ref('');
    let disabled = ref(false);

    return { highlightMineValue, value, disabled }
  },
  methods: {
    createNote() {
        this.model?.createNote(this.value);
        this.value = '';
    },

    onNoteFocus(e: any) {
        if (!this.value.length  && this.model) {
          this.value = this.model.createDemoNote();
        }
    },

    onKeyUp(e: any) {
        // Handle enter
        if (e.keyCode == 13 && !e.shiftKey) {
            e.preventDefault();
            this.model?.createNote(this.value);
            this.value = '';
            e.target.blur();
        }
        else {
            this.value = e.target.value;
        }
    },

    handleHighlight() {
        this.highlightMineValue = !this.highlightMineValue;
        this.$emit('on-highlight-mine', this.highlightMineValue);
    }
  }
});
</script>