<template>
  <HeaderSection v-if="!showAddAction" :show-action-option="true">
    <template #title>
      <div class="header-title" >
        <font-awesome-icon icon="fa-bolt" /> Action
      </div>
    </template>
  </HeaderSection>
  <HeaderSection v-else>
    <template #title>
      <div class="add-action-title">
        <font-awesome-icon icon="fa-angle-left" class="goBackIcon" @click="hideAddActionPannel"/> Add Actions
      </div>
    </template>
  </HeaderSection>

  <div class="action-panel">
    <div style="width: 100%">
    <div v-if="!showAddAction">
      <div class="action-panel-title">Assigned actions</div>
      <div class="action-panel-description">
        The selected actions will run in the background when the user
        journey gets to this element
      </div>
      <div class="selectedActionContainer">
        <button
          class="selected-actions"
          :class="{'disable' : !selectedOption.isActive}"
          v-for="(selectedOption, index) in randomSelectedActions"
          :key="index"
          @click="setSelectedAction(selectedOption)"
          :style="
            selectedOption.actionId === '1'
              ? 'border-top-left-radius:1rem;border-top-right-radius:1rem'
              : 'border-radius:0rem'
          "
          :disabled="!selectedOption.isActive"
        >
          <font-awesome-icon
            :icon="selectedOption.actionIcon"
            class="selected-action-icon"
          />
          <span class="selected-action-title">
            {{ selectedOption.actionName }}
          </span>
          <span class="inactive-status" v-if="!selectedOption.isActive">
            <font-awesome-icon
            icon="fa-solid fa-circle"
          /> Inactive
          </span>
        </button>
        <button
          class="add-actions"
          :style="
            randomSelectedActions.length
              ? `border-bottom-left-radius:1rem;border-bottom-right-radius:1rem`
              : 'border-radius:1rem;margin-top:22px;'
          "
          @click="addActionToSidebar"
        >
          <span>Add actions</span> <font-awesome-icon icon="fa-plus" />
        </button>
      </div>
    </div>


    <div v-else>
      <div class="search-actions">
        <font-awesome-icon
          icon="fa-solid fa-magnifying-glass"
          class="search-actions-icon"
        />
        <input
          type="search"
          placeholder="Search actions..."
          class="search-actions-input"
          v-model="seachInput"
          @input="searchResults"
        />
      </div>
      <div class="popup-actions">
        <div class="popup-actions-heading">Native Popup actions</div>
        <div class="popup-actions-list">
          <div
            class="list"
            v-for="list in filteredList.length ? filteredList : actionLists"
            :key="list.actionId"
          >
            <font-awesome-icon
              :icon="list.actionIcon"
              class="list-tag"
            />
            <div class="list-info">
              <div>{{ list.actionName }}</div>
              <input type="checkbox" class="list-checkbox" v-model="list.value" @change="selectedChecks"/>
            </div>
          </div>
          <!-- <button @click="submit()">Submit</button> -->
        </div>
      </div>
      <div class="app">
        <div class="app-Heading">Integrations with other Apps</div>
        <div class="list">
          <font-awesome-icon icon="fa-solid fa-tag" class="list-tag" />
          <div class="list-info">
            <div>Send data to Goggle Sheet</div>
            <input type="checkbox" class="list-checkbox" />
          </div>
        </div>
      </div>
      <!-- This goes at the bottom of the sidebar, is shown only when we are done selecting the actions -->
      <div class="control" v-if="selectedActions.length">
        <div class="cancel" @click="hideAddActionPannel">Cancel</div>
        <div class="confirm" @click="addSelectedActionToSidebar">Confirm</div>
      </div>
    </div>

    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import HeaderSection from './HeaderSection.vue'
import { useStore } from "vuex";
const store = useStore();

const randomSelectedActions= computed(()=> {
  return store.getters.getRandomSelectedActions;
});
const actionLists = ref([
  {
    actionId: "1",
    actionIcon: "fa-solid fa-tag",
    actionName: "Tag Customer",
    value: false,
  },
  {
    actionId: "2",
    actionName: "Tag order",
    actionIcon: "fa-solid fa-tag",
    value: false,
  },
  {
    actionId: "3",
    actionName: "Send email notification",
    actionIcon: "fa-solid fa-envelope",
    value: false,
  },
  {
    actionId: "4",
    actionName: "Select digital product",
    actionIcon: "fa-solid fa-file-lines",
    value: false,
  },
  {
    actionId: "5",
    actionName: "Make HTTPS request",
    actionIcon: "fa-solid fa-shield",
    value: false,
  },
]);

const showAddAction = ref(false);
const addActionToSidebar = () => {
  showAddAction.value = true
}

const seachInput = ref('');
const selectedActions = ref([]);
const filteredList = ref([]);
const selectedChecks = () => {
  selectedActions.value = actionLists.value.filter((el) => el.value);
};
const searchResults = () => {
  if (seachInput.value.length) {
    filteredList.value = actionLists.value.filter((list) => {
      return list.actionName
        .toLowerCase()
        .includes(seachInput.value.toLowerCase());
    });
  } else {
    filteredList.value = [];
  }
};

const hideAddActionPannel = () => {
  showAddAction.value = false;
  filteredList.value = [];
  selectedActions.value = [];
  actionLists.value.forEach(el=> {
    el.value = false;
  })
}

const addSelectedActionToSidebar = () => {
  store.dispatch('addActionToSidebar', selectedActions.value)
  hideAddActionPannel();
}

const setSelectedAction = (action) => {
  store.dispatch('setSelectedStore', action);
}
</script>

<style lang="scss" scoped>
.action-panel {
  width: calc(100% - 44px);
  padding: 22px;

  .action-panel-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: $primary;
  }

  .action-panel-description {
    margin-top: 4px;
    font-size: 13px;
    font-weight: 300;
    color: $secondary;
  }
  .selectedActionContainer {
    margin: 1.57rem 0;
  }

  .selected-actions {
    @include bordered();
    width: 100%;
    padding: 1rem;
    background-color: $white;
    display: flex;
    align-items: center;
    cursor: pointer;
    .selected-action-icon {
      font-size: 1rem;
    }
    .selected-action-title {
      color: $primary;
      margin-left: 16px;
      font-family: "Inter";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
    }
  }
  .disable {
    @extend .selected-actions;
    color: $secondary-300;
    cursor: not-allowed;
    position: relative;
    .selected-action-title{
      color: $secondary-300;
    }
    .inactive-status {
      position: absolute;
      right: 1rem;
      top: 1.4rem;
      font-size: 0.5rem;
    }
  }
  .add-actions {
    @include btn;
    width: 100%;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }
  .popup-actions {
    margin-top: 14px;
    .popup-actions-heading {
      padding: 14px 0px;
      @include actiontitle;
    }
    @include actionlist;
  }
  .app {
    .app-Heading {
      @include actiontitle;
      padding: 14px;
    }
    @include actionlist;
  }
}
</style>
