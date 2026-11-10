/* Swish Kabobs site data. Edit this file to update the site.
   Source for games and stats: tcbl.ca/teams/swish-kabobs (Fall 2026, through Nov 7). */
window.SK = {
  team: {
    name: 'Swish Kabobs',
    league: 'Toronto Chinese Basketball League',
    division: 'Saturday Beginner',
    season: 'Fall 2026',
    record: { w: 2, l: 5 },
    rank: 9,
    teams: 10,
    ppg: 49.1,
    oppPpg: 51.1,
    diff: -14,
    tcbl: 'https://tcbl.ca/teams/swish-kabobs'
  },

  /* Newest first. type: 'season' or 'consolation'. tcblGame is the tcbl.ca/games/ID number. */
  games: [
    { date: '2026-11-07', opp: 'NDD',           us: 47, them: 44, type: 'consolation', tcblGame: 126 },
    { date: '2026-10-31', opp: 'Rice Gang',     us: 35, them: 47, type: 'season', tcblGame: 103 },
    { date: '2026-10-24', opp: 'Ice Breakers',  us: 52, them: 61, type: 'season', tcblGame: 85 },
    { date: '2026-10-17', opp: 'NGSS',          us: 51, them: 35, type: 'season', tcblGame: 69 },
    { date: '2026-10-03', opp: 'Unction',       us: 49, them: 59, type: 'season', tcblGame: 51 },
    { date: '2026-09-26', opp: 'VSS',           us: 55, them: 57, type: 'season' },
    { date: '2026-09-19', opp: 'Mark & Arthur', us: 47, them: 51, type: 'season' },
    { date: '2026-09-12', opp: 'Craves Rec',    us: 55, them: 48, type: 'season' }
  ],

  /* Games still to come. Example:
     { date: '2027-01-09', time: '10:00 AM', opp: 'NDD', where: '211 Steeles Ave E' } */
  upcoming: [],

  /* Season totals from the filmed games. name: '' shows as "Player #N" until filled in.
     photo: optional image file name, pos: optional position. */
  players: [
    { num: 17, name: 'Gurjot Mann', gp: 4, pts: 84, reb: 39, ast: 5,  tpm: 26, tpa: 81, fgm: 29, fga: 91 },
    { num: 8,  name: '', gp: 4, pts: 63, reb: 31, ast: 13, tpm: 10, tpa: 63, fgm: 26, fga: 101 },
    { num: 10, name: '', gp: 4, pts: 20, reb: 19, ast: 18, tpm: 2,  tpa: 13, fgm: 8,  fga: 31 },
    { num: 23, name: '', gp: 3, pts: 16, reb: 8,  ast: 7,  tpm: 0,  tpa: 12, fgm: 8,  fga: 25 },
    { num: 81, name: '', gp: 3, pts: 12, reb: 49, ast: 3,  tpm: 0,  tpa: 0,  fgm: 5,  fga: 19 },
    { num: 9,  name: '', gp: 4, pts: 12, reb: 14, ast: 9,  tpm: 1,  tpa: 12, fgm: 5,  fga: 22 },
    { num: 77, name: '', gp: 2, pts: 8,  reb: 9,  ast: 0,  tpm: 0,  tpa: 1,  fgm: 4,  fga: 10 },
    { num: 31, name: '', gp: 3, pts: 8,  reb: 14, ast: 7,  tpm: 0,  tpa: 0,  fgm: 3,  fga: 7 },
    { num: 32, name: '', gp: 4, pts: 6,  reb: 16, ast: 1,  tpm: 0,  tpa: 1,  fgm: 3,  fga: 11 },
    { num: 5,  name: '', gp: 3, pts: 3,  reb: 4,  ast: 0,  tpm: 1,  tpa: 9,  fgm: 1,  fga: 10 },
    { num: 7,  name: '', gp: 3, pts: 2,  reb: 3,  ast: 1,  tpm: 0,  tpa: 3,  fgm: 1,  fga: 4 },
    { num: 19, name: '', gp: 3, pts: 0,  reb: 3,  ast: 0,  tpm: 0,  tpa: 0,  fgm: 0,  fga: 0 },
    { num: 2,  name: '', gp: 2, pts: 0,  reb: 3,  ast: 0,  tpm: 0,  tpa: 2,  fgm: 0,  fga: 5 }
  ],

  /* YouTube videos. id is the part after "v=" or "youtu.be/". Example:
     { id: 'dQw4w9WgXcQ', title: 'Swish Kabobs vs NDD', tag: 'Full game' } */
  videos: [],

  /* handle without the @. posts: full links to Instagram posts or reels, newest first. */
  instagram: { handle: 'swishkabobshoops', posts: [] }
};
