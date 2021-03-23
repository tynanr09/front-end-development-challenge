import "./pointtracker.scss";


const PointTracker = ({maxPoints, currentPoints}) => {
    return (
        <div id="point-tracker" className="container">
            <div className="heading">{currentPoints} / {maxPoints}</div>
            <div className="secondary-heading"><span>&nbsp;</span>Points Spent</div>
        </div>
    );
}

export default PointTracker;