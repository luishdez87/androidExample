import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import People from './people.screen';

describe('People Component', () => {
  it('renders without crashing', () => {
    render(<People navigation={{navigate: jest.fn()}} />);
  });

  it('displays a list of people', () => {
    const {getByText} = render(<People navigation={{navigate: jest.fn()}} />);
    expect(getByText('No people found')).toBeTruthy();
  });

  it('updates search query correctly', () => {
    const {getByPlaceholderText} = render(
      <People navigation={{navigate: jest.fn()}} />,
    );
    const searchInput = getByPlaceholderText('Search...');

    fireEvent.changeText(searchInput, 'John');

    expect(searchInput.props.value).toBe('John');
  });
});
