import React, { useEffect, useState } from "react";

import { useParams, useHistory } from "react-router-dom";

import commentsApi from "apis/comments";
import tasksApi from "apis/tasks";
import Comments from "components/Comments";
import Container from "components/Container";
import PageLoader from "components/PageLoader";

const Show = () => {
  const [task, setTask] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();

  const history = useHistory();

  const updateTask = () => {
    history.push(`/tasks/${task.slug}/edit`);
  };

  const fetchTaskDetails = async () => {
    try {
      const {
        data: { task },
      } = await tasksApi.show(slug);
      setTask(task);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await commentsApi.create({ content: newComment, task_id: task.id });
      fetchTaskDetails();
      setNewComment("");
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <div className="flex justify-between text-bb-gray-600 mt-10">
        <h1 className="pb-3 mt-5 mb-3 text-lg leading-5 font-bold">
          {task?.title}
        </h1>
        <div className="bg-bb-env px-2 mt-2 mb-4 rounded">
          <i
            className="text-2xl text-center transition duration-300
             ease-in-out ri-edit-line hover:text-bb-yellow"
            onClick={updateTask}
          />
        </div>
      </div>
      <h2
        className="pb-3 mb-3 text-md leading-5 text-bb-gray-600
       text-opacity-50"
      >
        <span>Assigned To : </span>
        {task?.assigned_user.name}
      </h2>
      <h2 className="pb-3 mb-3 text-md leading-5 text-bb-gray-600 text-opacity-50">
        <span>Created By : </span>
        {task?.task_owner?.name}
      </h2>
      <Comments
        comments={task?.comments}
        handleSubmit={handleSubmit}
        loading={loading}
        newComment={newComment}
        setNewComment={setNewComment}
      />
    </Container>
  );
};

export default Show;
