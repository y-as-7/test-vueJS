<script setup lang="ts">


const props = defineProps<{
    submitAction: () => void,
    loading: boolean;
}>();
</script>

<template>
    <div>
        <h1>
            <slot name="title" />
        </h1>
        <form @submit.prevent="props.submitAction">
            <slot name="form" />
            <button type="submit">Create</button>
        </form>
    </div>
</template>