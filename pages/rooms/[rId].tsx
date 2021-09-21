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

  const[currentState, setCurrentState] = React.useState({
    admin: null,
    points: {},
    showPoints: false,
  })
  
  // $: assignedPointsArray =
  //   Object.keys(currentState?.points || {})
  //     .filter((userId) => userId != socket.id)
  //     .map((userId) => {
  //       return currentState.points[userId];
  //     })
  //     .sort() || [];

  




  // $: userAssignedPointValue = currentState?.points[socket.id];


  // $: isAdmin = currentState?.admin === socket.id;

  //does socket even work as a useEffect dependency?
  useEffect(() => {
    console.log(socket.id, currentState?.admin)
    setCurrentState((currentState) =>  ({...currentState, admin: currentState?.admin === socket.id}))
  },[socket])

  console.log(currentState)

  // function assignPointValue(pointValue: number) {
  //   if (currentState.showPoints === true) return;
  //   currentState.points[socket.id] = pointValue;
  //   socket.emit("assign-point-value", rId, pointValue, (res) => {
  //     console.error("Error assigning point value", res);
  //     currentState.points[socket.id] = null;
  //   });
  // }

  // function adminShowPoints() {
  //   socket.emit("admin-show-points", rId);
  // }

  // function adminResetPoints() {
  //   socket.emit("admin-reset-points", rId);
  // }

  // React.useEffect( () =>
  //   socket.emit("join-room-by-id", rId, (res) => {
  //     if (res.status === "error") {
  //       navigate("/");
  //     }

  //     currentState = res.data;
  //   })

  //   socket.on("state-change", (state) => {
  //     currentState = state;
  //   })
  // ), []);

  return (
    <div className="page-layout">
    {/* <div className="cards-container">
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
        {#each assignedPointsArray as assignedPointValue}
          <div className="point-placeholder">
            {#if assignedPointValue === null}
              ...
            {:else if assignedPointValue && !currentState.showPoints}
              ?
            {:else}
              {assignedPointValue}
            {/if}
          </div>
        {/each}
      </div>
  
      <div className="pointing-cards">
        {#each pointValues as pointValue}
          <button
            className="point-button"
            on:click={() => assignPointValue(pointValue)}
          >
            {pointValue}
          </button>
        {/each}
      </div>
    </div>
   */}
    {currentState.admin &&
      <div className="admin-controls">
        <button className="admin-button"
          >Display points</button
        >
        <button className="admin-button" 
          >Reset points</button
        >
      </div>
    }
  </div>
  )
}

export default Post