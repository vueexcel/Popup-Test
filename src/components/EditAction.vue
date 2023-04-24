<template>
  <HeaderSection :show-action-option="true" @routeBack="removeSelectedAction">
    <template #title>
      <div class="add-action-title">
        <font-awesome-icon icon="fa-angle-left" class="goBackIcon" @click="removeSelectedAction" /> {{selectedAction.actionName}}
      </div>
    </template>
  </HeaderSection>
  <div class="action-body">
    <div class="search-actions">
      <font-awesome-icon
        icon="fa-solid fa-plus"
        class="search-actions-icon"
      />
      <input
        type="text"
        placeholder="Add Tag..."
        class="search-actions-input"
        v-model="newTag"
        @keyup.enter="addTag"
      />
    </div>
    <div v-if="selectedAction.data.length">
      <div v-for="tag in selectedAction.data" :key="tag.tagId" class="style-list">
        <div class="tagBox">
          <div>
            <font-awesome-icon icon="fa-solid fa-circle" class="action-icon" :style="{color: `${tag.tagColor}`}" /> {{tag.tagName}}
          </div>
          <font-awesome-icon icon="fa-solid fa-trash-can" class="tag-delete" @click="deleteTag(tag.tagId)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import HeaderSection from './HeaderSection.vue';
import {uuid} from 'vue3-uuid';
const store = useStore();

const selectedAction = computed(()=> {
  return store.getters.getSelectedStore;
})

const removeSelectedAction = () => {
  store.dispatch('setSelectedStore', {})
}

const newTag = ref('');
const addTag = () => {
  if(newTag.value.trim().length) {
    let data = {
      tagName: newTag.value,
      tagColor: '#'+Math.floor(Math.random()*16777215).toString(16),
      tagId: uuid.v4()
    }
    store.dispatch('setSelectedActionData', data);
    newTag.value = '';
  }
}
const deleteTag = (id) => {
  store.dispatch('deleteTagInSelectedAction', id);
}
</script>

<style lang="scss" scoped>
.action-body {
  padding: 22px;
}
.tagBox{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .action-icon{
    margin-right: 0.5rem;
  }
  .tag-delete {
    cursor: pointer;
    color: $danger;
  }
}
</style>
