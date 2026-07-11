<script setup lang="ts">
import ShapeDivider from '@/assets/icons/shape-divider.svg'
import type { ShapeType, ShapeSide, ShapeSize } from '@/types/Shapes'

defineProps({
  type: {
    type: String as PropType<ShapeType>,
    default: 'white',
  },
  side: {
    type: Array as PropType<ShapeSide[]>,
    default: () => ['top', 'bottom'],
  },
  size: {
    type: String as PropType<ShapeSize>,
    default: 'lg',
  },
})
</script>

<template>
  <div
    class="section-divider"
    :class="[`section-divider--${type}`, `section-divider--${size}`]"
  >
    <ShapeDivider
      v-if="side.includes('top')"
      class="section-divider__top section-divider__shape"
    />
    <ShapeDivider
      v-if="side.includes('right')"
      class="section-divider__right section-divider__shape"
    />
    <slot />
    <ShapeDivider
      v-if="side.includes('left')"
      class="section-divider__left section-divider__shape"
    />
    <ShapeDivider
      v-if="side.includes('bottom')"
      class="section-divider__bottom section-divider__shape"
    />
  </div>
</template>

<style scoped lang="postcss">
.section-divider {
  position: relative;
  height: 100%;
  width: 100%;

  &--white {
    :deep(svg) {
      @apply fill-white dark:fill-shark-950;
    }
  }

  &--blue {
    :deep(svg) {
      @apply fill-boston-blue-100 dark:fill-boston-blue-900;
    }
  }

  &--sand {
    :deep(svg) {
      @apply fill-copper-100 dark:fill-boston-blue-900;
    }
  }

  &__shape {
    position: absolute;
    width: 100%;

    @apply z-10;
  }

  &--sm {
    .section-divider__shape {
      height: 20px;

      @media screen(sm) {
        height: 30px;
      }
    }
  }

  &--md {
    .section-divider__shape {
      height: 20px;

      @media screen(sm) {
        height: 40px;
      }

      @media screen(lg) {
        height: 60px;
      }
    }
  }

  &--lg {
    .section-divider__shape {
      height: 40px;

      @media screen(sm) {
        height: 60px;
      }

      @media screen(lg) {
        height: 80px;
      }
    }
  }

  &--xl {
    .section-divider__shape {
      height: 60px;

      @media screen(sm) {
        height: 80px;
      }

      @media screen(lg) {
        height: 100px;
      }
    }
  }

  &--auto {
    .section-divider__shape {
      height: auto;
    }
  }

  &__top {
    top: 0;
    left: 0;
  }

  &__bottom {
    bottom: 0;
    left: 0;
    transform: rotate(180deg);
  }

  &__left {
    bottom: 0;
    left: 0;
    transform: rotate(270deg) translateY(100%);
    transform-origin: bottom left;
  }

  &__right {
    top: 0;
    right: 0;
    transform: rotate(90deg);
  }
}
</style>
