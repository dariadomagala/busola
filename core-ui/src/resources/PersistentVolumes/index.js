import React from 'react';
import { PredefinedCategories } from 'state/navigation/categories';

export const resourceType = 'PersistentVolumes';
export const namespaced = false;
export const apiGroup = '';
export const apiVersion = 'v1';
export const category = PredefinedCategories.storage;

export const List = React.lazy(() => import('./PersistentVolumeList'));
export const Details = React.lazy(() => import('./PersistentVolumeDetails'));

export const resourceGraphConfig = (t, context) => ({
  depth: 1,
  relations: [
    {
      resource: { kind: 'StorageClass', namespace: null },
      filter: (pv, sc) => pv.spec.storageClassName === sc.metadata.name,
    },
  ],
});
