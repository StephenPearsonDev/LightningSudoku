import Timer from './Timer'

const BottomControls = (
    {
        toggleTimerPause,
        resetTimer,
        time,
        isTimerPaused
    }
) => {

    return (

        <div className="bottom-controls">

              <div className="timer-row">
               
                
                <button onClick={toggleTimerPause} className="btn btn-blue">
                  {isTimerPaused ? 'Unpause' : 'Pause'}
                </button>
                <Timer time={time} />
                <button onClick={resetTimer} className="btn btn-red">
                  Reset Timer
                </button>
              </div>
            </div>
    );
}

export default BottomControls;