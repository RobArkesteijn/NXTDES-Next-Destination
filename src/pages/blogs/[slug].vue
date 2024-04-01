<template>
  <BlogsHeader
    :blog-title="content.title"
    :blog-description="content.description[0].children[0].text"
    :blog-image="content.hero_image"
    :blog-date="content.date"
    :blog-authors="authors"
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
        authors: {
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

const content = computed(() => data.value?.data[0].attributes);
const authors = computed(() =>
  content.value?.authors?.data?.map((author: any) => ({
    name: author.attributes?.name,
    avatar: {
      src: author?.attributes?.avatar?.data?.attributes?.url,
    },
    to: `/authors/${author.attributes?.name.split(' ').join('-').toLowerCase()}`,
  })),
);
</script>

<style scoped></style>
