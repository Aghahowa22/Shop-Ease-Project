import { useMutation } from "@tanstack/react-query";
import type { UseMutationResult } from "@tanstack/react-query";
import { register } from "../services/authService";
import type { RegisterInput, User } from "../types/auth";
import { useAuth } from "./useAuth";

// Creates the account, then logs the new user in straight away.
export function useRegister(): UseMutationResult<User, Error, RegisterInput> {
  const { signIn } = useAuth();

  return useMutation({
    mutationFn: (input: RegisterInput) => register(input),
    onSuccess: (user) => signIn(user),
  });
}
