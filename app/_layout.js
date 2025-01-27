import { Stack } from "expo-router";
import queryClient from "./services/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import AppWrapper from "./redux/AppWrapper";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function RootLayout() {
    // el componente Stack.Screen es la barra superior de la app, el name indica el archivo js y el titulo el texto que se muestra, el headerShown es para mostrar o no la barra superiorcon el true o false
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <AppWrapper />
                {/* <Stack>
                    <Stack.Screen 
                        name="index" options={{ headerShown: false, title: "Welcome"}} 
                    />
                </Stack> */}
            </QueryClientProvider>
        </Provider>
    );
}