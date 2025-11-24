import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import type { RootState } from "@/store";
import {
  setCredentials,
  logout as logoutAction,
} from "@/store/slices/authSlice";
import {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  type LoginRequest,
  type RegisterRequest,
} from "@/store/services/authService";

export const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user, token, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const [loginMutation, { isLoading: isLoggingIn }] = useLoginMutation();
  const [registerMutation, { isLoading: isRegistering }] =
    useRegisterMutation();
  const [logoutMutation] = useLogoutMutation();

  const login = useCallback(
    async (credentials: LoginRequest) => {
      try {
        const response = await loginMutation(credentials).unwrap();
        dispatch(setCredentials(response));
        return { success: true, data: response };
      } catch (error: any) {
        return {
          success: false,
          error: error?.data?.message || "Login failed. Please try again.",
        };
      }
    },
    [loginMutation, dispatch]
  );

  const register = useCallback(
    async (userData: RegisterRequest) => {
      try {
        const response = await registerMutation(userData).unwrap();
        dispatch(setCredentials(response));
        return { success: true, data: response };
      } catch (error: any) {
        return {
          success: false,
          error:
            error?.data?.message || "Registration failed. Please try again.",
        };
      }
    },
    [registerMutation, dispatch]
  );

  const logout = useCallback(async () => {
    try {
      // Call API logout endpoint (optional, for logging/analytics)
      await logoutMutation().unwrap();
    } catch (error) {
      // Even if API call fails, clear local state
      console.error("Logout API call failed:", error);
    } finally {
      // Always clear local auth state
      dispatch(logoutAction());
      router.push("/login");
    }
  }, [logoutMutation, dispatch, router]);

  return {
    user,
    token,
    isAuthenticated,
    isLoggingIn,
    isRegistering,
    login,
    register,
    logout,
  };
};
