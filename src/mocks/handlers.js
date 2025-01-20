// src/mocks/handlers.js

import { rest } from 'msw';

export const handlers = [
  // Mock for /auth/user
  rest.get('/auth/user', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        name: 'John Doe',
        email: 'john.doe@example.com',
        totalUsers: 1234,
        activeSubscriptions: 567,
        revenue: 89012,
        revenueBySource: [
          { source: 'Online Ads', amount: 30000 },
          { source: 'Affiliate Marketing', amount: 25000 },
          { source: 'Direct Sales', amount: 20000 },
          { source: 'Referral', amount: 14012 },
        ],
        subscriptionGrowthPercentage: 5.4,
        topRevenueSource: 'Online Ads',
      })
    );
  }),

  // Mock for /auth/user/subscriptions
  rest.get('/auth/user/subscriptions', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { month: 'Jan', activeSubscriptions: 500 },
        { month: 'Feb', activeSubscriptions: 520 },
        { month: 'Mar', activeSubscriptions: 550 },
        { month: 'Apr', activeSubscriptions: 580 },
        { month: 'May', activeSubscriptions: 600 },
        { month: 'Jun', activeSubscriptions: 620 },
      ])
    );
  }),

  // Mock for /auth/user/revenue
  rest.get('/auth/user/revenue', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { month: 'Jan', revenue: 15000 },
        { month: 'Feb', revenue: 16000 },
        { month: 'Mar', revenue: 17000 },
        { month: 'Apr', revenue: 18000 },
        { month: 'May', revenue: 19000 },
        { month: 'Jun', revenue: 20000 },
      ])
    );
  }),
];
 
