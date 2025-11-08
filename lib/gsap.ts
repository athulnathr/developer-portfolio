"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/**
 * Animate element on scroll
 */
export const animateOnScroll = (
    element: string | HTMLElement,
    animation: gsap.TweenVars,
    trigger?: string | HTMLElement
) => {
    return gsap.to(element, {
        scrollTrigger: {
            trigger: trigger || element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
        },
        ...animation,
    });
};

/**
 * Create parallax effect
 */
export const createParallax = (
    element: string | HTMLElement,
    speed: number = 0.5
) => {
    return gsap.to(element, {
        yPercent: -100 * speed,
        ease: "none",
        scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
        },
    });
};

/**
 * Stagger animation on scroll
 */
export const staggerOnScroll = (
    elements: string,
    animation: gsap.TweenVars,
    staggerAmount: number = 0.1
) => {
    return gsap.from(elements, {
        scrollTrigger: {
            trigger: elements,
            start: "top 80%",
            toggleActions: "play none none reverse",
        },
        stagger: staggerAmount,
        ...animation,
    });
};

/**
 * Pin element on scroll
 */
export const pinOnScroll = (
    element: string | HTMLElement,
    duration: number = 1
) => {
    return ScrollTrigger.create({
        trigger: element,
        start: "top top",
        end: `+=${duration * 100}%`,
        pin: true,
        pinSpacing: true,
    });
};

/**
 * Cleanup all ScrollTrigger instances
 */
export const cleanupScrollTriggers = () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};






