import { useEffect, useRef } from 'react';

/**
 * Custom hook for section-wise auto-scroll
 * Allows normal scrolling within tall sections
 */
export default function useSectionScroll(sectionSelector = 'section') {
  const isScrollingRef = useRef(false);
  const lastScrollTimeRef = useRef(0);

  useEffect(() => {
    // Disable on mobile devices for better UX
    const isMobile = window.innerWidth <= 991;
    if (isMobile) {
      return;
    }

    const getSections = () => {
      return Array.from(document.querySelectorAll(sectionSelector));
    };

    const getCurrentSection = () => {
      const sections = getSections();
      const scrollY = window.scrollY;
      
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollY >= sectionTop - 100 && scrollY < sectionBottom - 100) {
          return { section, index: i };
        }
      }
      
      return { section: sections[0], index: 0 };
    };

    const canScrollInSection = (section, direction) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      const scrollTop = window.scrollY;
      const scrollBottom = scrollTop + window.innerHeight;
      
      if (direction > 0) {
        // Scrolling down - can we scroll more in this section?
        return scrollBottom < sectionBottom - 50;
      } else {
        // Scrolling up - can we scroll more in this section?
        return scrollTop > sectionTop + 50;
      }
    };

    const scrollToSection = (index) => {
      const sections = getSections();
      if (index >= 0 && index < sections.length) {
        isScrollingRef.current = true;
        
        const targetSection = sections[index];
        const targetPosition = targetSection.offsetTop;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        setTimeout(() => {
          isScrollingRef.current = false;
        }, 1000);
      }
    };

    const handleWheel = (e) => {
      // If currently animating, block
      if (isScrollingRef.current) {
        e.preventDefault();
        return;
      }

      const { section: currentSection, index: currentIndex } = getCurrentSection();
      
      if (!currentSection) {
        return;
      }

      // Check if we're in a section that has its own horizontal scroll handler
      // Look for amenities-slider or any horizontal scroll container
      const hasHorizontalScroller = currentSection.querySelector('.amenities-slider, .horizontal-scroll, [data-horizontal-scroll]');
      if (hasHorizontalScroller) {
        // This section manages its own scrolling - don't interfere at all
        return;
      }

      const now = Date.now();
      if (now - lastScrollTimeRef.current < 150) {
        return; // Throttle
      }

      const direction = e.deltaY > 0 ? 1 : -1;

      // Check if we can scroll within current section
      if (canScrollInSection(currentSection, direction)) {
        // Allow normal scroll
        return;
      }

      // At boundary - do section scroll
      e.preventDefault();
      lastScrollTimeRef.current = now;

      const sections = getSections();
      
      if (direction > 0 && currentIndex < sections.length - 1) {
        scrollToSection(currentIndex + 1);
      } else if (direction < 0 && currentIndex > 0) {
        scrollToSection(currentIndex - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [sectionSelector]);
}
