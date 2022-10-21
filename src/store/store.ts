import { ILeague, ITicket } from '@src/interfaces'
import { IMatchRow } from '@src/interfaces/IMatchRow'
import create from 'zustand'
import { persist } from 'zustand/middleware'
import { IStepStore } from './interfaces/IStepStore'

const useStep = create<IStepStore>((set) => ({
  step: 1,
  setStep: (_step: number) =>
    set(() => {
      return { step: _step }
    }),
}))

export interface IModalStore {
  isOpen: boolean
  setIsOpen: (_open: boolean) => void
}

const useAddLeagueModal = create<IModalStore>((set) => ({
  isOpen: false,
  setIsOpen: (_open: boolean) =>
    set(() => {
      return { isOpen: _open }
    }),
}))

const useAddTicketModal = create<IModalStore>((set) => ({
  isOpen: false,
  setIsOpen: (_open: boolean) =>
    set(() => {
      return { isOpen: _open }
    }),
}))

export type MatchItems = {
  [key: string]: IMatchRow[]
}

export interface ILeagueStore {
  matches: IMatchRow[]
  setMatches: (_matches: IMatchRow[]) => void
  toggleTeam: (matchId: number, teamIndex: number) => void
}

const useLeague = create<ILeagueStore>((set) => ({
  matches: [],
  setMatches: (_matches: IMatchRow[]) =>
    set(() => {
      return { matches: [..._matches] }
    }),
  toggleTeam: (matchId: number, teamIndex: number) =>
    set((state) => ({
      matches: state.matches.map((one) => {
        if (one.id === matchId) {
          const newMatch: IMatchRow = { ...one } as IMatchRow
          if (teamIndex == 0 && newMatch.team1) {
            newMatch.team1 = { ...newMatch.team1, selected: !newMatch.team1.selected }
          }
          if (teamIndex == 1 && newMatch.draw) {
            newMatch.draw = { ...newMatch.draw, selected: !newMatch.draw.selected }
          }
          if (teamIndex == 2 && newMatch.team2) {
            newMatch.team2 = { ...newMatch.team2, selected: !newMatch.team2.selected }
          }

          return newMatch
        }
        return { ...one } as IMatchRow
      }),
    })),
}))

export interface ICurrentLeagueStore {
  league: ILeague | undefined
  setLeague: (league: ILeague) => void
  clearLeague: () => void
}

const useCurrentLeagueStore = create<ICurrentLeagueStore>()(
  persist(
    (set, get) => ({
      league: undefined,
      setLeague: (_new: ILeague) =>
        set((state) => ({
          league: _new,
        })),
      clearLeague: () =>
        set((state) => ({
          league: undefined,
        })),
    }),
    {
      name: 'cur-league', // unique name
      getStorage: () => localStorage,
    },
  ),
)

export interface ICurrentTicketStore {
  ticket: ITicket | undefined
  setTicket: (ticket: ITicket) => void
  clear: () => void
}

const useCurrentTicketStore = create<ICurrentTicketStore>((set) => ({
  ticket: undefined,
  setTicket: (_new: ITicket) =>
    set((state) => ({
      ticket: _new,
    })),

  clear: () => set((state) => ({ ticket: undefined })),
}))

export interface ILeagueItemsStore {
  leagueItems: ILeague[] | undefined
  setLeagueItems: (list: ILeague[]) => void
}

const useLeagueItemsStore = create<ILeagueItemsStore>((set) => ({
  leagueItems: undefined,
  setLeagueItems: (list: ILeague[]) =>
    set((state) => ({
      leagueItems: list,
    })),
}))

export {
  useStep,
  useAddLeagueModal,
  useAddTicketModal,
  useLeague,
  useCurrentLeagueStore,
  useCurrentTicketStore,
  useLeagueItemsStore,
}
