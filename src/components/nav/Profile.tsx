import * as React from 'react';
import Logout from '@mui/icons-material/Logout';
import { Account } from '@toolpad/core/Account';
import {
  AuthenticationContext,
  SessionContext,
  Session,
} from '@toolpad/core/AppProvider';

const demoSession = {
  user: {
    name: 'Bharat Kashyap',
    email: 'bharatkashyap@outlook.com',
    image: 'https://avatars.githubusercontent.com/u/19550456',
  },
};

export default function AccountCustomSlotProps() {
  const [session, setSession] = React.useState<Session | null>(demoSession);

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: 'Bharat Kashyap',
            email: 'bharatkashyap@outlook.com',
            image: 'https://avatars.githubusercontent.com/u/19550456',
          },
        });
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);

  return (
    <AuthenticationContext.Provider value={authentication}>
      <SessionContext.Provider value={session}>
        {/* preview-start */}
        <Account
          slotProps={{
            signInButton: {
              color: 'success',
              disabled: true, // Disable the sign-in button
            },
            signOutButton: {
              color: 'error',
              startIcon: <Logout />,
              onClick: authentication.signOut, // Trigger the signOut function on click
            },
            preview: {
              variant: 'expanded',
              slotProps: {
                avatarIconButton: {
                  sx: {
                    width: 'fit-content',
                    margin: 'auto',
                  },
                },
                avatar: {
                  variant: 'rounded',
                },
              },
            },
          }}
        />
        {/* preview-end */}
      </SessionContext.Provider>
    </AuthenticationContext.Provider>
  );
}