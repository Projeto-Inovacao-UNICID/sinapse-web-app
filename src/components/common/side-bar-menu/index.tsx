'use client';

import React from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import HomeIcon     from '@mui/icons-material/Home';
import InfoIcon     from '@mui/icons-material/Info';
import ArticleIcon  from '@mui/icons-material/Article';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import PeopleIcon   from '@mui/icons-material/People';
import GroupsIcon   from '@mui/icons-material/Groups';
import { useRouter }  from 'next/navigation';
import { useSession } from '@/hooks/session/useSession';
import { useGetCompanyProfile } from '@/hooks/profile/company/useCompanyProfile';
import { useUserProfile } from '@/hooks/profile/user/useUserProfile';
import { CompanyProfileImage } from '../company-avatar';
import { UserProfileImage } from '../user-avatar';

export function SidebarMenu() {
  const router      = useRouter();
  const { session } = useSession();
  const userId      = session?.id;
  const isUser      = session?.roles.includes('ROLE_USER');
  const isCompany   = session?.roles.includes('ROLE_COMPANY');

 const { data: companyProfile } = useGetCompanyProfile((isCompany && userId) ? userId : '');
 const { data: userProfile } = useUserProfile((isUser && userId) ? userId : '');


  const basePath = isCompany
    ? `/empresa/me/${userId}`
    : `/profile/me/${userId}`;

  const commonTabs = [
    { label: 'Publicações', tab: 'publicacoes', Icon: ArticleIcon  },
    { label: 'Desafios',    tab: 'desafios',    Icon: WhatshotIcon },
  ];

  const userOnlyTabs = [
    { label: 'Amigos', tab: 'amigos', Icon: PeopleIcon },
    { label: 'Grupos', tab: 'grupos', Icon: GroupsIcon },
  ];

  const menuItems = isUser
    ? [...commonTabs, ...userOnlyTabs]
    : commonTabs;

  const goToProfileTab = (tab: string) => {
    if (!userId) return;
    router.push(`${basePath}?tab=${tab}`);
  };

  return (
    <Box
      sx={{
        bgcolor: 'var(--card)',
        borderRadius: 2,
        width: 260,
        p: 3,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'start',
      }}
    >
      {isCompany && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, '&hover': { cursor: 'pointer' } }} onClick={() => router.push(`/empresa/me/${userId}`)}>
          <Box sx={{ width: 48, height: 48, flexShrink: 0 }}>
            <CompanyProfileImage temImagem={companyProfile?.temImagem ?? false} companyId={userId ?? ''} />
          </Box>
          <Typography variant="h6" sx={{ color: 'var(--foreground)', fontWeight: 'bold' }}>
            {companyProfile?.nome}
          </Typography>
        </Box>
      )}
      {isUser && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, '&hover': { cursor: 'pointer' } }} onClick={() => router.push(`/profile/me/${userId}`)}>
          <Box sx={{ width: 48, height: 48, flexShrink: 0 }}>
            <UserProfileImage temImagem={userProfile?.temImagem ?? false} userId={userId ?? ''} />
          </Box>
          <Typography variant="h6" sx={{ color: 'var(--foreground)', fontWeight: 'bold' }}>
            {userProfile?.nome}
          </Typography>
        </Box>
      )}

      <List sx={{ flex: 1 }}>
        {menuItems.map(({ label, tab, Icon }) => (
          <ListItemButton
            key={label}
            onClick={() => goToProfileTab(tab)}
            sx={{
              mb: 1,
              py: 1.25,
              px: 2,
              borderRadius: 2,
              color: 'var(--muted)',
              '&:hover': { bgcolor: 'var(--bgTertiary)' },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Icon />
            </ListItemIcon>
            <ListItemText
              primary={label}
              primaryTypographyProps={{ fontSize: '1rem', fontWeight: 500 }}
            />
          </ListItemButton>
        ))}
      </List>
      <Typography
        variant="h6"
        sx={{ color: 'var(--foreground)', fontWeight: 'bold', mt: 4, lineHeight: 1 }}
      >
        Connect
        <Box component="span" sx={{ color: 'var(--primary)' }}>
          Z
        </Box>
      </Typography>
    </Box>
  );
}
