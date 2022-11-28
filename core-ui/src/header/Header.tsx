import { Shellbar } from 'fundamental-react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';

import { activeNamespaceIdState } from 'state/activeNamespaceIdAtom';
import { clustersState } from 'state/clustersAtom';
import { clusterState } from 'state/clusterAtom';
import { isPreferencesOpenState } from 'state/preferences/isPreferencesModalOpenAtom';

import { Logo } from './Logo/Logo';
import { NamespaceDropdown } from './NamespaceDropdown/NamespaceDropdown';
import { SidebarSwitcher } from './SidebarSwitcher/SidebarSwitcher';

import './Header.scss';
import { useAvailableNamespaces } from './useAvailableNamespaces';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { namespaces, refetch } = useAvailableNamespaces();

  const [cluster, setCluster] = useRecoilState(clusterState);
  const [activeNamespace, setActiveNamespace] = useRecoilState(
    activeNamespaceIdState,
  );
  const setPreferencesOpen = useSetRecoilState(isPreferencesOpenState);
  const clusters = useRecoilValue(clustersState);

  const inactiveClusterNames = Object.keys(clusters || {}).filter(
    name => name !== cluster?.name,
  );

  const clustersList = [
    ...inactiveClusterNames.map(name => ({
      name,
      callback: () => {
        setActiveNamespace('');
        switchCluster(name);
        navigate(`/cluster/${name}`);
      },
    })),
    {
      name: t('clusters.overview.title-all-clusters'),
      callback: () => {
        navigate('/clusters');
      },
    },
  ];

  const switchCluster = (name: string) => {
    if (!clusters) return;
    const chosenCluster = { ...clusters?.[name], name };
    setCluster(chosenCluster);
  };

  return (
    <Shellbar
      className="header"
      logo={
        <>
          <SidebarSwitcher />
          <Logo />
        </>
      }
      productTitle={cluster?.name}
      productMenu={clustersList}
      profile={{
        glyph: 'customer',
        colorAccent: 10,
      }}
      actions={[
        {
          glyph: 'megamenu',
          label: activeNamespace || t('navigation.select-namespace'),
          notificationCount: 0,
          callback: () => refetch(),
          menu: <NamespaceDropdown namespaces={namespaces} />,
        },
      ]}
      profileMenu={[
        {
          name: t('navigation.preferences.title'),
          callback: () => setPreferencesOpen(true),
        },
      ]}
    />
  );
}
