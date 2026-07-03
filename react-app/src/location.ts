const LOCATION_CHANGE_EVENT = 'mfe:locationchange';
const PATCH_FLAG = '__mfeLocationPatched__';

declare global {
  interface Window {
    __mfeLocationPatched__?: boolean;
  }
}

function notifyLocationChange() {
  window.dispatchEvent(new Event(LOCATION_CHANGE_EVENT));
}

function patchHistory() {
  if (window[PATCH_FLAG]) {
    return;
  }

  const originalPushState = window.history.pushState.bind(window.history);
  const originalReplaceState = window.history.replaceState.bind(window.history);

  window.history.pushState = function (...args) {
    originalPushState(...args);
    notifyLocationChange();
  };

  window.history.replaceState = function (...args) {
    originalReplaceState(...args);
    notifyLocationChange();
  };

  window[PATCH_FLAG] = true;
}

export function subscribeToLocationChange(listener: () => void): () => void {
  patchHistory();

  window.addEventListener(LOCATION_CHANGE_EVENT, listener);
  window.addEventListener('popstate', listener);

  return () => {
    window.removeEventListener(LOCATION_CHANGE_EVENT, listener);
    window.removeEventListener('popstate', listener);
  };
}

export function navigate(path: string) {
  if (window.location.pathname === path) {
    return;
  }

  patchHistory();
  window.history.pushState({}, '', path);
}
