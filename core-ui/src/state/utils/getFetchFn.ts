import { authDataState } from '../authDataAtom';
import { clusterState } from '../clusterAtom';
import { clusterConfigState } from '../clusterConfigSelector';
import { GetRecoilValue } from 'recoil';
import { createFetchFn } from 'shared/hooks/BackendAPI/useFetch';
import { getClusterConfig } from '../utils/getBackendInfo';

export const getFetchFn = (get: GetRecoilValue) => {
  const authData = get(authDataState);
  const cluster = get(clusterState);
  const clusterConfig = get(clusterConfigState);
  const { backendAddress } = getClusterConfig() || {};

  if (authData && cluster && clusterConfig && backendAddress) {
    return createFetchFn({
      authData,
      cluster,
      config: clusterConfig,
      backendAddress,
    });
  }
};
