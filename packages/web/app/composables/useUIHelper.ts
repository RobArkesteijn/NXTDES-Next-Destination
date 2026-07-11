import {
  TABLET, DESKTOP,
} from '@/constants/breakpoints'

export default function useUIHelper() {
  const { width } = useWindowSize()
  const { orientation } = useScreenOrientation()

  const isMobile = computed((): boolean => width.value < TABLET || (width.value < TABLET && orientation.value === 'portrait-primary'))
  const isTablet = computed((): boolean => width.value >= TABLET && width.value < DESKTOP)
  const isMobileOrTablet = computed((): boolean => isMobile.value || isTablet.value)
  const isDesktop = computed((): boolean => width.value >= DESKTOP)

  return {
    isMobile,
    isTablet,
    isMobileOrTablet,
    isDesktop,
  }
}
