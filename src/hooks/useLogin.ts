import { useMutation } from "@tanstack/react-query";
import type { UseMutationResult } from "@tanstack/react-query";
import { login } from "../services/authService";
import type { LoginInput, User } from "../types/auth";
import { useAuth } from "./useAuth";

// Checks the credentials, then remembers the user app-wide.
export function useLogin(): UseMutationResult<User, Error, LoginInput> {
  const { signIn } = useAuth();

  return useMutation({
    mutationFn: (input: LoginInput) => login(input),
    onSuccess: (user) => signIn(user),
  });
}
