"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { SectionName } from "./useScrollProgress";

export type RobotAnimationState =
    | "idle"
    | "sitting"
    | "standing-up"
    | "walking"
    | "waving"
    | "pointing"
    | "scurrying"
    | "absorbing"
    | "celebrating"
    | "thumbs-up"
    | "powering-down"
    | "looking";

export type RobotTransitionState =
    | "entering"
    | "exiting"
    | "transitioning"
    | "settled";

interface RobotState {
    animationState: RobotAnimationState;
    transitionState: RobotTransitionState;
    currentSection: SectionName;
    previousSection: SectionName | null;
    animationProgress: number;
    animationStartTime: number;
    isAnimating: boolean;
    transformationLevel: number; // 0-3 for Skills section growth
}

interface QueuedAction {
    action: RobotAnimationState;
    duration: number;
    timestamp: number;
}

export function useRobotState(
    currentSection: SectionName,
    sectionProgress: number
) {
    const [robotState, setRobotState] = useState<RobotState>({
        animationState: "sitting",
        transitionState: "entering",
        currentSection: "hero",
        previousSection: null,
        animationProgress: 0,
        animationStartTime: 0,
        isAnimating: false,
        transformationLevel: 0,
    });

    const actionQueue = useRef<QueuedAction[]>([]);
    const lastIdleGestureTime = useRef<number>(0);

    // Queue an animation action
    const queueAction = useCallback(
        (action: RobotAnimationState, duration: number = 1) => {
            const now = Date.now();
            actionQueue.current.push({ action, duration, timestamp: now });
        },
        []
    );

    // Process action queue
    const processQueue = useCallback(() => {
        if (actionQueue.current.length === 0 || robotState.isAnimating) return;

        const nextAction = actionQueue.current.shift();
        if (nextAction) {
            setRobotState((prev) => ({
                ...prev,
                animationState: nextAction.action,
                animationStartTime: Date.now(),
                animationProgress: 0,
                isAnimating: true,
            }));

            // Auto-clear animation after duration
            setTimeout(() => {
                setRobotState((prev) => ({
                    ...prev,
                    isAnimating: false,
                    animationState: "idle",
                }));
            }, nextAction.duration * 1000);
        }
    }, [robotState.isAnimating]);

    // Hero section: stand up and wave sequence
    useEffect(() => {
        if (currentSection === "hero" && robotState.currentSection === "hero") {
            const now = Date.now();
            const elapsed = (now - robotState.animationStartTime) / 1000;

            if (robotState.animationState === "sitting" && elapsed > 0.5) {
                queueAction("standing-up", 2);
            } else if (robotState.animationState === "idle" && elapsed > 4) {
                queueAction("waving", 1.5);
            }
        }
    }, [currentSection, robotState, queueAction]);

    // Section change detection
    useEffect(() => {
        if (currentSection !== robotState.currentSection) {
            setRobotState((prev) => ({
                ...prev,
                previousSection: prev.currentSection,
                currentSection,
                transitionState: "transitioning",
            }));

            // Section-specific entry animations
            switch (currentSection) {
                case "about":
                    queueAction("scurrying", 1.5);
                    setTimeout(() => queueAction("bounce", 0.6), 1600);
                    break;

                case "skills":
                    // Robot will grow with absorbed skills
                    break;

                case "projects":
                    queueAction("celebrating", 1.5);
                    break;

                case "contact":
                    queueAction("waving", 1.5);
                    break;

                case "footer":
                    queueAction("powering-down", 2);
                    break;
            }

            // Mark as settled after transition
            setTimeout(() => {
                setRobotState((prev) => ({
                    ...prev,
                    transitionState: "settled",
                }));
            }, 1500);
        }
    }, [currentSection, robotState.currentSection, queueAction]);

    // Random idle gestures
    useEffect(() => {
        if (
            robotState.animationState === "idle" &&
            robotState.transitionState === "settled"
        ) {
            const now = Date.now();
            const timeSinceLastGesture = (now - lastIdleGestureTime.current) / 1000;

            // Random gesture every 5-15 seconds
            const nextGestureTime = 5 + Math.random() * 10;

            if (timeSinceLastGesture > nextGestureTime) {
                const randomGestures: RobotAnimationState[] = [
                    "looking",
                    "bounce",
                    "waving",
                ];
                const randomGesture =
                    randomGestures[Math.floor(Math.random() * randomGestures.length)];
                queueAction(randomGesture, 1);
                lastIdleGestureTime.current = now;
            }
        }
    }, [robotState, queueAction]);

    // Process queue regularly
    useEffect(() => {
        const interval = setInterval(processQueue, 100);
        return () => clearInterval(interval);
    }, [processQueue]);

    // Update animation progress
    useEffect(() => {
        if (robotState.isAnimating) {
            const updateProgress = () => {
                const now = Date.now();
                const elapsed = (now - robotState.animationStartTime) / 1000;
                setRobotState((prev) => ({
                    ...prev,
                    animationProgress: Math.min(elapsed / 2, 1), // Normalize to 0-1
                }));
            };

            const interval = setInterval(updateProgress, 16); // ~60fps
            return () => clearInterval(interval);
        }
    }, [robotState.isAnimating, robotState.animationStartTime]);

    // Skills section transformation
    useEffect(() => {
        if (currentSection === "skills") {
            // Transform based on section progress
            const level = Math.floor(sectionProgress * 4);
            setRobotState((prev) => ({
                ...prev,
                transformationLevel: Math.min(level, 3),
            }));
        }
    }, [currentSection, sectionProgress]);

    return {
        robotState,
        queueAction,
    };
}

