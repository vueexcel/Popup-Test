<template>
  <div v-for="action in allRandomActions" :key="action.id" class="width-100">
    <div class="action-container">
      <div class="title" :class="{'disable' : !action.isActive}">
        <font-awesome-icon :icon="action.actionIcon" class="action-icon" /> {{action.actionName}}
      </div>
      <div v-if="action.data.length && action.actionId == '1' && action.isActive" class="inner-container" :class="{'disable' : !action.isActive}">
        <div v-for="tag in action.data" :key="tag.tagId" class="style-list">
          <font-awesome-icon icon="fa-solid fa-circle" class="action-icon" :style="{color: `${tag.tagColor}`}" /> {{tag.tagName}}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const allRandomActions = computed(()=> {
  return store.getters.getRandomSelectedActions;
})
</script>

<style lang="scss" scoped>
.width-100 {
  width: 100%;
}
.action-container {
  @include bordered($color: $muted-light);
  width: calc(100%-2rem);
  border-radius: 1rem;
  margin: 1rem;
  .title{
    width: 100%;
    font-size: 1.14rem;
    color: $primary;
    padding: 1rem;
  }
  .action-icon {
    margin-right: 0.5rem;
  }

  .inner-container {
    padding: 0 1rem;
    border-top: 1px solid $muted-light;
  }

  .disable {
    @extend .title;
    color: $secondary-300;
    cursor: not-allowed;
    position: relative;
    .selected-action-title{
      color: $secondary-300;
    }
  }
}
</style>
