import React, { useEffect } from 'react';
import { IComment } from '../../models';
import CommentsList from './comments';
import CommentForm from './commentForm';
//mport { useComments } from '../../hooks/useComments';
import { useDispatch, useSelector } from 'react-redux';
import {
  addComment,
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList,
  removeComment,
} from '../../store/comments';
import { getCurrentUserId } from '../../store/users';

interface Props {
  userId: string;
}

const CommentsBlock = ({ userId }: Props) => {
  const dispatch: any = useDispatch();
  const currentUserId = useSelector(getCurrentUserId());
  useEffect(() => {
    dispatch(loadCommentsList(userId));
  }, [userId]);
  const isLoading = useSelector(getCommentsLoadingStatus());
  //const { addComment, removeComment } = useComments();
  const comments = useSelector(getComments());
  // useEffect(() => {
  //   // api.users.getById(userId).then((data) => {
  //   //   setUser(data);
  //   // });
  //   // api.users.fetchAll().then((data) => {
  //   //   setAuthors(data);
  //   // });
  //   api.comments.fetchCommentsForUser(userId).then((data) => {
  //     data.sort((a, b) => {
  //       if (a.created_at > b.created_at) return -1;
  //       else if (a.created_at < b.created_at) return 1;
  //       else return 0;
  //     });
  //     setComments(data);
  //   });
  // }, []);

  const handleRemoveComment = (c: IComment) => {
    // api.comments.remove(c._id).then((data) => {
    //   setComments(comments.filter((x) => x._id !== c._id));
    // });
    // removeComment(c._id);
    dispatch(removeComment(c._id));
  };

  const handleAddComment = (content: string) => {
    //console.log(authorId, content);
    // api.comments.add({ userId: authorId, pageId: userId, content: content }).then((data) => {
    //   setComments(comments.concat([data]));
    // });
    //addComment(content);
    dispatch(addComment(currentUserId, userId, content));
  };

  return (
    <div className="col-md-8">
      <div className="card mb-2">
        <div className="card-body">
          <div>
            <h2>New comment</h2>
            <CommentForm onAddComment={handleAddComment}></CommentForm>
          </div>
        </div>
      </div>

      {!isLoading && comments && comments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body">
            <h2>Comments</h2>
            <hr />
            <CommentsList comments={comments} onRemove={handleRemoveComment} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentsBlock;
