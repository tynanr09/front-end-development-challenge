import {Component} from "react";

import { PointTracker } from "../pointtracker";
import { TalentTree } from "../talents";
import TalentService from "../../services/talentService";

import "./calculator.scss";


class TalentCalculator extends Component{

    constructor(props) {
        super(props);

        this.state = {
            points: {},
            talentTrees: [],
        };

        this.handleActivateTalent = this.handleActivateTalent.bind(this);
        this.handleDeactivateTalent = this.handleDeactivateTalent.bind(this);

        this.refreshTalents = this.refreshTalents.bind(this);
        this.saveTalents = this.saveTalents.bind(this);
    }

    refreshTalents() {
        let talentData = TalentService.retrieveTalentData();
        this.setState({
            points: talentData.points,
            talentTrees: talentData.talentTrees
        });
    }

    saveTalents() {
        TalentService.saveTalentData(Object.assign(this.state, {}));
    }

    componentDidMount() {
        this.refreshTalents();
    }

    componentDidUpdate() {
        this.saveTalents();
    }


    handleActivateTalent(treeIndex, talentIndex) {
        const canSpendPoint = () => {
            return this.state.points.currentPoints < this.state.points.maxPoints;
        }

        let trees = this.state.talentTrees.slice();
        let tree = trees[treeIndex];

        if (tree && tree.talents[talentIndex]) {
            var talent = tree.talents[talentIndex];

            if (canSpendPoint() && !talent.active && (talentIndex === 0 || tree.talents[talentIndex - 1].active)) {
                const points = Object.assign(this.state.points, {});

                points.currentPoints++;
                tree.talents[talentIndex].active = true;

                this.setState({points: points, talentTrees: trees});
            }
        }
    }

    handleDeactivateTalent(treeIndex, talentIndex) {
        let trees = this.state.talentTrees.slice();
        let tree = trees[treeIndex];

        if (tree && tree.talents[talentIndex]) {
            var talent = tree.talents[talentIndex];

            if (this.state.points.currentPoints > 0 && talent.active && (talentIndex === tree.talents.length - 1 || !tree.talents[talentIndex + 1].active)) {
                const points = Object.assign(this.state.points, {});

                points.currentPoints--;
                tree.talents[talentIndex].active = false;

                this.setState({points: points, talentTrees: trees});
            }
        }
    }

    render() {
        return (
            <div id="calculator" className="container">
                <div id="title">
                    <h1 className="heading">TitanStar Legends - Rune Mastery Loadout Talent Calculator 9000</h1>
                </div>

                <div id="main">
                    <PointTracker maxPoints={this.state.points.maxPoints}
                                  currentPoints={this.state.points.currentPoints}/>

                    <div id="talent-trees">
                        {this.state.talentTrees.sort((a, b) => {
                            return (a.sequence > b.sequence) ? 1 : -1
                        }).map((talentTree, index) => {
                            return (
                                <TalentTree key={talentTree.name + "-" + index}
                                            value={index}
                                            talents={talentTree.talents}
                                            name={talentTree.name}
                                            handleActivateTalent={this.handleActivateTalent}
                                            handleDeactivateTalent={this.handleDeactivateTalent}
                                />
                            )
                        })
                        }
                    </div>
                </div>
            </div>
        );
    }
}


export default TalentCalculator;