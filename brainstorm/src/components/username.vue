<template>
    <div class="userName">
      <span>{{ user.name }}</span>
      <span class="userCount">
        (with {{ userCount - 1}} 
        {{ userCount === 2 ? "person" : "people"}})
      </span>
    </div>  
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UserName',
  props: {
    user: Object,
    userCount: Number
  }
});
</script>