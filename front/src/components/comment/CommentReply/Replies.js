import { useState, useEffect } from "react";
import * as Api from "../../../api";
import Reply from "./Reply";
import ReplyAddForm from "./ReplyAddForm";

const Replies = ({ id, author }) => {
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    Api.get("comment", id).then((res) => setReplies(res.data[0].replys));
  }, [id]);

  return (
    <>
      {replies &&
        replies.map((reply) => (
          <Reply
            key={reply.id}
            reply={reply}
            isEditable={author.id === reply.authorId}
            setReplies={setReplies}
          />
        ))}
      <ReplyAddForm author={author} CommentId={id} setReplies={setReplies} />
    </>
  );
};

export default Replies;
