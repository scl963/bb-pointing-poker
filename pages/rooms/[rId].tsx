import { useRouter } from 'next/router'
import React, {useEffect} from 'react'


const Post = ({socket}) => {
    // console.log(socket)
  const router = useRouter()
  const { rId } = router.query

  type CurrentState = {
    admin: string | null;
    points: object;
    showPoints: boolean;
  };

  const pointValues = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

  const[currentState, setCurrentState] = React.useState<CurrentState>({
    admin: null,
    points: {},
    showPoints: false,
  })
  
  const assignedPointsArray = React.useMemo(() => { 
    return Object.keys(currentState?.points || {})
    .filter((userId) => userId != socket.id)
    .map((userId) => {
      return currentState.points[userId];
    })
    .sort() || []}, [currentState?.points, socket.id])


  useEffect(() => {
    socket.emit("join-room-by-id", rId, (res) => {
      if (res.status === "error") {
        router.push('/')
      }

      setCurrentState({...res.data})
    });

    socket.on("state-change", (state) => {
      setCurrentState({...state})
    });
  }, [socket]);
  
  const userAssignedPointValue = currentState?.points?.[socket.id];
  const isAdmin = currentState.admin

  console.log(currentState)

  function assignPointValue(pointValue: number) {
    if (currentState.showPoints === true) return;
    currentState.points[socket.id] = pointValue;
    socket.emit("assign-point-value", rId, pointValue, (res) => {
      console.error("Error assigning point value", res);
      currentState.points[socket.id] = null;
    });
  }

  function adminShowPoints() {
    socket.emit("admin-show-points", rId);
  }

  function adminResetPoints() {
    socket.emit("admin-reset-points", rId);
  }
  return (
    <div className="page-layout">
     <div className="cards-container">
      <div className="pointing-cards">
        <div
          className={`flip-container${
            userAssignedPointValue === null ? "" : " flip"
          }`}
        >
          <div className="flipper">
            <div className="point-placeholder front" />
            <div className="point-placeholder back">
              {userAssignedPointValue === null ? "" : userAssignedPointValue}
            </div>
          </div>
        </div>
        </div>
        {assignedPointsArray.map((assignedPointValue, index) => (
          <div key={index} className="point-placeholder">
          {assignedPointValue == null ? '...' : assignedPointValue}
        </div>
        ))}
      </div>
      <div className="pointing-cards">
        {pointValues.map((point) => (
          <button
          key={point}
          className="point-button"
          onClick={() => assignPointValue(point)}
        >
          {point}
        </button>
        ))}
      </div>
    {isAdmin &&
      <div className="admin-controls">
        <button className="admin-button" onClick={adminShowPoints}
        >Display points</button>
        <button className="admin-button" onClick={adminResetPoints}>Reset points</button>
      </div>
    }
  </div>
  )
}

export default Post