import { async } from "@firebase/util";
import {
  addDoc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import { Post as iPost } from "./Main";

interface Props {
  post: iPost;
}

interface Like {
  userId: string;
  likeId: string;
}

function Post(props: Props) {
  const { post } = props;
  const [user] = useAuthState(auth);

  const [likes, setLikes] = useState<Like[] | null>(null);

  const likeRef = collection(db, "likes");

  const likesDoc = query(likeRef, where("postId", "==", post.id));

  const hasUserLikedPost = likes?.find((like) => like.userId === user?.uid);

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };

  //function to be called on liking()
  const addLike = async () => {
    try {
      const newDoc = await addDoc(likeRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user.uid, likeId: newDoc.id }]
            : [{ userId: user.uid, likeId: newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeLike = async () => {
    try {
      const whichLikeToRemoveQuery = query(
        likeRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );
      const whichLikeToRemoveData = await getDocs(whichLikeToRemoveQuery);
      const whichLikeToRemove = doc(
        db,
        "likes",
        whichLikeToRemoveData.docs[0].id
      );
      await deleteDoc(whichLikeToRemove);
      if (user) {
        setLikes(
          (prev) =>
            prev &&
            prev.filter(
              (like) => like.likeId !== whichLikeToRemoveData.docs[0].id
            )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div>
      <div className="title">
        <h1>{post.title}</h1>
      </div>
      <div className="description">
        <h3>{post.description}</h3>
      </div>
      <div className="footer">
        <p>@{post.userName}</p>
        <button onClick={hasUserLikedPost ? removeLike : addLike}>
          {hasUserLikedPost ? <>&#128078;</> : <>&#128077;</>}
        </button>
        {likes && <p>{likes.length} Like(s)</p>}
      </div>
    </div>
  );
}

export default Post;
