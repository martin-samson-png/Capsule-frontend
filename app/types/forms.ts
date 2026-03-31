export interface RegisterFormInterface {
  username: string;
  email: string;
  password: string;
}

export interface LoginFormInterface {
  email: string;
  password: string;
}

export type OptionProps = {
  label: string;
  value: string;
};
