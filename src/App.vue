<template>
  <div class="container">
    <div class="sidebar">
      <div class="assignedActionContainer">
        <div class="header">
          <div class="header-title">
            <font-awesome-icon icon="fa-bolt" /> Action
          </div>
          <font-awesome-icon icon="fa-solid fa-ellipsis" class="actionIcon" />
        </div>
        <div class="action-panel">
          <div style="width: 100%">
            <div class="action-panel-title">Assigned actions</div>
            <div class="action-panel-description">
              The selected actions will run in the background when the user
              journey gets to this element
            </div>
            <button
              class="selected-actions"
              v-for="(selectedOption, index) in randomSelectedActions"
              :key="index"
              :style="
                selectedOption.actionId === '1'
                  ? 'border-top-left-radius:1rem;border-top-right-radius:1rem'
                  : 'border-radius:0rem'
              "
            >
              <font-awesome-icon
                icon="fa-solid fa-tag"
                class="selected-action-icon"
              />
              <span class="selected-action-title">
                {{ selectedOption.actionName }}{{ selectedOption.actionId }}
              </span>
            </button>
            <button
              class="add-actions"
              :style="
                randomSelectedActions.length
                  ? `border-bottom-left-radius:1rem;border-bottom-right-radius:1rem`
                  : 'border-radius:1rem;margin-top:22px;'
              "
            >
              <span>Add actions</span> <font-awesome-icon icon="fa-plus" />
            </button>
            <!-- <div class="search-actions">
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
                    :icon="`${list.actionIcon}`"
                    class="list-tag"
                  />
                  <div class="list-info">
                    <div>{{ list.actionName }}</div>
                    <input type="checkbox" class="list-checkbox" v-model="list.value" @change="selectedChecks"/>
                  </div>
                </div>
                <button @click="submit()">Submit</button>
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
            </div> -->
          </div>
        </div>

        <ReuseButton>
          <template #icon>
            <font-awesome-icon
              icon="fa-solid fa-circle"
              style="margin-right: 15px"
              :style="{ color: '#298188' }"
            />
          </template>
          Tag ----
          <template #delete>
            <font-awesome-icon
              icon="fa-solid fa-trash-can"
              style="color: #000000"
            />
          </template>
        </ReuseButton>
        <div class="control">
          <div class="cancel">Cancel</div>
          <div class="confirm">Confirm</div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="content-empty" v-if="checkSatisfied">
        <p>Your actions will<br />appear here</p>
      </div>

      <div class="content-filled" v-else>
        <div
          class="content"
          v-for="(newAction, index) in this.selectedActions"
          :key="index"
        >
          {{ newAction.actionName }}
        </div>
        <DetailedActions v-for="(tag, index) in tags" :key="index">
              <template #icon>
                <font-awesome-icon icon="fa-solid fa-circle" style="margin-right: 15px;" :style="{color: '#298188'}" />
              </template>
              <template #content>
                Tag {{tag.name}}
              </template>
          </DetailedActions>
      </div>
    </div>
  </div>
</template>

<script>
import ReuseButton from './components/ReuseButton.vue'
import DetailedActions from './components/DetailedAction.vue'
export default {
  name: "App",
  components:{
    ReuseButton,
    DetailedActions,
  },
  data() {
    return {
      randomSelectedActions: [
        {
          actionId: "1",
          actionName: "Tag Customer",
        },
        {
          actionId: "2",
          actionName: "Email",
        },
        {
          actionId: "3",
          actionName: "Customer",
        },
        {
          actionId: "4",
          actionName: "HTTP",
        },
      ],
      filteredList: [],
      seachInput: "",
      selectedActions: [],
      tags: [
        {
          name: 1,
          color: 'cyan'
        },
        {
          name: 2,
          color: 'red'
        },
        {
          name: 3,
          color: 'yellow'
        },
        {
          name: 4,
          color: 'grey'
        }
      ],
      checkSatisfied: false,
      actionLists: [
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
          actionIcon: "fa-solid fa-tag",
          value: false,
        },
        {
          actionId: "4",
          actionName: "Select digital product",
          actionIcon: "fa-solid fa-tag",
          value: false,
        },
        {
          actionId: "5",
          actionName: "Make HTTPS request",
          actionIcon: "fa-solid fa-tag",
          value: false,
        },
      ],
    };
  },
  methods: {
    selectedChecks() {
      this.selectedActions = this.actionLists.filter((el) => el.value);
    },
    searchResults() {
      if (this.seachInput.length) {
        this.filteredList = this.actionLists.filter((list) => {
          return list.actionName
            .toLowerCase()
            .includes(this.seachInput.toLowerCase());
        });
      } else {
        this.filteredList = [];
      }
    },
    submit() {
      this.checkSatisfied = true;
    },
  },
};
</script>

<style lang="scss">
.bg1 {
  //background-color:red;
  color: red;
}
.bg2 {
  background-color: pink;
}
body {
  margin: 0;
  padding: 0;
  background-color: $secondary;
  font-size: 14px;
}
input {
  border-width: 0px;
}
input:focus {
  outline: none;
}
.border {
  border: 2px solid red;
}
.container {
  display: grid;
  background: transparent;
  grid-template-rows: 1fr;
  grid-template-columns: (4, 1fr);
  column-gap: 1rem;
  padding: 1rem;

  .sidebar {
    position: relative;
    @include sidebar();

    .assignedActionContainer {
      width: 100%;

      .header {
        padding: 22px;
        border-bottom: 1px solid $muted-light;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .header-title {
          color: $yellow;
          font-size: 16px;
          font-weight: 600;
        }

        .actionIcon {
          color: $secondary;
          cursor: pointer;
          font-size: 20px;
        }
      }

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
        .selected-actions {
          @include bordered();
          width: 100%;
          padding: 1rem;
          background-color: $white;
          display: flex;
          align-items: center;
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
        .add-actions {
          @include btn;
          width: 100%;
          padding: 1rem;
          display: flex;
          justify-content: space-between;
        }
        .search-actions {
          @include bordered($color: $muted-light, $type: solid);
          background: $white;
          border-radius: 14px;
          padding: 14px 16px;
          color: $secondary;
          .search-actions-icon {
            margin-right: 16px;
          }
          .search-actions-input {
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
          }
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
      .control {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        min-height: 91px;
        align-items: center;
        padding-left: 22px;
        padding-right: 22px;
        justify-content: space-between;
        border: 1px solid $muted-light;
        box-shadow: 0px 14px 60px rgba(0, 0, 0, 0.09);
        border-bottom-left-radius: 14px;
        border-bottom-right-radius: 14px;
        .cancel,
        .confirm {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 47px;
          width: 151px;
        }
        .cancel {
          @include btn($primary, $white);
        }

        .confirm {
          @include btn($white, $blue);
        }
      }
    }
    .addActionsContainer {
      width: 100%;
      .header {
        padding: 22px;
        border-bottom: 1px solid $muted-light;
        .header-title {
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
        }
      }
    }
  }

  .content {
    width: calc(100vw - 392px);
    grid-column: 2 / span 3;
    background-color: $white;
    border-radius: 1rem;
    padding: 1rem;

    .content-empty {
      @include bordered($color: $secondary, $type: dashed);
      background-color: $grey-light;
      border-radius: 1rem;
      height: 100%;
      display: grid;
      align-items: center;
      justify-items: center;

      p {
        font-weight: 600;
        font-size: 27px;
        color: $secondary-300;
        text-align: center;
      }
    }
  }
}
</style>
