import Button, { ButtonSize, ButtonVariant } from 'components/Button/Button'
import { ListItem } from 'components/List/ListItem'
import { List } from 'components/List'
import { Soft } from 'features/SoftwarePage/SoftwarePage'

type Props = {
  softwares: Soft[]
  onRemove: (softwareId: number) => void
}
export const SoftwareList = ({ softwares, onRemove }: Props) => {
  return (
    <div>
      <p>Licence list</p>
      <List divider>
        {softwares.map((software) => (
          <>
            <ListItem
              primaryText={`Company: ${software.company}  Licence: ${software.name}`}
              secondaryText={`${software.category}, ${software.expDate}, ${software.amount}`}
            />

            <Button variant={ButtonVariant.outlined} size={ButtonSize.small} onClick={() => onRemove(software.id)}>
              Remove
            </Button>
          </>
        ))}
      </List>
    </div>
  )
}
