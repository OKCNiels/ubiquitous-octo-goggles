const { Tabs } = require('expo-router');
import { FontAwesome } from '@expo/vector-icons';
import ProtectRoute from '../../components/ProtectRoute';
import { ActivityIndicator } from 'react-native';


export default function RootLayout() {
    return (
        <ProtectRoute>
            <Tabs>
                <Tabs.Screen name="index" options={{ headerShown: false, title: "Inicio", tabBarIcon: ({color}) => (
                    <FontAwesome name="home" size={28} color={color} />
                )}} />
                <Tabs.Screen name="profile" options={{ headerShown: false, title: "Perfil", tabBarIcon: ({color}) => (
                    <FontAwesome name="user" size={28} color={color} />
                )}} />
                <Tabs.Screen name="settings" options={{ headerShown: false, title: "Configuración", tabBarIcon: ({color}) => (
                    <FontAwesome name="cog" size={28} color={color} />
                )}} />
                {/* <Tabs.Screen name="Profile" component={Profile} /> */}
            </Tabs>
        </ProtectRoute>
    );
}