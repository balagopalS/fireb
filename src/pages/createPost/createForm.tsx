import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface createFormData {
  title: string;
  description: string;
}

function CreateForm() {
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  //form schema
  const schema = yup.object().shape({
    title: yup.string().required("Title is necessary"),
    description: yup.string().required("Post Body is necessary"),
  });

  //Resolver to set up the fucntions
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createFormData>({
    resolver: yupResolver(schema),
  });

  const postRef = collection(db, "posts");

  //function to be called on handleSubmit()
  const onCreatePost = async (data: createFormData) => {
    await addDoc(postRef, {
      title: data.title,
      description: data.description,
      userName: user?.displayName,
      userId: user?.uid,
    });
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onCreatePost)}>
        <input placeholder="Title..." {...register("title")} />
        <p style={{ color: "red" }}>{errors.title?.message}</p>
        <textarea placeholder="Description..." {...register("description")} />
        <p style={{ color: "red" }}>{errors.description?.message}</p>
        <input type="submit" className="submitForm" />
      </form>
    </div>
  );
}

export default CreateForm;
