
import { AuthCredentials, ChangePassword } from "@/constant/type";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useGlobalStore } from "@/stores/state";
import { AuthWebtoonApi } from "../apiRequest";

export const useChangePasswordMutation = (
  options?: UseMutationOptions<any, unknown, ChangePassword, unknown>
) => {
  return useMutation({
    ...options,
    mutationFn: (body: Omit<ChangePassword, "change-password">) =>
      AuthWebtoonApi.ChangePassword({ body }),
  });
};

export const useLoginMutation = (
  options?: UseMutationOptions<any, unknown, AuthCredentials, unknown>
) => {
  return useMutation({
    ...options,
    mutationFn: (body: Omit<AuthCredentials, "login">) =>
      AuthWebtoonApi.Login({ body }),
  });
};

export const useRegisterMutation = (
  options?: UseMutationOptions<any, unknown, AuthCredentials, unknown>
) => {
  return useMutation({
    ...options,
    mutationFn: (body: Omit<AuthCredentials, "register">) =>
      AuthWebtoonApi.Register({ body }),
  });
};
export const useVerifyUser = () => {
  const { setIsLoggedIn, setUserData } = useGlobalStore();

  return useQuery({
    queryKey: ["verifyUser"],
    queryFn: async () => {
      const response = await AuthWebtoonApi.VerifyUser();
      if (response.status === "success") {
        setIsLoggedIn(true);
        setUserData(response.data);
      }
      return response;
    },
  });
};

export const useLogoutMutation = (options?: UseMutationOptions<any>) => {
  const queryClient = useQueryClient();
  const { setIsLoggedIn } = useGlobalStore();

  return useMutation({
    ...options,
    mutationFn: async () => await AuthWebtoonApi.Logout(),
    onSuccess: () => {
      queryClient.clear();
      setIsLoggedIn(false);
    },
    mutationKey: ["logout"],
  });
};
export const useChangeAvatarMutation = () => {
  return useMutation({
    mutationFn: async (body: any) => {
      const response = await AuthWebtoonApi.ChangeAvatar({ body: body });
      return response;
    },
    mutationKey: ["changeAvatar"],
  });
};
