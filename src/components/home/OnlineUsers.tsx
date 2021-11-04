import { useState } from "react";

const OnlineUsers = () => {
  const [onlineUsers, setOnlineUsers] = useState(false);
  return (
    <div className="online-users-content">
      <h4 className="online-users-title">Online</h4>
      <div className="online-users-container-little">
        {onlineUsers ? (
          <div className="single-online-user-cont">
            <img
              src="https://i.guim.co.uk/img/media/684c9d087dab923db1ce4057903f03293b07deac/205_132_1915_1150/master/1915.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=f598594a7559c44214065b57f2cb8583"
              alt=""
              className="online-user-avatar"
            />
            <div className="name-of-online-user">Remi</div>
          </div>
        ) : (
          <div>No online users</div>
        )}
      </div>
    </div>
  );
};

export default OnlineUsers;
