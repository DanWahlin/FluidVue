<template>
  <div class="container">
    <div class="pad">
      <div class="note editor">
        <textarea
          class="note-text"
          @keyup="onKeyUp($event)"
          @focus="onNoteFocus($event)"
          :value="noteValue"
        ></textarea>
      </div>
      <button class="button" :disabled="disabled" @click="createNote()">
        Share my idea
      </button>
      <button class="button" :disabled="disabled" @click="handleHighlight()">
        {{ highlightMineClone ? "Stop highlighting" : "Highlight my ideas" }}
      </button>
      <UserName v-if="user && users" :user="user" :userCount="users.length" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, SetupContext } from "vue";
import { getBooleanType, getObjectType } from '../shared/propTypes';
import { Notero } from "../services/noteroDataObject";
import { IUser } from "../shared/interfaces";
import UserName from "./username.vue";

interface IProps {
    model: Notero,
    user: IUser,
    users: IUser[],
    highlightMine: boolean
}

export default defineComponent({
  name: "Pad",
  components: { UserName },
  props: {
    model: getObjectType<Notero>({}),
    user: getObjectType<IUser>({}),
    users: getObjectType<IUser[]>({}),
    highlightMine: getBooleanType(false)
  },
  setup(props: IProps, context: SetupContext) {
    const { model } = toRefs(props);
    // Can't update highlightMine (readonly) so creating a clone
    const highlightMineClone = ref(props.highlightMine);
    const noteValue = ref('');
    const disabled = ref(false);

    function createNote() {
      model?.value.createNote(noteValue.value);
      noteValue.value = '';
    }

    function onNoteFocus(e: any) {
      if (!noteValue.value.length && model.value) {
        noteValue.value = model.value.createDemoNote();
      }
    }

    function onKeyUp(e: any) {
      // Handle enter
      if (e.keyCode == 13 && !e.shiftKey) {
        e.preventDefault();
        model?.value.createNote(noteValue.value);
        noteValue.value = '';
        e.target.blur();
      } else {
        noteValue.value = e.target.value;
      }
    }

    function handleHighlight() {
        highlightMineClone.value = !highlightMineClone?.value;
        context.emit("on-highlight-mine", highlightMineClone?.value);
    }

    return {
      highlightMineClone,
      noteValue,
      disabled,
      createNote,
      handleHighlight,
      onKeyUp,
      onNoteFocus,
    };
  },
});
</script>