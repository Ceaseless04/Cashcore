import React, { useState } from 'react';
import { StyleSheet } from "react-native";
import { PlaidLink } from 'react-plaid-link';

export default function PlaidTesting() {
    const [linkToken, setLinkToken] = useState<string | null>(null)


    const fetchLinkToken = async () => { // Get link_token from Backend
        try {
            const response = await fetch('http://localhost:8000/restapi/create_link_token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({ user_id: 18762 }) // Provide User ID here --> comes from browser
            });
            const data = await response.json()
            setLinkToken(data.link_token)
        } catch (error) {
            console.error("Error fetching link token: ", error)
        }
    }


    // Call this function to trigger the Plaid link flow
    const onSuccess = async (public_token: string, metadata: any) => {
        console.log("Plaid link successful: ", public_token, metadata)
        // Send the public token to your backend for further processing
        // DO THIS!!!!

        try {
            // Send the public token to the backend for exchange
            const response = await fetch('http://localhost:8000/restapi/set_access_token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ public_token: public_token , user_id: 7, metadata: metadata}),
            });
            const data = await response.json();
            
            if (response.ok) {
                // Delete this line in production --> access_token should never leave the backend
                console.log("Access token received: ", data.access_token); 
            } else {
                console.error("Failed to exchange public token:", data.error);
            }
        } catch (error) {
            console.error("Error exchanging public token: ", error);
        }
    }


    const onExit = (error: any, metadata: any) => {
        if (error) {
            console.error("Plaid link exited with error: ", error)
        }
        console.log("Exit metadata:", metadata)
    }

    // 2 Types of Tokens:
    //
    // 1) Link Token --> Typically used for general bank account linking, where you only need to authenticate a user’s bank account and retrieve financial data. This process doesn’t involve creating a user token or consumer report identity data.
    //
    // 2) User Token --> Used in advanced flows where specific information about the user is required to verify their identity or assess financial details, such as for employment or income verification. This token allows access to products in the Plaid Check, Income, and Multi-Item categories.


    //Sandbox Credentials:
    //
    //Username: user_good
    //Password: pass_good
    //2FA Code: 1234


    return (
        <div style={styles.container}>
            <h1 style={styles.n10_title}>Plaid Testing Page</h1>

            <h2>Link Token: </h2>

            <button onClick={fetchLinkToken}>Get Link Token</button> {/* Trigger token fetch */}

            {/* Will only be rendered when the link_token is fetched */}
            {linkToken && (
                <div style={styles.plaidContainer}>
                    <PlaidLink token={linkToken} onSuccess={onSuccess} onExit={onExit}>
                        <button style={styles.linkButton}>Link Your Bank Account</button>
                    </PlaidLink>
                </div>
            )}
        </div>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#3E3E3E",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    n10_title: {
      color: "#979797",
      textAlign: "center",
    },

    plaidContainer: {
        display: "flex",
        justifyContent: "center",  
        alignItems: "center",  
        width: "100%",  
    },
    
    linkButton: {
        alignContent: "center",
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
        cursor: "pointer",
    },
})