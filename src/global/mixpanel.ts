// src/global/myObj.ts
import mixpanel from 'mixpanel-browser';

export default (function() {
  return {
    init: () => {
      mixpanel.init('d8de3b7825c0f49e324a6f164bb34793');
    },

    track: (item) => {
      mixpanel.track(item);
    }
  };
})();
