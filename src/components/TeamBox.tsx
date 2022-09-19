import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import IBaseProps from '@src/interfaces/IBaseProps'
import { IMatchRow } from '@src/interfaces/IMatchRow'
import { ITeamBoxProps } from '@src/interfaces/ITeamBoxProps'
import { useLeague } from '@src/store/store'
import React from 'react'
import { MatchRow } from './MatchRow'

export const TeamBox: React.FC<ITeamBoxProps> = ({ team, onClick }) => {
  return (
    <Box
      mx={2}
      minW={'60px'}
      textAlign="center"
      textColor={team?.selected ? 'white' : 'black'}
      background={team?.selected ? '#cb1c1c' : ''}
      onClick={onClick}
      cursor="pointer"
      rounded={6}
    >
      <Text>{team?.name}</Text>
      <Text>{team?.score}</Text>
    </Box>
  )
}
