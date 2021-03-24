import { Talent } from ".";

import "./talent.scss";

const TalentTree = ({ talents, name, value, handleActivateTalent, handleDeactivateTalent }) => {
    const renderBranch = (index) => {

        const getBranchClasses = () => {
            let classes = ["talent-branch"];

            if (talents[index].active) {
                classes.push("active");
            } else {
                if (index !== 0 && talents[index - 1].active) {
                    classes.push("next");
                }
            }
            return classes.join(" ");
        }

        return (index > 0) ? <li className={getBranchClasses()}/> : null;
    }

    const isTalentClickable = (index) => {
        if (talents[index].active) {
            return true;
        }
        
        if (index === 0 || talents[index - 1].active) {
            return true;
        }

        return false;
    }

    return (
        <div className="talent-tree-container">
            <h3 className="subheading">{name}</h3>
            <ol className="talents">
                {talents.sort((a, b) => {
                    return (a.sequence > b.sequence) ? 1 : -1
                }).map((talent, index) => {
                    return (
                        <Talent key={talent.name + '-' + index}
                                name={talent.name}
                                active={talent.active}
                                handleLeftClick={() => handleActivateTalent(value, index)}
                                handleRightClick={() => handleDeactivateTalent(value, index)}
                                renderBranch={() => renderBranch(index)}
                                isClickable={() => isTalentClickable(index)}
                        />
                    );
                })}
            </ol>
        </div>
    );
}

export default TalentTree;