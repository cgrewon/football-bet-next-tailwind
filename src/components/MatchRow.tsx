import { useLeague } from '@src/store/store'

import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { IMatchRowProps } from '@src/interfaces/IMatchRowProps'
import { TeamBox } from './TeamBox'

export const MatchRow: React.FC<IMatchRowProps> = ({ match, rowIndex, onTeamClick }) => {
  const matches = useLeague((store) => store.matches)

  return (
    <Flex alignItems="center" justify="space-evenly" py={0} borderBottom="1px solid gray">
      <Box minWidth="40px" textAlign="center">
        {rowIndex ? rowIndex + 1 : 1}
      </Box>
      <Flex direction="column" alignItems="center" textAlign="center">
        <Text fontSize="12px">{match?.leagueName}</Text>
        <Text fontSize="11px">{match?.date}</Text>
        <Text fontSize="13px">{match?.time}</Text>
      </Flex>

      <TeamBox
        team={match?.team1}
        onClick={() => {
          if (match && match.team1) {
            onTeamClick?.(match.id, 0, !match.team1.selected)
          }
        }}
      />
      <TeamBox
        team={match?.draw}
        onClick={() => {
          if (match && match.draw) {
            onTeamClick?.(match.id, 1, !match.draw.selected)
          }
        }}
      />
      <TeamBox
        team={match?.team2}
        onClick={() => {
          if (match && match.team2) {
            onTeamClick?.(match.id, 2, !match.team2.selected)
          }
        }}
      />
    </Flex>
  )
}
