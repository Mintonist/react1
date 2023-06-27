import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { IComment } from '../models';
import commentService from '../services/comment.service';
import { useParams } from 'react-router-dom';
import { useAuth } from './useAuth';
import { nanoid } from 'nanoid';

interface ICommentContext {
  isLoading: boolean;
  comments: IComment[];
  //getComments?: (string) => IComment;
  //updateComment?: (string, any) => Promise<IComment>;
  addComment?: (string) => any;
  removeComment?: (string) => any;
}

const CommentsContext = createContext<ICommentContext>(null);

export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [error, setError] = useState<string>(null);
  const [isLoading, setLoading] = useState(true);
  //const prevState = useRef<IComment[]>(null);
  const { userId } = useParams();
  const { user } = useAuth();

  async function getComments() {
    try {
      const data = await commentService.getComments(userId);
      console.log('CommentsProvider', data);
      setComments(data.content);
    } catch (err) {
      console.log('CommentsProvider err', err);
      const { message } = err.response.data;
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getComments();
  }, [userId]);

  // const getComments = (pageId) => {
  //   return comments.find((q) => q.pageId === pageId);
  // };

  // const updateComment = async (id: string, data: any) => {
  //   try {
  //     const { content } = await commentService.update(id, data);
  //     setComments((prevState) =>
  //       prevState.map((q) => {
  //         if (q._id === content._id) {
  //           q = { ...q, ...content };
  //         }
  //         return q;
  //       })
  //     );
  //     return content as IComment;
  //   } catch (err) {
  //     catchError(err);
  //   }
  // };

  async function addComment(msg: string) {
    try {
      const comment = { _id: nanoid(), userId: user._id, pageId: userId, content: msg, created_at: Date.now() };
      const { content } = await commentService.add(comment);
      setComments((prevState) => prevState.concat([comment]));
      return content as IComment;
    } catch (err) {
      catchError(err);
    }
  }

  const removeComment = async (id) => {
    try {
      const { content } = await commentService.delete(id);
      //firebase при успешном удалении возвращает null
      if (content == null) {
        setComments((prevState) => {
          return prevState.filter((q) => q._id !== id);
        });
      }
    } catch (err) {
      catchError(err);
    }
  };

  const catchError = (err) => {
    const { message, code } = err.response.data;
    const status = err.response.status;
    setError(message);
    console.log('Expected error: ' + status, code, message);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    setError(null);
  }, [error]);

  return (
    <CommentsContext.Provider value={{ isLoading, comments, addComment, removeComment }}>
      {!isLoading ? children : <h2>Loading comments...</h2>}
      {/* {children} */}
    </CommentsContext.Provider>
  );
};

export const useComments = () => {
  return useContext(CommentsContext);
};
