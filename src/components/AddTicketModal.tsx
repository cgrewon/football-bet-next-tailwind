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
  HStack,
  Box,
  VStack,
  Text,
  useToast,
  Flex,
} from '@chakra-ui/react'
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'
import { useAddTicketModal, useLeague } from '@src/store/store'
import { IMatchRow, ITeam, MatchRow, TeamBox } from './Ticket'


export interface IAddTicketModalProps extends IBaseProps {}

const fakeRow: IMatchRow = {
  id: '1',
  leagueName: 'Bundes',
  date: '09-18',
  time: '21:30',
  team1: { name: 'Real', score: 2.2, selected: false },
  team2: { name: 'MC', score: 3.2, selected: false},
  draw: { name: 'draw', score: 2 ,  selected: false},
}


const AddTicketModal: React.FC<IAddTicketModalProps> = (props) => {

  const isOpen = useAddTicketModal((store) => store.isOpen)

  const [ticketMatches, setTicketMatches] = useState<IMatchRow[]>([]);

  const [userName, setUserName] = useState<string>('')

  useEffect(()=>{

    let list = []
    for(let i=0; i<12; i++) {
      list.push({...fakeRow, id:i.toString()});
    }
    setTicketMatches(list);
  }, [])

  const setIsOpen = useAddTicketModal((store) => store.setIsOpen)
  const onClose = () => {
    setUserName('')
    setIsOpen(false)
  }

  const onSubmit = () => {
    onClose()
  }


  const onTeamClick = (matchId: string, teamIndex: number) => {
    
    let newMatches: IMatchRow[] = [...ticketMatches];
    for (let i=0; i<newMatches.length; i++) {      
      if ( newMatches[i].id == matchId) {       
        switch(teamIndex) {
          case 0:
            newMatches[i].team1= {...newMatches[i].team1, selected : !newMatches[i].team1!.selected};            
            break;
          case 1:
            newMatches[i].draw= {...newMatches[i].draw, selected : !newMatches[i].draw!.selected};            
            break;
          case 2:
            newMatches[i].team2= {...newMatches[i].team2, selected : !newMatches[i].team2!.selected};            
            break;
        }
      } 
    }
    if (getSelectedCount(newMatches) > 20) {
      alert('Already all selected count is over 20');
      return;
    } else {
      setTicketMatches(newMatches)
    }
  }

  const getSelectedCount = (matches: IMatchRow[])=>{
    let count = 0;
    for(let one of matches) {
      if (one.team1?.selected) count ++;
      if (one.team2?.selected) count ++;
      if (one.draw?.selected) count ++;
    }
    return count;
  }


  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Ticket</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack my={5}>
            <Input placeholder='User name' value={userName} onChange={e=>setUserName(e.target.value)}/>
            {ticketMatches.map((match, index) => {
              return <MatchRow key={ 'match_row_ticket_' + index} match={match} rowIndex={index} onTeamClick={onTeamClick} />
            })}
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onSubmit}>
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
