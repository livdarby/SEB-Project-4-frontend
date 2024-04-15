export interface IMatch {
  date: string;
  teams: Array<ITeam>;
}

interface ITeam {
  name: string;
  score?: number;
}
