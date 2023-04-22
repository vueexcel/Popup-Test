<template>
    <div class="button-holder">
        <div class="content">
            <slot name="icon"></slot>
            <slot></slot>
        </div>
        <slot name="delete"></slot>
    </div>
</template>

<style lang="scss" scoped>
.button-holder {
    @include btn();
    background: $grey-light;
    height: 17px;
    display: flex;
    align-items: center;
    justify-content: space-betweens;
    padding: 20px;
    .content {
        background: $grey-light;
    }
}

</style>