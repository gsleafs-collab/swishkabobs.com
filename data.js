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

  /* Newest first. type: 'season' or 'consolation'. tcblGame is the tcbl.ca/games/ID number.
     yt: YouTube id of the full game. hl / poster: league highlight clip and its cover image. */
  games: [
    { date: '2026-11-07', time: '10:00 AM', where: '211 Steeles Ave E, North York', opp: 'NDD', us: 47, them: 44, type: 'consolation', tcblGame: 126, yt: 'vG3iL8bkF98', hl: 'a61b2689-b023-4f73-b153-5d7283bcb1e7', poster: 'rozJE96CRPGLovPuwrdm' },
    { date: '2026-10-31', time: '9:00 AM', where: '190 Allstate Pkwy, Markham', opp: 'Rice Gang', us: 35, them: 47, type: 'season', tcblGame: 103, yt: 'clbUZVWhMWg', hl: '320f57b0-a0ce-428a-ad1d-ed189196786b', poster: 'RueN74PfQ5uVRWMZ0Wud' },
    { date: '2026-10-24', time: '10:00 AM', where: '190 Allstate Pkwy, Markham', opp: 'Ice Breakers', us: 52, them: 61, type: 'season', tcblGame: 85, yt: 'ZY6Lltq8LIg', hl: 'ce775a7c-633d-4dbf-baec-e452c1e0440c', poster: 'cf8GXSwATrKYgTSibbpD' },
    { date: '2026-10-17', time: '11:00 AM', where: '190 Allstate Pkwy, Markham', opp: 'NGSS', us: 51, them: 35, type: 'season', tcblGame: 69, yt: '9FVICckEwBQ', hl: '77d8a76a-d0a6-484f-834d-dd40699b477a', poster: '34TPfEQYRA6YcbOYgnXj' },
    { date: '2026-10-03', time: '11:00 AM', where: '190 Allstate Pkwy, Markham', opp: 'Unction', us: 49, them: 59, type: 'season', tcblGame: 51, yt: 'qjZWi5KFlhk', hl: '092d628f-a2e6-4677-bd5d-3eee5e3af86f', poster: 'o2J41q8oQy27G48KDXmu' },
    { date: '2026-09-26', time: '1:00 PM', where: '190 Allstate Pkwy, Markham', opp: 'VSS', us: 55, them: 57, type: 'season', tcblGame: 36, yt: '3gINNuFOJZ8' },
    { date: '2026-09-19', time: '9:00 AM', where: '190 Allstate Pkwy, Markham', opp: 'Mark & Arthur', us: 47, them: 51, type: 'season', tcblGame: 15, yt: 'VmGpiZwfbk0' },
    { date: '2026-09-12', time: '11:00 AM', where: '190 Allstate Pkwy, Markham', opp: 'Craves Rec', us: 55, them: 48, type: 'season', tcblGame: 3, yt: '-_aGGWI5jSg' }
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

  /* Older full games from the league's YouTube channel (youtube.com/@tcblbasketball).
     id is the part after "v=" or "youtu.be/". */
  videos: [
    { id: 'heRx6VwmfHI', title: 'Swish Kabobs 46, Short Kings 76', tag: 'Thursday Rec' },
    { id: '-Z1yXHeyudM', title: 'Swish Kabobs 48, Swish Cheese 45', tag: 'Thursday Playoffs' },
    { id: '6VSOYzQKKHI', title: 'Oak Finest 69, Swish Kabobs 39', tag: 'Thursday Rec' },
    { id: 'byRnjonWriA', title: 'Swish Cheese 49, Swish Kabobs 21', tag: 'Thursday Rec' },
    { id: 'avz-vv0lYZg', title: 'Swish Kabobs 54, FBGM 44', tag: 'Thursday Rec 2025' },
    { id: 'Zx8gxCB-Yqs', title: 'Jack Rabbits 57, Swish Kabobs 54', tag: 'Thursday Rec' },
    { id: 'TPD--b5cVsQ', title: 'Top Shottas 62, Swish Kabobs 41', tag: 'Thursday Rec' },
    { id: 'ohSqGy-FwM4', title: 'Goon Squad 49, Swish Kabobs 35', tag: 'Thursday Rec' },
    { id: 's-q6pCY2Mvg', title: 'Ball Dont Lie 87, Swish Kabobs 49', tag: 'Thursday Rec' },
    { id: 'IIiTR9_XTDs', title: 'Swish Kabobs 62, City South 30', tag: 'Thursday Rec' },
    { id: 'f6GjPn1SvZ4', title: 'Swish Cheese 57, Swish Kabobs 48', tag: 'Thursday Rec' },
    { id: 'CcV_0Q1XneQ', title: 'Swish Kabobs 57, Traptors 39', tag: 'Thursday Rec' },
    { id: '6LBJRf1BlsE', title: 'Swish Kabobs 25, Ratel 22', tag: 'Fall 2023' },
    { id: 'O6Gfi02OVTM', title: 'Hammers 50, Swish Kabobs 12', tag: 'Spring 2023' },
    { id: 'DVJ7k2UkHJ0', title: 'Swish Kabobs vs UTMCSSA', tag: 'Fall 2022' },
    { id: 'Os6tK7KaLek', title: 'Devils vs Swish Kabobs', tag: 'Summer 2022' },
    { id: 'E3GA4kbOXgQ', title: 'Swish Kabobs vs UTMCSSA', tag: 'Saturday' }
  ],

  /* handle without the @. posts: full links to Instagram posts or reels, newest first. */
  instagram: { handle: 'swishkabobshoops',
    posts: [
      'https://www.instagram.com/p/DfOMca_giGK/',
      'https://www.instagram.com/p/DfOMN9bBAnn/',
      'https://www.instagram.com/p/DfOLjv5JhQs/'
    ]
   }
};
