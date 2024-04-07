<template>
  <BlogsHeader
    :blog-title="content.title"
    :blog-description="content.description[0].children[0].text"
    :blog-image="content.hero_image"
    :blog-date="content.date"
    :blog-author="author"
    :blog-label="content.label"
  />
</template>

<script setup lang="ts">
const route = useRoute();
const { fullPath } = route;
const { slug } = route.params;

const { data } = await useAsyncData(fullPath, async () => {
  const { find } = useStrapi();
  try {
    const response = await find('blogs', {
      populate: {
        author: {
          populate: '*',
        },
        hero_image: {
          populate: '*',
        },
      },
      filters: { title: { $eqi: (slug as string).split('-').join(' ') } },
    });
    return response;
  } catch (e) {
    return showError('Unknown error');
  }
});

const content = computed(() => data.value?.data[0]?.attributes);
const author = computed(() => ({
  name: content.value.author?.data?.attributes?.name,
  avatar: {
    src: content.value.author?.data?.attributes?.avatar?.data?.attributes?.url,
    size: 'md',
  },
  to: `/authors/${content.value?.author?.data?.attributes?.name.split(' ').join('-').toLowerCase()}`,
}));
</script>

<style scoped></style>
