import { RouteComponentProps } from "react-router";
import { userInt } from "../../utils/interfaces";

interface friendsInfoPropsInt {
  user: userInt | null;
  routerProps: RouteComponentProps;
}

const FriendsInformation = (props: friendsInfoPropsInt) => {
  let user = props.user;
  return (
    <div className="friends-info-cont">
      <div className="me-pet-info-container">
        <div className="info-content-container">
          <span className="info-name">Bio:</span>
          <span className="info-content">{user?.bio}</span>
        </div>

        <div className="info-content-container">
          <span className="info-name">Species:</span>
          <span className="info-content">{user?.species}</span>
        </div>

        <div className="info-content-container">
          <span className="info-name">Birthday:</span>
          <span className="info-content">{user?.birthday}</span>
        </div>

        <div className="info-content-container">
          <span className="info-name">City:</span>
          <span className="info-content">{user?.city}</span>
        </div>

        <div className="info-content-container">
          <span className="info-name">Email:</span>
          <span className="info-content">{user?.email}</span>
        </div>
      </div>

      <div className="divider-me-info"></div>

      <div className="me-my-owner-info-container">
        <div className="avatar-owner-container">
          <img
            src={user?.myOwner.ownerAvatar}
            alt="pet-avatar"
            className="owner-avatar-me-page"
          />
        </div>

        <div className="info-content-container owner">
          <span className="info-name" id="info-name-bio">
            Name:
          </span>
          <span className="info-content owner">{user?.myOwner.name}</span>
        </div>

        <div className="info-content-container owner">
          <span className="info-name" id="info-name-bio">
            Surname:
          </span>
          <span className="info-content owner">{user?.myOwner.surname}</span>
        </div>

        <div className="info-content-container owner">
          <span className="info-name" id="info-name-bio">
            Birthday:
          </span>
          <span className="info-content owner">{user?.myOwner.birthday}</span>
        </div>

      </div>
    </div>
  );
};

export default FriendsInformation;
