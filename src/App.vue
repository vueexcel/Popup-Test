<template>
  <div class="container">
    <div class="sidebar">
      <div class="assignedActionContainer">
        <EditAction v-if="selectedAction && selectedAction.id" />
        <ListAction v-else />
        <!-- <ReuseButton v-for="(tag,index) in selectedTag" :key="index">
          <template #icon>
            <font-awesome-icon
              icon="fa-solid fa-circle"
              style="margin-right: 15px"
              :style="{ color: '#298188' }"
            />
          </template>
          {{ tag.name }}
          <template #delete>
            <font-awesome-icon
              icon="fa-solid fa-trash-can"
              style="color: #9DA8B4"
            />
          </template>
        </ReuseButton> -->

      </div>
    </div>
    <div class="content">
      <div class="content-wrapper">
        <!-- This is shown when no actions are present -->
        <div class="content-empty" v-if="checkSatisfied">
          <p>Your actions will<br />appear here</p>
        </div>

        <div class="content-filled" v-else>

          <!-- This is to be shown when we have actions present -->
          <!-- <div
            class="content"
            v-for="(newAction, index) in this.selectedActions"
            :key="index"
          >
            {{ newAction.actionName }}
          </div> -->

          <ActionDetail />

          <!-- Detailed Actions are for when tabs are created inside of an action and need to show added tabs on the right side of side bar component -->
          <!-- <DetailedActions v-for="(tag, index) in tags" :key="index">
                <template #icon>
                  <font-awesome-icon icon="fa-solid fa-circle" style="margin-right: 15px;" :style="{color: `${tag.color}`}" />
                </template>
                <template #content>
                  Tag {{tag.name}}
                </template>
            </DetailedActions> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import ReuseButton from './components/ReuseButton.vue'
import { computed } from 'vue';
import { useStore } from 'vuex'
import ActionDetail from './components/ActionDetail.vue'
import ListAction from './components/ListAction.vue'
import EditAction from './components/EditAction.vue'

const store = useStore();

const selectedAction = computed(() => {
  return store.getters.getSelectedStore;
})

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
        width: calc(100%-44px);
        padding: 22px;
        border-bottom: 1px solid $muted-light;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        position: relative;

        .header-title {
          color: $yellow;
          font-size: 16px;
          font-weight: 600;
        }

        .goBackIcon {
          margin-right: 0.5rem;
          cursor: pointer;
        }

        .add-action-title {
          @extend .header-title;
          color: $primary;
        }

        .actionIcon {
          color: $secondary;
          cursor: pointer;
          font-size: 20px;
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
          border-radius: 1rem;
          cursor: pointer;
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

    .content-wrapper {
      width: 100%;
      height: 100%;
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
}

.style-list{
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 1rem;
  @include bordered($color: $muted-light);
}
</style>
