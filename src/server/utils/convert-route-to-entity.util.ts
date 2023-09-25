const mapping: Record<string, string> = {
  businesses: 'business',
  pets: 'pet',
  'pet-profiles': 'pet_profile',
  purchases: 'purchase',
  sales: 'sale',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
