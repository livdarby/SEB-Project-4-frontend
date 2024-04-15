export interface IMatch {
  date: string;
  teams: Array<ITeam>;
  id?: number;
}

export interface IDatabaseMatch {
  date_created: string;
  id: number;
  match_date: string;
  team_one_name: string;
  team_one_score?: number;
  team_two_name: string;
  team_two_score?: number;
}

interface ITeam {
  name: string;
  score?: number;
}

//
// date_created: "2024-04-15 20:33:11.25011+01";
// id: 1;
// match_date: "2024-04-06 00:00:00";
// team_one_name: "Arsenal";
// team_one_score: 2;
// team_two_name: "Chelsea";
// team_two_score: 1;
