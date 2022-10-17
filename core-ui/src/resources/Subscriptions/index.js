import React from 'react';

import { getServiceName } from './helpers';
import { PredefinedCategories } from 'sidebar/constants';

export const resourceType = 'Subscriptions';
export const namespaced = true;
export const apiGroup = 'eventing.kyma-project.io';
export const apiVersion = 'v1alpha1';
export const category = PredefinedCategories.configuration;

export const List = React.lazy(() => import('./SubscriptionList'));
export const Details = React.lazy(() => import('./SubscriptionDetails'));

export const resourceGraphConfig = () => ({
  depth: 1,
  networkFlowLevel: -2,
  relations: [
    {
      resource: { kind: 'Service' },
      filter: (subscription, service) =>
        getServiceName(subscription.spec.sink) === service.metadata.name,
    },
  ],
});
