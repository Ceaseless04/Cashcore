import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Link } from "expo-router";
import { usePlaidLink, PlaidLinkError } from 'react-plaid-link';

const Navbar = () => {
  const [linkToken, setLinkToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPlaidModal, setShowPlaidModal] = useState(false);
  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
      setShowPlaidModal(false);
      onSuccess(public_token, metadata);
    },
    onExit: (err, metadata) => {
      setShowPlaidModal(false);
      onExit(err, metadata);
    },
    overlay: true, // This is z-index 50
    position: "center", // This is position: "center"
    displayMode: "overlay"
  });


  useEffect(() => {
    if (showPlaidModal && ready && open) {
      open();
    }
  }, [showPlaidModal, ready, open]);


  const fetchLinkToken = async () => {
    try {
        setIsLoading(true);
        const response = await fetch('http://localhost:8000/restapi/create_link_token/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: 'username11' }),
        })

        // const data = { link_token: 'random data' }
        const data = await response.json();
        setLinkToken(data.link_token);
      } catch (error) {
        console.error('Error creating link token:', error);
      } finally {
        setIsLoading(false);
      }
  };

  const onSuccess = async (public_token: string, metadata: Record<string, any>) => {
    try {
      const response = await fetch('http://localhost:8000/restapi/set_access_token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ public_token: public_token, username: 'username11', metadata: metadata }),
      });
      const data = await response.json(); // Delete this line in production --> access_token should never leave the backend
      if (response.ok) {
          console.log("Access token received: ", data.access_token); 
      } else {
          console.error("Failed to exchange public token:", data.error);
      }
    } catch (error) {
      console.error('Error setting access token:', error);
    }
  };


  const onExit = (err: PlaidLinkError | null, metadata: Record<string, any>) => {
    if (err) {
      console.error("Plaid link exited with error: ", err)
    }
    console.log("Exit metadata:", metadata)
  };


  return (
    <View style={styles.navbar}>
      {/* Logo */}
      <Link href="/" style={styles.logoLink}>
        <Text style={styles.logoText}>
          <Text style={styles.green}>C</Text>ash
          <Text style={styles.green}>C</Text>ore
        </Text>
      </Link>

      {/* Navigation Links */}
      <View style={styles.navLinks}>
        {["Dashboard", "Budgeting", "Savings", "Loans", "Settings"].map((key) => (
          <Link
            href={`/pages/${key.toLowerCase()}`}
            key={key}
            style={[
              styles.navLink,
            //   isActiveLink(`./${key}`) && styles.activeLink,
              styles.activeLink,
            ]}
          >
            <Text style={styles.linkText}>
              {`${key}`}
            </Text>
          </Link>
        ))}
      </View>

      {/* Plaid Link Button */}
      <TouchableOpacity
        onPress={linkToken ? () => setShowPlaidModal(true) : fetchLinkToken}
        disabled={isLoading}
        style={[
          styles.button,
          isLoading && styles.disabledButton,
        ]}
      >
        <Text style={styles.buttonText}>
            {isLoading ? 'Getting Token...' : (linkToken ? 'Link Bank Account' : 'Get Link Token')}
        </Text>
      </TouchableOpacity>

      {/* User Profile */}
      <View style={styles.profile}>
        <Image
          source={{ uri: "/avatar-placeholder.png" }}
          style={styles.avatar}
          alt="Profile"
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>
            Jane Doe
          </Text>
          <Text style={styles.userEmail}>
            janedoe123@gmail.com
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 64,
    backgroundColor: "#1E1E1E",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#4B5563",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoLink: {
    textDecorationLine: "none",
  },
  logoText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  green: {
    color: "#10B981",
  },
  navLinks: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  navLink: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    textDecorationLine: "none",
  },
  linkText: {
    color: "#9CA3AF",
    fontSize: 16,
  },
  activeLink: {
    borderBottomWidth: 2,
    borderBottomColor: "#FFFFFF",
    color: "#FFFFFF",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#10B981",
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  disabledButton: {
    opacity: 0.5,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#6B7280",
  },
  userInfo: {
    flexDirection: "column",
  },
  userName: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  userEmail: {
    color: "#9CA3AF",
    fontSize: 12,
  },
});

export default Navbar;
