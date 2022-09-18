import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import IBaseProps from '@src/interfaces/IBaseProps'
import { useLeague } from '@src/store/store'
import React from 'react'

const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export interface ITeam {
  name?: string
  score?: number
  selected: boolean
}
export interface IMatchRow {
  id: string;
  leagueName?: string
  date?: string
  time?: string
  team1?: ITeam
  team2?: ITeam
  draw?: ITeam
}

export interface ITeamBoxProps extends IBaseProps {
  team?: ITeam
  onClick?: () => void
}

export const TeamBox: React.FC<ITeamBoxProps> = ({ team, onClick }) => {
  return (
    <Box
      mx={2}
      minW={'60px'}
      textAlign="center"
      textColor={team?.selected ? 'white' : 'black'}
      background={team?.selected ? '#cb1c1c' : ''}
      onClick={onClick}
      cursor='pointer'
      rounded={6}
      
    >
      <Text>{team?.name}</Text>
      <Text>{team?.score}</Text>
    </Box>
  )
}

export interface IMatchRowProps extends IBaseProps {
  match?: IMatchRow
  rowIndex?: number
  onTeamClick?: (matchId: string, teamIndex: number) => void
}

export const MatchRow: React.FC<IMatchRowProps> = ({ match, rowIndex, onTeamClick }) => {

  const matches = useLeague(store=>store.matches);


  const logMatches = ()=>{
    for(let one of matches) {
      console.log({id: one.id, 'team1:':one.team1?.selected, draw:one.draw?.selected, team2: one.team2?.selected})
    }
  }


  return (
    <Flex
      alignItems={'center'}
      justify="space-evenly"
      py={1}
      borderBottom={rowIndex == rows.length - 1 ? '' : '1px solid gray'}
    >
      <Box minWidth={'50px'} textAlign="center">
        {rowIndex ? rowIndex + 1 : 1}
      </Box>
      <Flex direction={'column'} alignItems="center">
        <Text fontSize={'12px'}>{match?.leagueName}</Text>
        <Text fontSize={'13px'}>{match?.date}</Text>
        <Text fontSize={'13px'}>{match?.time}</Text>
      </Flex>

      <TeamBox
        team={match?.team1}
        onClick={() => {
          if (match && match.team1) {
            
            onTeamClick?.(match.id, 0);
            
          }
        }}
      />
      <TeamBox team={match?.draw} onClick={() => {
        
        if (match && match.draw) {
          // let newMatch = { ...match }
          onTeamClick?.(match.id, 1);
          
          // onTeamClick?.(newMatch, rowIndex)
        }
      }} />
      <TeamBox team={match?.team2} onClick={() => {
        if (match && match.team2) {
          // let newMatch = { ...match }
          onTeamClick?.(match.id, 2);
          
          // onTeamClick?.(newMatch, rowIndex)
        }
      }} />
    </Flex>
  )
}

const Ticket: React.FC<IBaseProps> = (props) => {
  const fakeRow: IMatchRow = {
    id: '1',
    leagueName: 'Bundes',
    date: '09-18',
    time: '21:30',
    team1: { name: 'Real', score: 2.2, selected: false },
    team2: { name: 'MC', score: 3.2, selected: false},
    draw: { name: 'draw', score: 2 ,  selected: false},
  }
  let rowData: IMatchRow[] = []


  for (let index in rows) {
    rowData.push({...fakeRow, id: index})
  }

  return (
    <Box py={3} border="1px solid gray" w={'350px'} mx="auto">
      <Box px={3} py={1}>
        <Text>User: Christ Mern</Text>
      </Box>
      {rowData.map((row, index) => {
        return (
          <MatchRow match={row} key={'mathc_row_' + index} rowIndex={index} />
          // <Flex
          //   key={index + 1}
          //   alignItems={'center'}
          //   justify="space-evenly"
          //   py={1}
          //   borderBottom={index == rows.length - 1 ? '' : '1px solid gray'}
          // >
          //   <Box minWidth={'50px'} textAlign="center">
          //     {index + 1}
          //   </Box>
          //   <Flex direction={'column'} alignItems="center">
          //     <Text fontSize={'12px'}>{row.leagueName}</Text>
          //     <Text fontSize={'13px'}>{row.date}</Text>
          //     <Text fontSize={'13px'}>{row.time}</Text>
          //   </Flex>

          //   <TeamBox team={row.team1} />
          //   <TeamBox team={row.draw} />
          //   <TeamBox team={row.team2} />
          // </Flex>
        )
      })}
    </Box>
  )
}

export default Ticket
