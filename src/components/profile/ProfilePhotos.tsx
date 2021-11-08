import { RouteComponentProps } from "react-router";
import { postInt, userInt } from "../../utils/interfaces";
import { Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getPhotosFromSingleUser } from "./profileLogic";
import SinglePhoto from "./SinglePhoto"

interface profilePhotosPropsInt {
  user: userInt | null;
  routerProps: RouteComponentProps;
}

const ProfilePhotos = (props: profilePhotosPropsInt) => {
  const [allPhotos, setAllPhotos] = useState<postInt[] | null>(null);
  

  useEffect(() => {
    const fetchAll = async () => {
      try {
        let data = await getPhotosFromSingleUser(props.user?._id?.toString());
        if (data) setAllPhotos(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAll();
  }, []);

  return (
    <div className="profile-photos-container">
      <Row>
        {allPhotos &&
          allPhotos.map((p, i) => (
            <SinglePhoto p={p} i={i} user={props.user} routerProps={props.routerProps}/>
          ))}
      </Row>
    </div>
  );
};

export default ProfilePhotos;
