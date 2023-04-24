<template>
  <HeaderSection :show-action-option="true" @routeBack="removeSelectedAction">
    <template #title>
      <div class="add-action-title">
        <font-awesome-icon icon="fa-angle-left" class="goBackIcon" @click="removeSelectedAction" /> {{selectedAction.actionName}}
      </div>
    </template>
  </HeaderSection>

  <!-- form for customer tag  -->
  <div class="action-body" v-if="selectedAction.actionId === '1'">
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

  <!-- form for http request  -->
  <div class="action-body" v-if="selectedAction.actionId === '5'">
    <p class="label">Request Endpoint</p>
    <input type="url" class="requestEndpointInput" placeholder="Enter Endpoint...">
    <p class="label">Request Method</p>
    <select name="requestMethod" id="requestMethod" @change="setRequestMethod">
      <option value="Post" selected>Post</option>
      <option value="Put">Put</option>
      <option value="Delete">Delete</option>
      <option value="Patch">Patch</option>
    </select>
    <div class="keyValueHeader">
      <div class="flex">
        <div>Key</div>
        <div>Value</div>
        <font-awesome-icon icon="fa-solid fa-plus" class="header-actionBox-icon cursor-pointer" @click="addNewKeyValue" />
      </div>
      <div class="flex border-top" v-for="item in requestkeyValues" :key="item.id">
        <input type="text" placeholder="Enter Key..." class="keyValueInput" v-model="item.key">
        <input type="text" placeholder="Enter Value..." class="keyValueInput" v-model="item.vlaue">
        <font-awesome-icon icon="fa-solid fa-trash-can" class="header-actionBox-icon cursor-pointer" @click="deleteKeyValue(item.id)" />
      </div>
    </div>
    <p class="label">Request Body</p>
    <textarea cols="30" rows="10"></textarea>
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

// http reqest section
const requestkeyValues = ref([]);
const setRequestMethod = (event) => {
  console.log('selected method is ', event.target.value);
}
const addNewKeyValue = () => {
  requestkeyValues.value.push({key: '', value: '', id: uuid.v4()})
}
const deleteKeyValue = (id) => {
  requestkeyValues.value = requestkeyValues.value.filter(el=> {
    if(el.id === id) {
      return null;
    }
    return el;
  })
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
.keyValueHeader {
  margin: 1rem 0;
  @include bordered($color: $muted-light, $type: solid);
  border-radius: 1rem;
  width: 100%;
}
.flex{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1rem;
  width: calc(100%-2rem);
}
.border-top {
  border-top: 1px solid $muted-light;
}
.requestEndpointInput, textarea{
  border: 1px solid $muted-light;
  border-radius: 1rem;
  width: 87%;
  padding: 1rem;
}
.keyValueInput{
  width: 40%;
  border-right: 1px solid $muted-light;
}
.cursor-pointer{
  cursor: pointer;
}
select{
  border: 1px solid $muted-light;
  border-radius: 1rem;
  width: 100%;
  height: 48px;
  padding: 1rem;
}
.label{
  font-size: 1rem;
  font-weight: 600;
  color: $primary;
}
</style>
