<template>
  <UBlogPost
    class="blogs-header"
    :title="blogTitle"
    :description="blogDescription"
    :date="blogDate"
    :authors="blogAuthors"
    :badge="{ label: blogLabel }"
  >
    <template #image>
      <NuxtImg
        v-if="blogImage?.data?.attributes?.url"
        class="blogs-header__image"
        :src="blogImage?.data?.attributes?.url"
        :alt="blogImage?.data?.attributes?.alternativeText"
      />
    </template>
  </UBlogPost>
</template>

<script setup lang="ts">
defineProps({
  blogTitle: {
    type: String as PropType<string>,
    default: '',
  },
  blogDescription: {
    type: String as PropType<string>,
    default: '',
  },
  blogDate: {
    type: String as PropType<string>,
    default: '',
  },
  blogAuthors: {
    type: Array as PropType<any[]>,
    default: [],
  },
  blogLabel: {
    type: String as PropType<string>,
    default: '',
  },
  blogImage: {
    type: Object as PropType<any>,
    default: null,
  },
});
</script>

<style scoped lang="postcss">
.blogs-header {
  &__image {
    @apply object-cover object-top w-full h-full;
  }
}
</style>
