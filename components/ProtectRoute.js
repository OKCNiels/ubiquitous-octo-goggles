import { ActivityIndicator, StyleSheet} from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';

export default function ProtectRoute({ children }) {
    const router = useRouter();
    const {user, isLoading} = useSelector((state) => state.auth);

    useEffect(() => {
        if (!isLoading && !user) {
            // console.log('sin session');
            
            router.push("/auth/login");
        }
    }, [isLoading, user, router]);

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff"></ActivityIndicator> ;
    }
    if (!user){ return null}
  return children
}

const styles = StyleSheet.create({})