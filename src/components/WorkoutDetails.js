import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import Iframe from "react-iframe";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
      navigate("/voteform");
    }
  };

  return (
    <>
      <div className="workout-details">
        <h4>Your code is {user.orgName}. You voted as the following:</h4>
        <p>
          <strong>Zotang: </strong> {workout.title}
        </p>
        <p>
          <strong>Zolia: </strong>

          {workout.load}
        </p>
        <p>
          <strong>Idol: </strong>
          {"   "}
          {workout.reps}
        </p>
        <p>
          You voted {""}
          {formatDistanceToNow(new Date(workout.createdAt), {
            addSuffix: true,
          })}
        </p>
        <span className="material-symbols-outlined" onClick={handleClick}>
          delete
        </span>
      </div>
      <div className="iframe-details">
        <Iframe
          style="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);"
          width="100%"
          height="400"
          src="https://charts.mongodb.com/charts-project-0-ylzik/embed/charts?id=64652fdb-ed0b-4c57-8be6-439dc403e27b&maxDataAge=60&theme=light&autoRefresh=true"
        ></Iframe>
      </div>
      <div className="iframe-details">
        <Iframe
          style="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);"
          width="100%"
          height="400"
          src="https://charts.mongodb.com/charts-project-0-ylzik/embed/charts?id=64653101-a657-4945-8244-58b171fef607&maxDataAge=60&theme=light&autoRefresh=true"
        ></Iframe>
      </div>
    </>
  );
};

export default WorkoutDetails;
