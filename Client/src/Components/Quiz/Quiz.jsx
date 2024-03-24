import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuiz } from "../../Redux/quiz/action";
import "./Quiz.css";
import startImage from '/img/start.png';
import questionImage from '/img/question.png';
import starImage from '/img/star.png';
import deleteImage from '/img/deletec.png';

const Quiz = ({ data }) => {
  const dispatch = useDispatch();

  const {
    user: { userType },
  } = useSelector((store) => store.auth.data);

  const deleteQuizFunc = (id) => {
    dispatch(deleteQuiz(id));
  };

  return (
    <div className="quizDiv">
      <div>
        <img src={data.thumbnail} alt="thumbnail" />
      </div>
      <div>
        <div>
          <p>{data.title}</p>
          <p>{data.subject}</p>
          <p>Class {data.class}</p>
          <p className="quizTime">{data.totalTime} mins</p>
        </div>
        <div className= "quizRight">
          <p className="quizPoint"><img src={questionImage}/>Questions : {data.noOfQuestions}</p>
          <p className="quizPoint"><img src={starImage}/>Points : {data.totalPoint}</p>
          {userType == "Admin" || userType == "Tutor" ? (
            <button
              className="deleteQuiz"
              onClick={() => deleteQuizFunc(data._id)}
            >
              <img src={deleteImage}/>
            </button>
          ) : (
            <button className="startQuiz"><img src={startImage}/></button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
