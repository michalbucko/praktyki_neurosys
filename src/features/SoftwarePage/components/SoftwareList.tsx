import Button, { ButtonSize, ButtonVariant } from 'components/Button/Button'
import { ListItem } from 'components/List/ListItem'
import { List } from 'components/List'
import { useHistory } from 'react-router'
import { toSoftwarePage } from 'routes/routes'
import { useDispatchSoftware, useSelectSoftware } from '../slice'
import { toEditItem } from '../routes'

export const SoftwareList = () => {
  const { softwares } = useSelectSoftware()
  const { removeSoftware } = useDispatchSoftware()
  const { push } = useHistory()
  return (
    <div>
      <p>Licence list</p>
      <List divider>
        {softwares.map((software) => (
          <>
            <ListItem
              key={software.id}
              primaryText={`Company: ${software.company}  Licence: ${software.name}`}
              secondaryText={`${software.category}, ${software.expDate}, ${software.amount}`}
            />
            <Button
              variant={ButtonVariant.outlined}
              size={ButtonSize.small}
              onClick={() => removeSoftware(software.id)}
            >
              Remove
            </Button>
            <Button
              variant={ButtonVariant.outlined}
              size={ButtonSize.small}
              onClick={() => push(`${toSoftwarePage}${toEditItem}/${software.id}`)}
            >
              Edit
            </Button>
          </>
        ))}
      </List>
    </div>
  )
}
