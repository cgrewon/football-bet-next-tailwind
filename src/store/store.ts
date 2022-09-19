import { ILeague, ITicket } from '@src/interfaces'
import { IMatchRow } from '@src/interfaces/IMatchRow'
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
  isOpen: boolean
  setIsOpen: (_open: boolean) => void
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
    set((state) => {
      return { matches: [..._matches] }
    }),
  toggleTeam: (matchId: number, teamIndex: number) =>
    set((state) => ({
      matches: state.matches.map((one) => {
        if (one.id === matchId) {
          const newMatch: IMatchRow = { ...one } as IMatchRow
          if (teamIndex == 0 && newMatch.team1) {
            newMatch.team1 = { ...newMatch.team1, selected: !newMatch.team1?.selected }
          }
          if (teamIndex == 1 && newMatch.draw) {
            newMatch.draw = { ...newMatch.draw, selected: !newMatch.draw?.selected }
          }
          if (teamIndex == 2 && newMatch.team2) {
            newMatch.team2 = { ...newMatch.team2, selected: !newMatch.team2?.selected }
          }

          return newMatch
        } else {
          return { ...one } as IMatchRow
        }
      }),
    })),
}))

export interface ICurrentLeagueStore {
  league: ILeague | undefined
  setLeague: (league: ILeague) => void
  clearLeague: () => void
}

const useCurrentLeagueStore = create<ICurrentLeagueStore>((set) => ({
  league: undefined,
  setLeague: (_new: ILeague) =>
    set((state) => ({
      league: _new,
    })),
  clearLeague: () =>
    set((state) => ({
      league: undefined,
    })),
}))

export interface ICurrentTicketStore {
  ticket: ITicket | undefined
  setTicket: (ticket: ITicket) => void
}

const useCurrentTicketStore = create<ICurrentTicketStore>((set) => ({
  ticket: undefined,
  setTicket: (_new: ITicket) =>
    set((state) => ({
      ticket: _new,
    })),
}))

export { useStep, useAddLeagueModal, useAddTicketModal, useLeague, useCurrentLeagueStore, useCurrentTicketStore }
