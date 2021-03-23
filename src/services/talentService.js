import * as talentData from '../assets/mockdata/talentdata.json';


class TalentService {
    retrieveTalentData = () => {
        return talentData.data;
    }
}

export default new TalentService();