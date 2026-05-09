import { supabase } from "@/lib/supabase";
import { setSession } from "@/store/slices/authSlice";
import { Redirect } from "expo-router";
import React, { useEffect } from "react";
import { AppState } from "react-native";
import { useDispatch } from "react-redux";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(setSession(session));
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setSession(session));
    });

    return () => subscription?.unsubscribe();
  }, [dispatch]);

  return <Redirect href="/(tabs)" />;
};

export default App;
