import { api } from "./api";
import type {
  LoginInput,
  RegisterInput,
  StoredUser,
  User,
} from "../types/auth";

// LEARNING ONLY: json-server has no real authentication, and passwords are stored
// in plain text. A real API hashes passwords on the server and returns a token.
// When you move to one, only this file needs to change.

function toUser(stored: StoredUser): User {
  return { id: stored.id, name: stored.name, email: stored.email };
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function login(input: LoginInput): Promise<User> {
  const { data } = await api.get<StoredUser[]>("/users", {
    params: { email: normalizeEmail(input.email), password: input.password },
  });

  const [match] = data;
  if (match === undefined) {
    throw new Error("Invalid email or password");
  }
  return toUser(match);
}

export async function register(input: RegisterInput): Promise<User> {
  const email = normalizeEmail(input.email);

  const { data: existing } = await api.get<StoredUser[]>("/users", {
    params: { email },
  });
  if (existing.length > 0) {
    throw new Error("An account with this email already exists");
  }

  const { data: created } = await api.post<StoredUser>("/users", {
    name: input.name.trim(),
    email,
    password: input.password,
  });
  return toUser(created);
}
