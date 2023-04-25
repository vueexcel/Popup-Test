<template>
  <div class="header">
    <slot name="title"></slot>
    <font-awesome-icon icon="fa-solid fa-ellipsis" class="actionIcon" v-if="showActionOption" @click="toggleActionOptions" />
    <div class="header-actionBox" v-if="showActions">
      <div class="header-actionBox--inactive" @click="makeCurrentActionInactive">
        <font-awesome-icon icon="fa-solid fa-toggle-on" class="header-actionBox-icon" v-if="!selectedAction.isActive" />
        <font-awesome-icon icon="fa-solid fa-toggle-off" class="header-actionBox-icon" v-else /> Make inactive
      </div>
      <div class="header-actionBox--delete" @click="deleteSelectedAction">
        <font-awesome-icon icon="fa-solid fa-trash-can" class="header-actionBox-icon" /> Delete action
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, computed } from "vue"
import { useStore } from "vuex";

const emit = defineEmits(['routeBack']);
const props = defineProps(['showActionOption']);
const { showActionOption } = toRefs(props);

const makeCurrentActionInactive = () => {
  store.dispatch('makeActionInActive');
  emit('routeBack');
}

const showActions = ref(false);
const toggleActionOptions = () => {
  showActions.value = !showActions.value
}

const store = useStore();
const selectedAction = computed(()=> {
  return store.getters.getSelectedStore;
})

const deleteSelectedAction = () => {
  store.dispatch('deleteAction');
  emit('routeBack');
};

</script>

<style lang="scss" scoped>
.header-actionBox {
  position: absolute;
  top: 3rem;
  right: 1rem;
  font-size: 1.14rem;
  padding: 0.5rem 1rem;
  background-color: $white;
  box-shadow: 0px 14px 60px rgba(0, 0, 0, 0.09);
  border-radius: 14px;

  .header-actionBox-icon {
    margin-right: 0.5rem;
  }

  .header-actionBox--inactive {
    color: $primary;
    margin: 0.5rem 0;
    cursor: pointer;
  }
  .header-actionBox--delete {
    color: $danger;
    cursor: pointer;
  }
}
</style>
