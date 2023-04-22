<template>
  <div class="button-holder">
    <div class="content">
      <slot name="icon"></slot>
      <slot></slot>
    </div>
    <div class="button-icon">
      <slot name="delete">
        <font-awesome-icon
          icon="fa-solid fa-trash-icon"
          class="delete"
        />
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.button-holder {
  @include btn();
  background: $grey-light;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 14px;
  margin: 14px 22px;
  .content {
    background: $grey-light;
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: $primary;
  }
}
</style>