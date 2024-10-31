interface UmamiTracker {
  track: (eventName: string) => void;
}

declare const umami: UmamiTracker;
