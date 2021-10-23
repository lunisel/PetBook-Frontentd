export interface logInInt {
  email: string;
  password: string;
}

export interface signUpInt {
  name: string
  email: string;
  password: string;
  owner: {
    name: string
    surname: string
  }
  username: string
}
