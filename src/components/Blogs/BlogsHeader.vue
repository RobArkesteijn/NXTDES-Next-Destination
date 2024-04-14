<template>
  <UBlogPost
    class="blogs-header"
    :title="blogTitle"
    :description="blogDescription"
    :date="blogDate"
    :authors="[blogAuthor]"
    :badge="{ label: blogLabel }"
    :ui="ui"
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
  blogAuthor: {
    type: Object as PropType<any>,
    default: () => {},
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

const ui = {
  wrapper: 'h-screen gap-y-4 sm:gap-y-6 lg:gap-y-8',
  image: {
    wrapper: 'h-full ring-0 rounded-none shapedivider shapedivider--bottom',
    base: '',
  },
  container: 'max-full sm:max-w-7xl px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8 mx-auto',
};
</script>

<style scoped lang="postcss">
.blogs-header {
  &__image {
    @apply object-cover object-top w-full h-full;
  }
}
</style>
