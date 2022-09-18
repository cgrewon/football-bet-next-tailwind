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
import { useAddLeagueModal, useLeague } from '@src/store/store'
import { IMatchRow, ITeam, MatchRow, TeamBox } from './Ticket'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'

export interface IMatchInputRowProps extends IBaseProps {
  onAdd: (match: IMatchRow) => void
  isEdit?: boolean
  match?: IMatchRow
}

const MatchInputRow: React.FC<IMatchInputRowProps> = (props) => {
  const [team1, setTeam1] = useState<ITeam | undefined>(props.match ? props.match.team1 : undefined)
  const [team2, setTeam2] = useState<ITeam | undefined>(props.match ? props.match.team2 : undefined)
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [draw, setDraw] = useState<ITeam | undefined>(props.match ? props.match.draw : { name: 'draw',selected: false })

  const [title, setTitle] = useState<string | undefined>(props.match?.leagueName)
  const [dateTime, setDateTime] = useState<string>(props.match?.date + 'T' + props.match?.time)

  const matches = useLeague(store=>store.matches);

  const isValidTeam = (team?: ITeam) => {
    if (!team) return false
    return !!team.name && !!team.score
  }

  const onAdd = () => {
    if (isValidTeam(team1) && isValidTeam(team2) && isValidTeam(draw)) {
      const match: IMatchRow = {
        id: '' + (matches.length + 1),
        leagueName: title,
        date: dateTime?.split('T')[0],
        time: dateTime?.split('T')[1],
        team1,
        team2,
        draw,
      }
      props.onAdd(match)
    } else {
      setShowAlert(true)
    }
  }

  const onReset = () => {
    setShowAlert(false)
    setTeam1(undefined)
    setTeam2(undefined)
    setDraw(undefined)
  }

  return (
    <Box my={3}>
      <HStack my={2}>
        <Input
          placeholder="League Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
        />
        <Input
          placeholder="Select Date and Time"
          size="md"
          type="datetime-local"
          value={dateTime}
          onChange={(e) => {
            console.log(e.target.value)
            setDateTime(e.target.value)
          }}
        />
      </HStack>
      <HStack>
        <VStack>
          <Input
            placeholder="Team1 Name"
            value={team1 ? team1.name : ''}
            onChange={(e) => {
              setShowAlert(false)
              setTeam1({
                ...team1,
                name: e.target.value,
                selected: false
              })
            }}
          />
          <Input
            placeholder="Score"
            type={'number'}
            value={team1 ? team1.score : ''}
            onChange={(e) => {
              setShowAlert(false)
              setTeam1({
                ...team1,
                score: parseFloat(e.target.value),
                selected: false
              })
            }}
          />
        </VStack>
        <VStack>
          <Input placeholder="Team Name" value="Draw" disabled />
          <Input
            placeholder="Score"
            type={'number'}
            value={draw ? draw.score : ''}
            onChange={(e) => {
              setShowAlert(false)
              setDraw({
                ...draw,
                score: parseFloat(e.target.value),
                selected: false
              })
            }}
          />
        </VStack>
        <VStack>
          <Input
            placeholder="Team2 Name"
            value={team2 ? team2.name : ''}
            onChange={(e) => {
              setShowAlert(false)
              setTeam2({
                ...team2,
                name: e.target.value,
                selected: false
              })
            }}
          />
          <Input
            placeholder="Score"
            type={'number'}
            value={team2 ? team2.score : ''}
            onChange={(e) => {
              setShowAlert(false)
              setTeam2({
                ...team2,
                score: parseFloat(e.target.value),
                selected: false
              })
            }}
          />
        </VStack>
        <VStack>
          <Button w={'80px'} colorScheme="teal" onClick={onAdd}>
            {props.isEdit ? 'Save' : 'Add'}
          </Button>
          <Button w={'80px'} colorScheme="red" onClick={onReset}>
            Reset
          </Button>
        </VStack>
      </HStack>
      {showAlert ? (
        <Alert status="error" mt={2}>
          <AlertIcon />
          <AlertTitle>Input invalid!</AlertTitle>
          <AlertDescription>Fill the blanks.</AlertDescription>
        </Alert>
      ) : null}
    </Box>
  )
}

const AddLeagueModal: React.FC<IBaseProps> = () => {
  const isOpen = useAddLeagueModal((store) => store.isOpen)

//   const [matches, setMatches] = useState<IMatchRow[]>([])

  const matches = useLeague(store=>store.matches);
  const setMatches = useLeague(store=>store.setMatches);


  const [editIndex, setEditIndex] = useState<number>()

  const setIsOpen = useAddLeagueModal((store) => store.setIsOpen)
  const onClose = () => {
    setIsOpen(false)
  }

  const onSubmit = () => {
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
                    <TeamBox team={match.team1}/>
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

export default AddLeagueModal
