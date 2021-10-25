export interface logInInt {
  email: string;
  password: string;
}

export interface signUpInt {
  petName: string;
  email: string;
  password: string;
  myOwner: {
    name: string;
    surname: string;
  };
  username: string;
}

export interface friendsInt {
  user: {
    _id: String;
  };
  status: Number;
}

export interface myOwnerInt {
  name: String;
  surname: String;
  avatar?: String;
  birthday?: String;
}

export interface userInt {
  name: String;
  nickname?: String;
  username: String;
  avatar?: String;
  species?: String;
  email: String;
  password: String;
  bio?: String;
  birthday?: String;
  city?: String;
  myOwner: myOwnerInt;
  friends: Array<friendsInt>;
  refreshToken: String | null;
}

export interface reduxStateInt {
  user: {
    currentUser: userInt | null;
  };
}
