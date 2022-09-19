import IBaseProps from '@src/interfaces/IBaseProps'
import React, { useState, useEffect } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useAddTicketModal, useCurrentLeagueStore, useCurrentTicketStore } from '@src/store/store'
import { getIMatchRowFrom, IMatchRow } from '@src/interfaces/IMatchRow'
import { MatchRow } from './MatchRow'
import { getPickTeamsForMatchFrom, ICreatePickTeam, ICreateTicket, ILeague, ITicket } from '@src/interfaces'
import Api from '@src/services/api'

const AddTicketModal: React.FC<IBaseProps> = (props) => {
  const isOpen = useAddTicketModal((store) => store.isOpen)

  const currentLeague = useCurrentLeagueStore((state) => state.league)
  const setCurrentLeague = useCurrentLeagueStore((state) => state.setLeague)
  const currentTicket = useCurrentTicketStore((state) => state.ticket)

  const setCurrentTicket = useCurrentTicketStore((state) => state.setTicket)

  const [ticketMatches, setTicketMatches] = useState<IMatchRow[]>([])

  const [userName, setUserName] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!currentLeague) {
      setTicketMatches([])
      return
    }
    let matchrows = currentLeague?.matches.map((one) => getIMatchRowFrom(one))

    if (currentTicket) {
      matchrows = matchrows?.map((match) => {
        let newMatch = { ...match }
        const pickTeams = getPickTeamsForMatchFrom(currentTicket, match.id)

        for (let pick of pickTeams) {
          if (pick.team_index == 0) {
            newMatch.team1 = { ...newMatch.team1, selected: true }
          } else if (pick.team_index == 1) {
            newMatch.draw = { ...newMatch.draw, selected: true }
          } else if (pick.team_index == 2) {
            newMatch.team2 = { ...newMatch.team2, selected: true }
          }
        }

        return newMatch
      })
    }
    setTicketMatches(matchrows || [])
  }, [currentLeague, currentTicket])

  const setIsOpen = useAddTicketModal((store) => store.setIsOpen)
  const onClose = () => {
    setUserName('')
    setIsOpen(false)
  }

  const onSubmit = async () => {
    console.log('currentLeague', currentLeague)

    const count = getSelectedCount(ticketMatches)
    if (count < 20) {
      alert('You can select ' + count + ' options more.')
      return
    }
    if (!userName) {
      alert('User name must be filled.')
      return
    }

    setIsLoading(true)

    let picks: ICreatePickTeam[] = []

    for (let match of ticketMatches) {
      if (match.team1?.selected) {
        picks.push({
          team_index: 0,
          match_id: match.id,
        })
      }

      if (match.draw?.selected) {
        picks.push({
          team_index: 1,
          match_id: match.id,
        })
      }

      if (match.team2?.selected) {
        picks.push({
          team_index: 2,
          match_id: match.id,
        })
      }
    }

    const createTicket: ICreateTicket = {
      league_id: currentLeague!.id,
      user_name: userName,
      pickTeams: picks,
    }

    const res: ITicket = await Api.addTicket(createTicket)

    setCurrentTicket(res)

    const newLeague: ILeague = await Api.getOneLeague(currentLeague!.id)
    setCurrentLeague(newLeague)

    setIsLoading(false)

    onClose()
  }

  const onTeamClick = (matchId: number, teamIndex: number) => {
    let newMatches: IMatchRow[] = [...ticketMatches]
    for (let i = 0; i < newMatches.length; i++) {
      if (newMatches[i].id == matchId) {
        switch (teamIndex) {
          case 0:
            newMatches[i].team1 = { ...newMatches[i].team1, selected: !newMatches[i].team1!.selected }
            break
          case 1:
            newMatches[i].draw = { ...newMatches[i].draw, selected: !newMatches[i].draw!.selected }
            break
          case 2:
            newMatches[i].team2 = { ...newMatches[i].team2, selected: !newMatches[i].team2!.selected }
            break
        }
      }
    }
    if (getSelectedCount(newMatches) > 20) {
      alert('Already all selected count is over 20')
      return
    } else {
      setTicketMatches(newMatches)
    }
  }

  const getSelectedCount = (matches: IMatchRow[]) => {
    let count = 0
    for (let one of matches) {
      if (one.team1?.selected) count++
      if (one.team2?.selected) count++
      if (one.draw?.selected) count++
    }
    return count
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Ticket</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack my={5}>
            {!currentLeague && <Text>Please select current league or add new league first.</Text>}
            <Input placeholder="User name" value={userName} onChange={(e) => setUserName(e.target.value)} />
            {ticketMatches.map((match, index) => {
              return (
                <MatchRow key={'match_row_ticket_' + index} match={match} rowIndex={index} onTeamClick={onTeamClick} />
              )
            })}
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onSubmit} isLoading={isLoading}>
            Submit
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AddTicketModal
