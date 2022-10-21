import { Box, Text, VStack } from '@chakra-ui/react'
import { ITeamBoxProps } from '@src/interfaces/ITeamBoxProps'

import React from 'react'

export const TeamBox: React.FC<ITeamBoxProps> = ({ team, onClick }) => {
  return (
    <VStack
      minW="65px"
      h="40px"
      textOverflow="ellipsis"
      overflow="hidden"
      textAlign="center"
      textColor={team?.selected ? 'white' : 'black'}
      background={team?.selected ? '#9c1515' : ''}
      onClick={onClick}
      cursor="pointer"
      rounded={6}
      pt={1}
      color="white"
    >
      <Text fontSize="11px" lineHeight={1}>
        {team?.name}
      </Text>
      <Text fontSize="12px" lineHeight={1}>
        {team?.score}
      </Text>
    </VStack>
  )
}
