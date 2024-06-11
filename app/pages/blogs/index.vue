<template>
  <UBlogList orientation="horizontal">
    <UBlogPost
      v-for="post in content"
      :key="`blogPost-${post.id}`"
      :to="`/blogs/${post.attributes.title?.split(' ').join('-').toLowerCase()}`"
      :ui="{
        wrapper: 'gap-y-0 rounded-lg ring-1 ring-copper-500 dark:ring-copper-300',
        // Error below is a Nuxt UI bug. Remove if this is no longer the case.
        image: {
          wrapper: 'ring-0 shapedivider shapedivider--bottom',
        },
      }"
    >
      <template #image>
        <NuxtImg
          :src="post.attributes.hero_image?.data.attributes.url"
          :alt="
            post.attributes.hero_image
              ? (post.attributes.hero_image?.data.attributes.alternativeText as string)
              : undefined
          "
          class="blogs__main-image"
        />
        <span class="blogs__avatar">
          <NuxtImg
            :src="post.attributes.author.data.attributes.avatar?.data.attributes.url"
            quality="20"
            width="40px"
            class="blogs__avatar-image"
          />
        </span>
      </template>
      <template #default>
        <div class="blogs__default">
          <h2
            v-if="post.attributes.title"
            class="blogs__title"
          >
            {{ post.attributes.title }}
          </h2>
          <p
            v-if="post.attributes.date"
            class="blogs__date"
          >
            {{ post.attributes.date }}
          </p>
        </div>
      </template>
    </UBlogPost>
  </UBlogList>
</template>

<script setup lang="ts">
import type { Strapi4ResponseMany } from '@nuxtjs/strapi'
import type { BlogsAttributes } from '@/types/Blogs'

const route = useRoute()
const { fullPath } = route

const { data } = await useAsyncData(fullPath, async () => {
  const { find } = useStrapi()
  const response = await find<BlogsAttributes>('blogs', {
    populate: {
      author: {
        populate: '*',
      },
      hero_image: {
        populate: '*',
      },
    },
  })
  return response
})

const content = computed(() => (data.value as Strapi4ResponseMany<BlogsAttributes>).data)
</script>

<style scoped lang="postcss">
.blogs {
  &__main-image {
    object-fit: cover;
    object-position: top;
    width: 100%;
    height: 100%;
    transition-duration: 200ms;

    @apply transform transition-transform group-hover:scale-105;
  }

  &__avatar {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    inset-inline-start: 0;
    inset-block-start: 0;
    padding: 0.5rem;
  }

  &__avatar-image {
    border-radius: 9999px;
    object-fit: cover;
    pointer-events: visible;
    z-index: 1;
    aspect-ratio: 1/1.2;

    @apply ring-1 ring-copper-800 drop-shadow-xl;
  }

  &__default {
    display: flex;
    gap: 20px;
    justify-content: space-between;
    padding: 1rem;
  }

  &__title {
    @apply text-shark-950 dark:text-shark-50;
  }

  &__date {
    @apply text-shark-900 dark:text-shark-100;
  }
}
</style>
