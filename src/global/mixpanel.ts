// src/global/myObj.ts
import mixpanel from 'mixpanel-browser';

export default (function() {
  // const privateInstance = mixpanel;

  return {
    init: () => {
      // console.log('inited');
      // console.log(mixpanel);
      mixpanel.init('d8de3b7825c0f49e324a6f164bb34793', {
        api_host: "https://api.mixpanel.com",
        // cookie_name: "test",
        // reset_cookie: true,
        debug: false
      });
    },

    track: (item) => {
      // console.log('tracking', item);
      mixpanel.track(item);
    }
  };
})();
