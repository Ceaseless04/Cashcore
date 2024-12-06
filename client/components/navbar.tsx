import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Platform, Image } from 'react-native';
import { usePathname, Href, useRouter } from 'expo-router';
// import { usePlaidLink } from 'react-native-plaid-link-sdk';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isActiveLink = (path: string) => pathname === path;
  // const [linkToken, setLinkToken] = useState<string | null>(null);
  // const [isLoading, setIsLoading] = useState(false);
  // const [showPlaidModal, setShowPlaidModal] = useState(false);

  /* const { open, ready } = usePlaidLink({
    tokenConfig: {
      token: linkToken || '',
    },
    onSuccess: (success: { publicToken: string }) => {
      setShowPlaidModal(false);
      onSuccess(success.publicToken, {});
    },
    onExit: (exit: { error?: any; metadata?: any }) => {
      setShowPlaidModal(false);
      onExit(exit.error, exit.metadata);
    },
  }); */

  /* useEffect(() => {
    if (showPlaidModal && ready && open) {
      open();
    }
  }, [showPlaidModal, ready, open]); */

  /* const fetchLinkToken = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:8080/restapi/create_link_token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: 'username1' }),
      });
      const data = await response.json();
      setLinkToken(data.link_token);
    } catch (error) {
      console.error('Error creating link token:', error);
    } finally {
      setIsLoading(false);
    }
  }; */

  /* const onSuccess = async (public_token: string, metadata: any) => {
    try {
      const response = await fetch('http://localhost:8080/restapi/set_access_token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ public_token, username: 'username1', metadata }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Access token received: ", data.access_token);
      } else {
        console.error("Failed to exchange public token:", data.error);
      }
    } catch (error) {
      console.error('Error setting access token:', error);
    }
  }; */

  /* const onExit = (err: any, metadata: any) => {
    if (err) {
      console.error("Plaid link exited with error: ", err);
    }
    console.log("Exit metadata:", metadata);
  }; */

  const NavLink = ({ to, children }: { to: Href<string>; children: React.ReactNode }) => (
    <TouchableOpacity 
      style={[styles.navLink, isActiveLink(to) && styles.activeLink]}
      onPress={() => router.push(to)}
    >
      <Text style={[styles.navLinkText, isActiveLink(to) && styles.activeNavLinkText]}>
        {children}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.navbar}>
      <View style={styles.container}>
        {/* Logo */}
        <TouchableOpacity style={styles.logo} onPress={() => router.push("/")}>
          <Text style={styles.logoText}>
            <Text style={styles.greenText}>C</Text>
            <Text style={styles.whiteText}>ash</Text>
            <Text style={styles.greenText}>C</Text>
            <Text style={styles.whiteText}>ore</Text>
          </Text>
        </TouchableOpacity>

        {/* Navigation Links */}
        <View style={styles.navLinks}>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/budget">Budgeting</NavLink>
          <NavLink to="/savings">Savings</NavLink>
          <NavLink to="/loans">Loans</NavLink>
          <NavLink to="/settings">Settings</NavLink>
        </View>

        {/* Plaid Button */}
        {/* <TouchableOpacity
          style={[styles.plaidButton, isLoading && styles.disabledButton]}
          onPress={linkToken ? () => setShowPlaidModal(true) : fetchLinkToken}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.plaidButtonText}>Connect Bank</Text>
          )}
        </TouchableOpacity> */}

        {/* User Profile */}
        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            {/* <Image
              source={}
              style={styles.avatar}
            /> */}
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Jane Doe</Text>
            <Text style={styles.userEmail}>janedoe123@gmail.com</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 64,
    backgroundColor: '#121212',
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D2D',
    ...Platform.select({
      ios: {
        paddingTop: 44, // For iOS status bar
      },
      android: {
        paddingTop: 24, // For Android status bar
      },
    }),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    width: '100%',
  },
  logo: {
    marginRight: 20,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '600',
  },
  greenText: {
    color: '#22C55E',
  },
  whiteText: {
    color: '#FFFFFF',
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  navLink: {
    paddingHorizontal: 4,
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  activeLink: {
    borderBottomWidth: 2,
    borderBottomColor: '#FFFFFF',
  },
  navLinkText: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  activeNavLinkText: {
    color: '#FFFFFF',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 24,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4B5563',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    flexDirection: 'column',
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  userEmail: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  /* plaidButton: {
    backgroundColor: '#22C55E',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  disabledButton: {
    opacity: 0.5,
  },
  plaidButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  }, */
});

export default Navbar;