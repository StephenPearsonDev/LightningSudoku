
export default function Feedback({ feedbackMessage, illegalMoveMessage }) {
  return (
    <div className="feedback-container">
      <div className="feedback-box">
        {(feedbackMessage || illegalMoveMessage) && (
          <div className="feedback-message">
            {feedbackMessage || illegalMoveMessage}
          </div>
        )}
      </div>
    </div>
  )
}
