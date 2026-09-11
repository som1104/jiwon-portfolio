/**
 * Handshake between the scroll-expand hero and the section pager.
 *
 * The hero registers an imperative API on mount (animated expand / collapse
 * plus a state query); SectionScroll calls it so the first wheel gesture
 * opens the hero and the next one moves on to section 01. A module store
 * rather than a window event so a late subscriber still sees the API.
 */

export type HeroApi = {
  /** animate the media open; resolves when fully expanded */
  expand: () => Promise<void>;
  /** animate the media closed; resolves when fully collapsed */
  collapse: () => Promise<void>;
  isExpanded: () => boolean;
  /** true while an expand / collapse animation is running */
  isAnimating: () => boolean;
};

let api: HeroApi | null = null;

export const heroControl = {
  get: () => api,
  register(next: HeroApi) {
    api = next;
    return () => {
      if (api === next) api = null;
    };
  },
};
