import IBaseProps from './IBaseProps'
import { ITeam } from './ITeam'

export interface ITeamBoxProps extends IBaseProps {
  team?: ITeam
  onClick?: () => void
}
