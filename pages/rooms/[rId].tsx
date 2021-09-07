import { useRouter } from 'next/router'


const Post = ({socket}) => {
    console.log(socket)
  const router = useRouter()
  const { rId } = router.query

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
  
    {#if isAdmin}
      <div className="admin-controls">
        <button className="admin-button" on:click={adminShowPoints}
          >Display points</button
        >
        <button className="admin-button" on:click={adminResetPoints}
          >Reset points</button
        >
      </div>
    {/if}
  </div>
  )
}

export default Post