const ErrorState = ({ message, onRetry }) => {
    return (
        <div className="state-box">
            <p>Something went wrong: {message}</p>
            <button onClick={onRetry}>Try Again</button>
        </div>
    )
}

export default ErrorState