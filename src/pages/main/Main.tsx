import React, { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useState } from "react";
import { async } from "@firebase/util";
import Post from "./post";

export interface Post {
  id: string;
  userId: string;
  userName: string;
  title: string;
  description: string;
}

function Main() {
  const [postList, setPostList] = useState<Post[] | null>(null);
  const postRef = collection(db, "posts");
  const getPosts = async () => {
    const data = await getDocs(postRef);
    setPostList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
    );
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div>
      {postList?.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
}

export default Main;
