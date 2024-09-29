<script setup lang="ts">
import type { BlogsAttributes } from '@/types/Blogs'

defineProps({
  data: {
    type: Object as PropType<BlogsAttributes>,
    required: true,
  },
})

const ui = {
  wrapper: 'h-[calc(100vh-90px)] gap-y-4 sm:gap-y-6 lg:gap-y-8',
  image: {
    wrapper: 'h-full ring-0 rounded-none',
    base: '',
  },
  container: 'max-full sm:max-w-7xl px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8 mx-auto',
}
</script>

<template>
  <UBlogPost
    class="blogs-header"
    :title="data.title ?? undefined"
    :description="data.description ?? undefined"
    :date="data.date ?? undefined"
    :authors="[
      {
        name: data.author.data.attributes.name ?? '',
        avatar: { src: data.author.data.attributes.avatar?.data.attributes.url, size: 'md' },
        to: `/${$i18n.locale}/authors/${data.author.data.attributes.name?.split(' ').join('-').toLowerCase()}`,
      },
    ]"
    :badge="{ label: data.label ?? undefined }"
    :ui="ui"
  >
    <template #image>
      <SectionDivider
        :side="['bottom']"
        size="md"
      >
        <NuxtImg
          v-if="data.hero_image?.data.attributes.url"
          class="blogs-header__image"
          :src="data.hero_image?.data.attributes.url"
          :alt="data.hero_image?.data.attributes.alternativeText ?? ''"
        />
      </SectionDivider>
    </template>
  </UBlogPost>
</template>

<style scoped lang="postcss">
.blogs-header {
  &__image {
    object-fit: cover;
    object-position: top;
    width: 100%;
    height: 100%;
  }
}
</style>
