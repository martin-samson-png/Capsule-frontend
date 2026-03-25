import type {
  LoginFormInterface,
  RegisterFormInterface,
} from "./../types/forms";

export const useAuth = () => {
  const supabase = useSupabaseClient();

  const register = async (data: RegisterFormInterface) => {
    return await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: { data: { display_name: data.username } },
    });
  };

  const login = async (data: LoginFormInterface) => {
    return await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
  };

  const signOut = async () => {
    return await supabase.auth.signOut();
  };

  return { register, login, signOut };
};
