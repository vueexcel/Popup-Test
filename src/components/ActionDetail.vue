<template>
  <div v-for="action in allRandomActions" :key="action.id" class="width-100">
    <div class="action-container">
      <div class="title" :class="{'disable' : !action.isActive}">
        <font-awesome-icon :icon="action.actionIcon" class="action-icon" /> {{action.actionName}}
      </div>
      <!-- for tags  -->
      <div v-if="action.data.length && action.actionId == '1' && action.isActive" class="inner-container" :class="{'disable' : !action.isActive}">
        <div v-for="tag in action.data" :key="tag.tagId" class="style-list">
          <font-awesome-icon icon="fa-solid fa-circle" class="action-icon" :style="{color: `${tag.tagColor}`}" /> {{tag.tagName}}
        </div>
      </div>
      <!-- for http request  -->
      <div v-if="action.data.length && action.actionId == '5' && action.isActive" class="border-top width-100" :class="{'disable' : !action.isActive}">
        <div class="requestEndpoint px-1 width-100">
          <p class="http-label">Request endpoint</p>
          <p class="http-values">{{action.data[0].endpoint}}</p>
        </div>
        <div class="requestMethod px-1 border-top width-100">
          <p class="http-label">Request method</p>
          <p class="http-values">{{action.data[0].method}}</p>
        </div>
        <div class="requestHeader px-1 border-top width-100">
          <div class="grid">
            <p class="http-label">Key</p>
            <p class="http-label">Value</p>
          </div>
          <div v-for="item in action.data[0].header" :key="item.id" class="grid">
            <p class="http-values">{{item.key}}</p>
            <p class="http-values">{{item.value}}</p>
          </div>
        </div>
        <div class="requestBody px-1 border-top width-100">
          <p class="http-label">Request Body</p>
          <div class="http-values request-body-content" v-if="action.data[0].body"><pre><code>{{action.data[0].body}}</code></pre></div>
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
.grid{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.http-label {
  color: $secondary;
  font-size: 1rem;
  font-weight: 400;
}
.http-values {
  @extend .http-label;
  color: $primary;
}
.request-body-content {
  @include bordered($color: $muted-light);
  width: 90%;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  margin: 1rem 0;
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
