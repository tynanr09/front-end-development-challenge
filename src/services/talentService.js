import * as talentData from "../assets/mockdata/talentdata.json";


class TalentService {
    retrieveTalentData = () => {
        const savedTalentData = localStorage.getItem("talentData");
        return (savedTalentData !== undefined && savedTalentData !== null) ? JSON.parse(savedTalentData) : talentData.data;
    }

    saveTalentData = (newTalentData) => {
        localStorage.setItem("talentData", JSON.stringify(newTalentData));
    }
}

export default new TalentService();