<template>
    <div class="content-holder">
        <slot name="icon"></slot>
        <slot name="content"></slot>
    </div>
</template>

<style lang="scss" scoped>
.content-holder {
    display: flex;
    border: 1px solid $muted-light;
    background: $white;
    border-radius: 14px;
    padding: 20px;
    margin: 1rem;
}
</style>
