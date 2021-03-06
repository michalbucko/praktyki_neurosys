import { text, boolean } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { List } from 'components/List'
import { ListItem } from 'components/List/ListItem'
import { useState } from 'react'

storiesOf('Atoms', module).add('List', () => {
  const [items, setItems] = useState(3)
  const array = Array.from(Array(items).keys())

  const props = {
    header: text('header', ''),
    subheader: text('subheader', ''),
    divider: boolean('divider', false),
    border: boolean('border', false),
  }

  const handleIncrease = () => setItems((prev) => prev + 1)
  const handleDecrease = () => setItems((prev) => (prev === 0 ? 0 : prev - 1))

  return (
    <>
      <List {...props}>
        {array.map(() => (
          <ListItem
            primaryText="jabłko"
            secondaryText="pestka"
            image={<img src="https://picsum.photos/50" alt="pic" height="50" width="50" />}
          />
        ))}
      </List>
      <button type="button" onClick={handleIncrease}>
        Add item
      </button>
      <button type="button" onClick={handleDecrease}>
        Remove item
      </button>
    </>
  )
})
