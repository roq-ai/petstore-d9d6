interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: [],
  tenantRoles: ['Business Owner', 'Team Member'],
  tenantName: 'Business',
  applicationName: 'petstore',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: [
    'Manage pet profiles',
    'Manage users',
    'Manage businesses',
    'Manage pets',
    'Manage purchases',
    'Manage sales',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/39c6c5a1-cfe6-4d36-acfb-cc6d57f530bb',
};
