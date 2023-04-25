<template>
  <div class="container">
    <div class="sidebar">
      <div class="assignedActionContainer">
        <EditAction v-if="selectedAction && selectedAction.id" />
        <ListAction v-else />
      </div>
    </div>
    <div class="content">
      <div class="content-wrapper">
        <!-- This is shown when no actions are present -->
        <div class="content-empty" v-if="noActionAdded">
          <p>Your actions will<br />appear here</p>
        </div>
        <div class="content-filled" v-else>

          <ActionDetail />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex'
import ActionDetail from './components/ActionDetail.vue'
import ListAction from './components/ListAction.vue'
import EditAction from './components/EditAction.vue'

const store = useStore();

const selectedAction = computed(() => {
  return store.getters.getSelectedStore;
})

const noActionAdded = computed(()=> {
  return store.getters.getRandomSelectedActions.length === 0;
})

</script>

<style lang="scss">
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

.border-top {
  border-top: 1px solid $muted-light;
}

.width-100 {
  width: 100%;
}

.px-1{
  padding-left: 1rem;
  padding-right: 1rem;
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
    max-width: 360px;
    height: calc(100vh - 32px);
    overflow: auto;
    background-color: $white;
    border-radius: 1rem;

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
    height: calc(100vh - 4.1rem);
    overflow: auto;
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
