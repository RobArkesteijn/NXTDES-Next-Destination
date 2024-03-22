<template>
  <div ref="cursor" class="cursor" :class="[{ 'cursor--hover': hover }, `cursor--${type}`]" />
</template>

<script setup lang="ts">
import { useMouse } from '@vueuse/core';
import { gsap } from 'gsap';

const route = useRoute();

const type = ref('');
const hover = ref(false);
const cursor = ref(null as Element | null);

const { x: mouseX, y: mouseY } = useMouse({ type: 'client' });

const position = { x: mouseX, y: mouseY };
const velocity = { x: 0, y: 0 };

let xSetter: Function | null = null;
let ySetter: Function | null = null;

const cursorHover = (dataCursorValue: string) => {
  type.value = dataCursorValue;
  hover.value = true;
};

const disableCursorHover = () => {
  type.value = '';
  hover.value = false;
};

const onMouseMove = (e: MouseEvent): void => {
  const cursorSize = cursor.value?.clientWidth;
  const x = e.clientX - cursorSize! / 2;
  const y = e.clientY - cursorSize! / 2;

  gsap.to(position, {
    x,
    y,
    duration: 1.25,
    ease: 'Expo.easeOut',
    onUpdate: () => {
      velocity.x = x - position.x.value;
      velocity.y = y - position.y.value;
    },
  });
};

const loop = () => {
  if (xSetter && ySetter) {
    xSetter(position.x);
    ySetter(position.y);
  }
};

// Add event listeners to all elements which should show hover
const initHoverElements = () => {
  const dataCursorElements = document.querySelectorAll('[data-cursor]');

  [...dataCursorElements].forEach((elem) => {
    const dataCursorValue = elem.getAttribute('data-cursor') as string;
    // elem.addEventListener('mouseover', () => cursorHover(dataCursorValue), false);
    elem.addEventListener('mouseenter', () => cursorHover(dataCursorValue), false);
    elem.addEventListener('mouseleave', disableCursorHover, false);
  });

  if (dataCursorElements.length > 0) {
    window.addEventListener('mousemove', onMouseMove);
    gsap.ticker.add(loop);
  }
};

// Remove event listeners to all hover elements
const uninitHoverElements = () => {
  gsap.ticker.remove(loop);
  window.removeEventListener('mousemove', onMouseMove);

  [...document.querySelectorAll('[data-cursor]')].forEach((elem) => {
    elem.removeEventListener('mouseenter', () => cursorHover, false);
    elem.removeEventListener('mouseleave', disableCursorHover, false);
  });
};

onMounted(() => {
  xSetter = gsap.quickSetter(cursor.value, 'x', 'px');
  ySetter = gsap.quickSetter(cursor.value, 'y', 'px');

  nextTick(() => {
    initHoverElements();
  });
});

onBeforeUnmount(() => {
  uninitHoverElements();
});

watch(
  () => [route.fullPath],
  () => {
    disableCursorHover();
    uninitHoverElements();

    nextTick(() => {
      setTimeout(initHoverElements, 500);
    });
  },
);
</script>

<style lang="postcss" scoped>
.cursor {
  @apply transition-cursor hidden opacity-0 fixed pointer-events-none top-0 left-0 origin-[50%_50%] will-change-[opacity,box-shadow] lg:block;

  &--lighting-blue-dark {
    @apply bg-boston-blue-900 rounded-full w-[50px] h-[50px];

    &.cursor--hover {
      @apply w-[500px] h-[500px] opacity-50 shadow-lighting-blue-dark;
    }
  }

  &--lighting-blue {
    @apply bg-boston-blue-100 rounded-full w-[50px] h-[50px];

    &.cursor--hover {
      @apply w-[500px] h-[500px] opacity-50 shadow-lighting-blue;
    }
  }
}
</style>
