import React from 'react'
import { render, screen } from '@testing-library/react'
import { List } from '.'
import { ListItem } from './ListItem'

type Props = {
  header?: string
  subheader?: string
  divider?: boolean
  border?: boolean
}

const ListContainer = ({ header, subheader, divider, border }: Props) => (
  <List header={header} subheader={subheader} divider={divider} border={border}>
    <ListItem
      primaryText="Primary Text"
      secondaryText="Secondary Text"
      image={<img src="https://picsum.photos/50" alt="pic" height="50" width="50" />}
    />
    <ListItem
      primaryText="Primary Text"
      secondaryText="Secondary Text"
      image={<img src="https://picsum.photos/50" alt="pic" height="50" width="50" />}
    />
    <ListItem
      primaryText="Primary Text"
      secondaryText="Secondary Text"
      image={<img src="https://picsum.photos/50" alt="pic" height="50" width="50" />}
    />
  </List>
)

describe('List', () => {
  test('renders list', () => {
    render(<ListContainer />)

    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
  })

  test('renders list elements', () => {
    render(<ListContainer />)

    const listElements = screen.getAllByRole('listitem')
    expect(listElements).toHaveLength(3)
  })

  test('renders list header', () => {
    const headerString = 'Header'
    render(<ListContainer header={headerString} />)

    const header = screen.getByTestId('header')
    expect(header).toHaveTextContent(headerString)
  })

  test('renders list subheader', () => {
    const headerString = 'Subheader'
    render(<ListContainer subheader={headerString} />)

    const subheader = screen.getByTestId('subheader')
    expect(subheader).toHaveTextContent(headerString)
  })

  test('render string as list item primaryText', () => {
    render(<ListContainer />)

    const listItemPrimaryText = screen.getAllByTestId('primaryText')

    listItemPrimaryText.forEach((listItem) => {
      expect(listItem).toHaveTextContent(/Primary/)
    })
  })

  test('render string as list item secondaryText', () => {
    render(<ListContainer />)

    const listItemSecondaryText = screen.getAllByTestId('secondaryText')

    listItemSecondaryText.forEach((listItem) => {
      expect(listItem).toHaveTextContent(/Secondary/)
    })
  })

  test('render <img> tag as list items image', () => {
    render(<ListContainer />)

    const listItemImage = screen.getAllByTestId('image')

    listItemImage.forEach((listItem) => {
      expect(listItem).toContainHTML('</img>')
    })
  })

  test('render list with border', () => {
    render(<ListContainer border />)

    const list = screen.getByRole('list')

    expect(list).toHaveStyle(`box-shadow: 2px 2px 5px 2px #C9C9C9`)
  })

  test('render list without border', () => {
    render(<ListContainer />)

    const list = screen.getByRole('list')

    expect(list).not.toHaveStyle(`box-shadow: 2px 2px 5px 2px #C9C9C9`)
  })

  test('render list with divider', () => {
    render(<ListContainer divider />)

    const listItems = screen.getAllByRole('listitem')

    listItems.forEach((item, index) => {
      expect(item).toHaveStyle(
        `${index === listItems.length - 1 ? 'border-bottom: none' : 'border-bottom: 1px solid #cccc'}`
      )
      expect(item).toHaveStyle(`${index === listItems.length - 1 ? 'padding-bottom: 0px' : 'padding-bottom: 10px'}`)
    })
  })
})
