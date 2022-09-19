import IBaseProps from '@src/interfaces/IBaseProps'
import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Stack,
  HStack,
  Box,
  Text,
  Flex,
  Input,
} from '@chakra-ui/react'
import { useAddLeagueModal, useCurrentLeagueStore, useLeague } from '@src/store/store'

import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import MatchInputRow from './MatchInputRow'
import { getICreateMatchFrom, IMatchRow } from '@src/interfaces/IMatchRow'
import { TeamBox } from './TeamBox'
import { ICreateLeague, ICreateMatch, ILeague } from '@src/interfaces'
import Api from '@src/services/api'

const AddLeagueModal: React.FC<IBaseProps> = () => {
  const isOpen = useAddLeagueModal((store) => store.isOpen)

  const matches = useLeague((store) => store.matches)
  const setMatches = useLeague((store) => store.setMatches)
  const setCurrentLeague = useCurrentLeagueStore((store) => store.setLeague)

  const [editIndex, setEditIndex] = useState<number>()
  const [leagueName, setLeagueName] = useState<string>()

  const setIsOpen = useAddLeagueModal((store) => store.setIsOpen)
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onClose = () => {
    setIsOpen(false)
  }

  const onSubmit = async () => {
    const matchList: ICreateMatch[] = []
    if (matches.length == 0) {
        alert('Please add matches');
        return 
    }

    setIsLoading(true)

    for (let matchRow of matches) {
      matchList.push(getICreateMatchFrom(matchRow))
    }

    let data: ICreateLeague = {
      name: leagueName || 'Default League Name ' + new Date().toLocaleDateString(),
      matches: matchList,
    }

    const league: ILeague = await Api.addLeague(data)

    setCurrentLeague(league);
    setIsLoading(false)
    
    onClose()
  }

  const onEdit = (index: number) => {
    setEditIndex(index)
  }
  const onDelete = (index: number) => {
    const newMatches = matches.filter((one, _index) => index != _index)
    setMatches(newMatches)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add League</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack my={5}>
            <Input
              placeholder="League Name"
              value={leagueName}
              onChange={(e) => {
                setLeagueName(e.target.value)
              }}
            />
            <Box py={2} my={3}>
              Matches
            </Box>

            {matches.map((match, index) => {
              if (editIndex == index) {
                return (
                  <MatchInputRow
                    isEdit={true}
                    match={match}
                    onAdd={(match: IMatchRow) => {
                      const newMatches = matches.map((one, _index) => (_index == index ? match : one))
                      setMatches(newMatches)
                      setEditIndex(undefined)
                    }}
                  />
                )
              } else {
                return (
                  <Flex
                    key={index + 1}
                    w="full"
                    justify={'space-evenly'}
                    borderY="1px solid gray"
                    alignItems={'center'}
                  >
                    <Text>{index + 1}</Text>
                    <Flex direction={'column'} alignItems="center">
                      <Text fontSize={'12px'}>{match.leagueName}</Text>
                      <Text fontSize={'13px'}>{match.date}</Text>
                      <Text fontSize={'13px'}>{match.time}</Text>
                    </Flex>
                    <TeamBox team={match.team1} />
                    <TeamBox team={match.draw} />
                    <TeamBox team={match.team2} />
                    <HStack>
                      <Button
                        variant="link"
                        onClick={() => {
                          onEdit(index)
                        }}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        variant="link"
                        onClick={() => {
                          onDelete(index)
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    </HStack>
                  </Flex>
                )
              }
            })}

            <MatchInputRow
              onAdd={(match: IMatchRow) => {
                setMatches([...matches, match])
              }}
            />
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

export default AddLeagueModal
