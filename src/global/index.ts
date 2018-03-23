import mixpanelInstance from './mixpanel';

declare var Context: any;

Context.mixpanel = mixpanelInstance;
