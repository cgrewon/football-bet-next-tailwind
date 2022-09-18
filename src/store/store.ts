import { IMatchRow } from '@src/components/Ticket';
import create from 'zustand'
import { IStepStore } from './interfaces/IStepStore'


const useStep = create<IStepStore>((set) => ({
  step: 1,
  setStep: (_step: number) =>
    set((state) => {
      return { step: _step }
    }),
}))


export interface IModalStore {
  isOpen: boolean;
  setIsOpen: (_open: boolean)=>void
}


const useAddLeagueModal = create<IModalStore>((set) => ({
  isOpen: false,
  setIsOpen: (_open: boolean) =>
    set((state) => {
      return { isOpen: _open }
    }),
}))

const useAddTicketModal = create<IModalStore>((set) => ({
  isOpen: false,
  setIsOpen: (_open: boolean) =>
    set((state) => {
      return { isOpen: _open }
    }),
}))


export type MatchItems = {
  [key: string] : IMatchRow[]
}

export interface ILeagueStore {

  matches: IMatchRow[];
  setMatches: (_matches: IMatchRow[])=>void;
  toggleTeam: (matchId: string, teamIndex: number)=>void
}


const useLeague = create<ILeagueStore>(set=>({
  matches: [],
  setMatches: (_matches: IMatchRow[])=> set((state)=>{
    return {matches: [..._matches]}
  }),
  toggleTeam: (matchId: string, teamIndex: number)=>set(state=>({
    matches: state.matches.map(one=>{

      console.log('at toggle team useLeague:',  {id: one.id, 'team1:':one.team1?.selected, draw:one.draw?.selected, team2: one.team2?.selected})

      if (one.id === matchId) {
        const newMatch: IMatchRow = {...one} as IMatchRow;
        if (teamIndex == 0 && newMatch.team1) {
          newMatch.team1.selected = !newMatch.team1?.selected;
        }
        if (teamIndex == 1 && newMatch.draw) {
          newMatch.draw.selected = !newMatch.draw?.selected;
        }
        if (teamIndex == 2 && newMatch.team2) {
          newMatch.team2.selected = !newMatch.team2?.selected;
        }
        console.log('clicked team : '+ newMatch.id, newMatch.team1?.selected, newMatch.draw?.selected, newMatch.team2?.selected)
        return newMatch;
      } else {
        console.log('not clicked team : ' + one.id, one.team1?.selected, one.draw?.selected, one.team2?.selected)
        return {...one} as IMatchRow
      }
      
    })
  }))
}))

export { useStep , useAddLeagueModal, useAddTicketModal, useLeague}
