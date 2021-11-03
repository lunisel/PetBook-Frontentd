import { RouteComponentProps } from "react-router";

export interface logInInt {
  email: string;
  password: string;
  stayConnected: boolean;
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
  user: string
  _id: string
}

export interface myOwnerInt {
  name: string;
  surname: string;
  ownerAvatar?: string;
  birthday?: string;
}

export interface userInt {
  _id?:string
  petName: string;
  nickname?: string;
  username: string;
  avatar: string;
  species?: string;
  email: string;
  password: string;
  bio?: string;
  birthday?: string;
  city?: string;
  myOwner: myOwnerInt;
  followers: Array<friendsInt>;
  following: Array<friendsInt>;
  refreshToken: string | null;
}

export interface reduxStateInt {
  user: {
    currentUser: userInt | null;
  };
}

export interface meProfileNavInt {
  posts: boolean;
  informations: boolean;
  friends: boolean;
  photos: boolean;
}

export interface infoMeInt {
  bio?: string;
  species?: string;
  birthday?: string;
  city?: string;
  email: string;
  password: string;
  myOwner: {
    name: string;
    surname: string;
    ownerAvatar: string;
    birthday?: string;
  };
}

export interface commentsInt{
  refPost: string,
  user: string,
  text: string
}

export interface postInt{
  _id: string 
  user: userInt,
  content:{
    text: string,
    img?: string
  },
  likes: Array<userInt>,
  comments: Array<commentsInt>
  createdAt: Date,
  updatedAt: Date
}

export interface sendPostInt{
  content:{
    text: string,
    img?: string
  }
}

export interface sendRequestWithTokenPropsInt {
  requestFuncion: any,
  props: RouteComponentProps,
  id?: string
}