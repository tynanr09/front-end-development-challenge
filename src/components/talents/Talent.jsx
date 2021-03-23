import "./talent.scss";

const Talent  = ({ name, active, handleLeftClick, handleRightClick, renderBranch, isClickable }) => {
    const getTalentClassName = () => {
        let classes = [active ? "active-talent" : "inactive-talent"];

        if(isClickable && isClickable()) {
            classes.push("clickable");
        }

        return classes.join(" ")
    }

    const getIconId = () => {
        return active ? "active-" + name : "inactive-" + name;
    }

    return (
        <>
            {renderBranch !== undefined ? renderBranch() : null}
            <li id={getIconId()} className={getTalentClassName()}
                onClick={() => handleLeftClick()}
                onContextMenu={() => handleRightClick()}>
            </li>
        </>
    )
}

export default Talent;